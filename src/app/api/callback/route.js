import { NextResponse } from "next/server";

/**
 * Request-a-Callback capture — posts the lead to a Google Apps Script sheet.
 * Uses CALLBACK_SHEET_URL, falling back to GOOGLE_SHEET_URL. Kept separate
 * from the ROI lead route (/api/biofuel-leads) so the two lists don't mix.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email = "", interest = "", message = "" } = body;

    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
    }

    const sheetUrl = process.env.CALLBACK_SHEET_URL || process.env.GOOGLE_SHEET_URL;

    // No sheet configured yet — accept the lead so the UI completes, but don't post anywhere.
    if (!sheetUrl || !sheetUrl.startsWith("https://script.google.com/macros/s/") || !sheetUrl.endsWith("/exec")) {
      console.warn("⚠️ CALLBACK_SHEET_URL not configured — lead not forwarded.");
      return NextResponse.json({ success: true, note: "Sheet not configured" });
    }

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      interest,
      message: message.trim(),
      timestamp: new Date().toISOString(),
      source: "CBG Request a Callback",
    };

    try {
      const res = await fetch(sheetUrl, {
        method: "POST",
        redirect: "follow",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(12000),
      });
      const text = await res.text();
      console.log("📋 Callback sheet response:", text.slice(0, 120));
    } catch (fetchErr) {
      console.error("❌ Callback forward failed:", fetchErr.message);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Callback API error:", err.message);
    return NextResponse.json({ success: true });
  }
}
