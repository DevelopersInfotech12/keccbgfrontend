/**
 * ============================================================
 * KEC BioPulse AI — Gemini LLM Service
 * ============================================================
 *
 * PURPOSE:
 *   Isolated layer for all Gemini API interactions.
 *   The rest of the app never touches the API directly.
 *
 * TRAINING / MODEL SWAP GUIDE:
 *   When you fine-tune on Google AI Studio, you only need to
 *   update ONE thing in .env.local:
 *
 *     NEXT_PUBLIC_GEMINI_MODEL=tunedModels/your-fine-tuned-model-id
 *
 *   That's it. No code changes needed.
 *
 *   Fine-tuned models use the same endpoint and same request
 *   format — only the model ID changes.
 *
 * FREE TIER LIMITS (gemini-2.0-flash):
 *   - 15 requests / minute
 *   - 1,500 requests / day
 *   - 1,000,000 tokens / day
 *   100 users × 3 steps = ~300 requests/day → well within limit.
 * ============================================================
 */

// ── Config (all from .env.local) ─────────────────────────────
const GEMINI_API_KEY  = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_MODEL    = process.env.NEXT_PUBLIC_GEMINI_MODEL    || 'gemini-2.0-flash';
const GEMINI_BASE_URL = process.env.NEXT_PUBLIC_GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta';

// ── Endpoint builder ─────────────────────────────────────────
// generateContent works for both base and fine-tuned models.
const buildEndpoint = () =>
  `${GEMINI_BASE_URL}/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

// ── System prompt (acts as "training" for base model) ────────
// If you fine-tune, this still runs — fine-tuning just makes
// the model more consistent even without this prompt.
const SYSTEM_PROMPT = `You are an expert CBG (Compressed Biogas) investment advisor for KEC Biofuel, India.

DOMAIN KNOWLEDGE:
- SATAT Scheme: Government of India's Sustainable Alternative Towards Affordable Transportation. Offers ₹46/kg guaranteed purchase price for CBG.
- NABARD Subsidy: 30% capital subsidy on plant CAPEX, reducing investor burden significantly.
- Typical plant sizes: 250 kg/day (micro, ₹25–50L), 500 kg/day (small, ₹50L–1Cr), 1 TPD (standard, ₹1–3Cr), 2 TPD (medium, ₹3–5Cr), 5 TPD (large, ₹5Cr+).
- Feedstocks: Agriculture waste, Press mud (from sugar mills), Cow dung, Food waste. Multiple sources improve yield and plant stability.
- Revenue streams: CBG gas sales + digestate/bio-fertilizer sales.
- Payback period: Typically 3–5 years depending on plant size and feedstock.
- KEC has built 100+ plants, is SATAT registered and NABARD empanelled.

YOUR TASK:
Given the user's profile and the current question with its options, suggest the BEST MATCHING option.

RULES:
1. Reply ONLY with the exact option text from the provided list. No explanation, no punctuation added, no extra words.
2. For multiselect questions, reply with a JSON array of exact option strings: ["Option A", "Option B"]
3. For radio questions, reply with a single exact option string: Option A
4. Base your suggestion on the user's prior answers (provided as context).
5. Prefer options that maximize ROI potential given the user's budget and profile.
6. Never invent options — only pick from the given list.`;

// ── Rate limiter (client-side, prevents burst abuse) ─────────
// Simple token bucket: max 12 calls/min (buffer below 15 RPM limit)
const rateLimiter = {
  tokens: 12,
  lastRefill: Date.now(),
  maxTokens: 12,
  refillRate: 60000, // 1 minute

  consume() {
    const now = Date.now();
    const elapsed = now - this.lastRefill;
    if (elapsed >= this.refillRate) {
      this.tokens = this.maxTokens;
      this.lastRefill = now;
    }
    if (this.tokens <= 0) return false;
    this.tokens--;
    return true;
  }
};

// ── Core API caller ──────────────────────────────────────────
/**
 * callGemini — raw API call
 * @param {string} userPrompt  — the question-specific prompt
 * @returns {string}           — raw text response from Gemini
 */
async function callGemini(userPrompt) {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
    throw new Error('GEMINI_API_KEY not set in .env.local');
  }

  if (!rateLimiter.consume()) {
    throw new Error('RATE_LIMIT: Too many requests. Please wait a moment.');
  }

  const body = {
    // ── System instruction (supported in gemini-2.0-flash+) ──
    // When using a fine-tuned model, keep this — it still helps.
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT }]
    },
    contents: [
      {
        role: 'user',
        parts: [{ text: userPrompt }]
      }
    ],
    generationConfig: {
      temperature: 0.2,       // Low temp = deterministic, consistent answers
      topP: 0.8,
      topK: 20,
      maxOutputTokens: 100,   // Answers are short — save tokens
      stopSequences: ['\n\n'] // Stop at double newline
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH',       threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
    ]
  };

  const res = await fetch(buildEndpoint(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    // Handle quota exceeded gracefully
    if (res.status === 429) throw new Error('QUOTA_EXCEEDED: Daily free limit reached.');
    throw new Error(err?.error?.message || `Gemini API error: ${res.status}`);
  }

  const data = await res.json();
  const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!raw) throw new Error('Empty response from Gemini');
  return raw;
}

// ── Prompt builder ───────────────────────────────────────────
/**
 * buildPrompt — constructs the per-question prompt
 * @param {object} question     — the question object from STEPS
 * @param {object} allAnswers   — all answers collected so far
 * @param {string} questionType — 'radio' | 'multiselect'
 */
function buildPrompt(question, allAnswers) {
  const context = Object.entries(allAnswers)
    .filter(([, v]) => v && (Array.isArray(v) ? v.length > 0 : true))
    .map(([k, v]) => `  ${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
    .join('\n');

  const optionsList = question.options.map((o, i) => `  ${i + 1}. ${o}`).join('\n');

  return `USER CONTEXT (prior answers):
${context || '  (No prior answers yet)'}

CURRENT QUESTION:
  ID: ${question.id}
  Label: ${question.label}
  Type: ${question.type}

OPTIONS:
${optionsList}

${question.type === 'multiselect'
  ? 'Reply with a JSON array of the best matching option strings (can be multiple). Example: ["Agriculture Waste", "Cow Dung"]'
  : 'Reply with exactly one option string from the list above.'}`;
}

