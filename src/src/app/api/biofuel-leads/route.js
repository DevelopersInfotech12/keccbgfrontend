import { NextResponse } from "next/server";

const FALLBACK_SHEET_URL = "https://script.google.com/macros/s/AKfycbzOTHdSzGzjsVv688vTlCDBFvr9HXps1bESRzdOEeRCVMbj-ZcXfb1YPw72zpnp9oathg/exec";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, state } = body;

    if (!name?.trim() || !phone?.trim() || !state?.trim()) {
      return NextResponse.json({ error: "Name, phone and state are required." }, { status: 400 });
    }

    const sheetUrl = process.env.GOOGLE_SHEET_URL || FALLBACK_SHEET_URL;

    if (!sheetUrl.startsWith("https://script.google.com/macros/s/")) {
      console.error("❌ Wrong URL format:", sheetUrl);
      return NextResponse.json({ success: true, note: "Invalid sheet URL format" });
    }
    if (!sheetUrl.endsWith("/exec")) {
      console.error("❌ URL must end with /exec:", sheetUrl);
      return NextResponse.json({ success: true, note: "URL must end with /exec" });
    }

    const payload = {
      name:      name.trim(),
      phone:     phone.trim(),
      state:     state.trim(),
      timestamp: new Date().toISOString(),
      source:    "KEC BioPulse AI Form",
    };

    try {
      const res = await fetch(sheetUrl, {
        method: "POST", redirect: "follow",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(12000),
      });

      const responseText = await res.text();
      console.log("📋 Sheet response:", responseText.slice(0, 200));

      if (responseText.trim().startsWith("<")) {
        console.error("❌ Got HTML — Apps Script not deployed correctly");
      } else {
        try {
          const json = JSON.parse(responseText);
          console.log("✅ Lead saved. Row:", json.row);
        } catch {
          console.log("ℹ️ Non-JSON response:", responseText.slice(0, 100));
        }
      }
    } catch (fetchErr) {
      console.error("❌ Fetch failed:", fetchErr.message);
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("API error:", err.message);
    return NextResponse.json({ success: true });
  }
}