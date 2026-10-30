// Instagram Studio (browser-only). Everything stays on this device:
// the OpenAI key and the post queue live in this browser's storage.
const KEY_STORE = 'igstudio:openai-key';
const LIB_STORE = 'igstudio:library:v1';
const MODEL_STORE = 'igstudio:model';

const store = {
  get(k, fallback) { try { const v = localStorage.getItem(k); return v === null ? fallback : JSON.parse(v); } catch { return fallback; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } },
};

async function loadLib() {
  const saved = store.get(LIB_STORE, null);
  if (saved) return saved;
  // First visit on this device: start with the approved carousels
  const items = await fetch('approved/starter.json').then(r => r.json()).catch(() => []);
  const lib = { settings: { brand: DEFAULT_BRAND }, items };
  store.set(LIB_STORE, lib);
  return lib;
}
const saveLib = lib => {
  if (!store.set(LIB_STORE, lib)) throw new Error('This browser blocked saving. Turn off private browsing and try again.');
};

const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

function parseJSON(text) {
  const start = text.indexOf('{'), end = text.lastIndexOf('}');
  if (start < 0 || end < 0) throw new Error('The AI did not return a carousel. Please try again.');
  return JSON.parse(text.slice(start, end + 1));
}

async function completeJSON(system, prompt) {
  const key = store.get(KEY_STORE, '');
  if (!key) throw new Error('Add your OpenAI key in Settings first.');
  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key },
    body: JSON.stringify({
      model: store.get(MODEL_STORE, 'gpt-4o'), max_tokens: 4096,
      response_format: { type: 'json_object' },
      messages: [{ role: 'system', content: system }, { role: 'user', content: prompt }],
    }),
  });
  const data = await r.json().catch(() => ({}));
  if (r.status === 401) throw new Error('OpenAI rejected the key. Check it in Settings.');
  if (r.status === 429) throw new Error('OpenAI says the account is out of credit or busy. Check your billing at platform.openai.com.');
  if (!r.ok) throw new Error(data.error?.message || 'OpenAI request failed (' + r.status + ')');
  return data.choices?.[0]?.message?.content || '';
}

async function generateCarousel(lib, { format, language, topic, notes }) {
  const formatId = FORMATS[format] ? format : 'relatable';
  const fmt = FORMATS[formatId];
  topic = (topic || '').trim(); notes = (notes || '').trim();
  const taken = lib.items.slice(-30).map(i => `- ${i.title}`).join('\n') || '(none yet)';
  const langRule = language === 'zh'
    ? 'Write every slide and the caption in Simplified Chinese, in natural Malaysian Chinese. Hashtags can mix Chinese and English (e.g. #槟城 #马来西亚 #penang).'
    : 'Write every slide and the caption in clear, warm English. Use Malaysian context where natural (e.g. #penang #malaysia).';

  const out = await completeJSON(
    'You are an Instagram carousel strategist and ghostwriter for one personal brand. You write scroll-stopping but honest carousels and you always return valid JSON.',
    `BRAND PROFILE:
${lib.settings.brand}

FORMAT TO USE:
${fmt.guide}

TOPIC: ${topic || 'Pick a fresh, specific topic from the content pillars that suits this format.'}
${notes ? `EXTRA NOTES FROM ISABELLE (facts she confirms, or an offer she can send in DMs):\n${notes}\n` : ''}
Already-made carousels (pick a different angle):
${taken}

RULES:
- ${langRule}
- First slide must stop the scroll with a specific tension, question or surprising insight.
- Every middle slide gives one concrete, useful idea. No filler.
- CTA must be soft: save, share, or answer an easy question. Only use "comment KEYWORD and I'll DM you" if the extra notes name something she can send.
- Never invent personal events, numbers, clients or results. If the story needs a detail the profile doesn't give, keep it general.
- Every word on the slides, including eyebrows, kickers and labels, must be in the post language. No English labels in a Chinese post.
- If the cover uses a big number, the carousel must contain exactly that many points.
- checkNotes is required: list EVERY statement about Isabelle's own past, habits, mistakes or results that is not word-for-word supported by the brand profile or extra notes, so she can confirm or edit it. Leave it empty only if there are none.
- Voice: warm, specific, plain words, short sentences. Sound like a real person talking to a friend, not a motivational poster. Avoid clichés ("game-changer", "embrace the journey", "unlock", "with a smile") and avoid exclamation marks except once at most.
- Quality bar, the kind of lines that work: "You don't need the whole map. Just the next step." / "A 'no' usually means not now, not this, or not explained well yet." / "Skills compound. Comfort doesn't."

${SLIDE_SCHEMA}`
  );
  const data = parseJSON(out);
  if (!Array.isArray(data.slides) || !data.slides.length) throw new Error('The AI returned no slides. Please try again.');

  // Second pass: flag anything about Isabelle that the brand profile doesn't support
  let checkNotes = Array.isArray(data.checkNotes) ? data.checkNotes : [];
  try {
    const review = parseJSON(await completeJSON(
      'You are a strict fact-checker. You return valid JSON only.',
      `CONFIRMED FACTS ABOUT ISABELLE (nothing else is confirmed):
${lib.settings.brand}
${notes ? `\nEXTRA CONFIRMED NOTES:\n${notes}\n` : ''}
CAROUSEL TEXT:
${JSON.stringify({ slides: data.slides, caption: data.caption })}

Go through the carousel and pull out every first-person statement (I, my, me, 我, 我的, 当时的我) and every statement describing Isabelle. For each, decide if the confirmed facts directly support it. Timelines, feelings, habits, mistakes, skill levels, ages and life stages count as claims. General advice to the reader is not a claim.
Return {"claims":[{"quote":"exact text","supported":true|false,"confirm":"short English note on what Isabelle should confirm"}]}`
    ));
    if (Array.isArray(review.claims)) checkNotes = review.claims.filter(c => c && c.supported === false)
      .map(c => `"${String(c.quote || '').replace(/\*\*/g, '')}": ${c.confirm || 'please confirm'}`);
  } catch (e) { console.warn('Fact-check failed:', e.message); }

  if (language === 'zh') data.slides.forEach(sl => {
    const m = /^\s*(lesson|tip|step|point|day)\s*0?(\d+)\s*$/i.exec(sl.eyebrow || '');
    if (m) sl.eyebrow = `第 ${m[2].padStart(2, '0')} ${({ lesson: '课', tip: '招', step: '步', point: '点', day: '天' })[m[1].toLowerCase()]}`;
  });

  return {
    id: newId(), createdAt: new Date().toISOString(), status: 'ready',
    format: formatId, language, topic,
    title: data.title || topic || fmt.name,
    slides: data.slides.slice(0, 12),
    caption: (data.caption || '').replace(/\*\*/g, ''),
    checkNotes, files: [],
  };
}