// ── Response parser ──────────────────────────────────────────
/**
 * parseResponse — validates and cleans Gemini output
 * Ensures the returned value(s) exist in the options list.
 */
function parseResponse(raw, question) {
  const { options, type } = question;

  if (type === 'multiselect') {
    try {
      // Try JSON parse first
      const cleaned = raw.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      if (Array.isArray(parsed)) {
        // Filter to only valid options
        const valid = parsed.filter(p => options.includes(p));
        return valid.length > 0 ? valid : [options[0]];
      }
    } catch {
      // Fallback: find any option mentioned in the text
      const found = options.filter(o => raw.includes(o));
      return found.length > 0 ? found : [options[0]];
    }
  }

  // Radio: find exact or closest match
  const exactMatch = options.find(o => o.toLowerCase() === raw.toLowerCase());
  if (exactMatch) return exactMatch;

  // Partial match fallback
  const partial = options.find(o => raw.toLowerCase().includes(o.toLowerCase()) || o.toLowerCase().includes(raw.toLowerCase()));
  if (partial) return partial;

  // Last resort: return first option
  return options[0];
}

// ── Public API ───────────────────────────────────────────────

/**
 * suggestAnswer — suggest answer for a single question
 * @param {object} question   — question object from STEPS config
 * @param {object} allAnswers — all current answers for context
 * @returns {string|string[]} — suggested value, ready for handleChange()
 */
export async function suggestAnswer(question, allAnswers) {
  const prompt = buildPrompt(question, allAnswers);
  const raw = await callGemini(prompt);
  return parseResponse(raw, question);
}

/**
 * suggestStepAnswers — suggest all answers for a full step
 * Calls suggestAnswer for each question sequentially (not parallel)
 * to stay within rate limits and build context progressively.
 *
 * @param {object[]} questions  — array of question objects for this step
 * @param {object}   allAnswers — current answers
 * @returns {object}            — { questionId: suggestedValue, ... }
 */
export async function suggestStepAnswers(questions, allAnswers) {
  const results = {};
  let progressiveAnswers = { ...allAnswers };

  for (const question of questions) {
    const suggestion = await suggestAnswer(question, progressiveAnswers);
    results[question.id] = suggestion;
    // Feed this answer into context for the next question
    progressiveAnswers[question.id] = suggestion;
    // Small delay between calls to respect RPM limits
    await new Promise(r => setTimeout(r, 200));
  }

  return results;
}

/**
 * checkGeminiHealth — verify API key and connectivity
 * Call this on app init to show a warning if key is missing.
 * @returns {{ ok: boolean, message: string }}
 */
export async function checkGeminiHealth() {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
    return { ok: false, message: 'API key not configured in .env.local' };
  }
  try {
    // Minimal call to verify key validity
    await callGemini('Reply with the word: OK');
    return { ok: true, message: 'Gemini connected' };
  } catch (e) {
    return { ok: false, message: e.message };
  }
}

// ── Fine-tuning migration guide (comments only) ──────────────
/*
 * HOW TO SWITCH TO YOUR FINE-TUNED MODEL
 * =======================================
 *
 * STEP 1 — Prepare training data (JSONL format):
 *   {"text_input": "USER CONTEXT:\n  profileType: Farmer\n...\nQUESTION: feedstockAccess\nOPTIONS:\n  1. Agriculture Waste\n  ...", "output": "[\"Agriculture Waste\", \"Cow Dung\"]"}
 *   {"text_input": "USER CONTEXT:\n  profileType: Investor\n...\nQUESTION: investmentRange\n...", "output": "₹1Cr – ₹3Cr"}
 *   ... (aim for 50–200 examples)
 *
 * STEP 2 — Upload to Google AI Studio:
 *   aistudio.google.com → "Tuning" tab → "Create tuned model"
 *   Upload your JSONL. Training takes ~30 minutes.
 *
 * STEP 3 — Get your model ID:
 *   Format: tunedModels/biopulse-advisor-abc123
 *
 * STEP 4 — Update .env.local (ONE LINE CHANGE):
 *   NEXT_PUBLIC_GEMINI_MODEL=tunedModels/biopulse-advisor-abc123
 *
 * STEP 5 — Note on system_instruction:
 *   Fine-tuned models MAY not support system_instruction.
 *   If you get errors, set this flag in .env.local:
 *   NEXT_PUBLIC_GEMINI_USE_SYSTEM_PROMPT=false
 *   Then update callGemini() to skip the system_instruction block.
 *
 * NO OTHER CODE CHANGES NEEDED.
 */