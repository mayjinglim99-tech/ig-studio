// Brand profile, carousel formats and slide schema used in the AI prompts
const DEFAULT_BRAND = `Name: Isabelle (谢林美君), based in Penang, Malaysia. 90s-born working mother, sales leader and entrepreneur who leads and coaches a sales team.

Story facts you may use (do not invent other personal facts):
- Scored 11As in SPM but didn't know her direction, so she went to Form 6 to give herself time to think.
- Studied English for Professional at Universiti Sains Malaysia (USM), graduated 2018.
- Started in sales in July 2015 as a university student with little sales experience, after an introduction. She treated it as learning, knowing she could go back to a conventional path.
- Later went full-time, built her sales skills, achieved MDRT qualification, and now leads a team.
- A mother who builds her career while protecting family time.

Audience: women aged 23–35, students, young adults curious about side income or a career change, working mothers, employees who feel stuck or overlooked, people who think they are introverted or "not sales material".

Content pillars: women's growth and confidence; mindset; career and entrepreneurship; sales and communication skills (useful to anyone); real life as a working mum and young leader; her journey from book-smart student to sales leader.

Rules:
- Give real value first. Soft invitations only, no hard selling.
- Do not mention insurance, finance products or recruitment unless the topic asks for it.
- Never promise guaranteed income, easy money, instant success or a specific lifestyle.
- Avoid absolute words (always, guaranteed, best, 一定, 绝对, 最好).
- Do not use family hardship stories unless they appear in the topic notes.
- Chinese copy must sound like natural Malaysian Chinese (啦、咯 used lightly), not mainland marketing language.`;

const FORMATS = {
  relatable: {
    name: 'Relatable',
    guide: `Relatable: emotion-led, makes people feel seen. Ideas: things I wish I knew earlier, before vs after, "if you know you know" struggles, realistic day in the life, my unpopular opinion.
Structure: cover (big number + title) → photo (short personal context) → one "note" slide per point (5–7 points, eyebrow like "lesson 01") → cta.`,
  },
  storytelling: {
    name: 'Storytelling',
    guide: `Storytelling, Problem → Journey → Solution arc (9 slides, in this order):
1 cover2: hook with a specific, relatable struggle.
2 photo: admit the mistake ("my first mistake ↓").
3 note: the first crack, the moment she realised something wasn't working.
4 list (mark "x"): what she tried that didn't work, the messy middle.
5 note: the turning point.
6 list (mark "check"): what she did differently.
7 note: the result. Make it tangible but only with facts from the brand profile.
8 photo: the transformation, where she is now.
9 cta.`,
  },
  saveable: {
    name: 'Saveable',
    guide: `Saveable: easy to digest and worth bookmarking. Ideas: cheat sheet, do's and don'ts, quick tips, "top 5".
Structure: cover (big number + title) → note (why this works) → list (mark "num", the cheat sheet itself, 4–6 items each with a short note) → dodont → list (mark "num", a 3-step practice) → cta.`,
  },
  educational: {
    name: 'Educational',
    guide: `Educational: teach, guide, simplify. Ideas: step-by-step tutorial with a clear takeaway, biggest mistakes beginners make, myth-busting, top tools I use daily.
Structure: cover (big number + title) → one note slide per step/mistake/myth (4–6) → list (mark "check", quick recap) → cta.`,
  },
  contrast: {
    name: 'Stop X, start Y',
    guide: `Contrast format: call out something readers do that isn't working, then give the better way.
Structure: cover2 ("Stop … / Start …" hook) → note (why the old way fails) → note (start doing this instead) → 2 note slides (reasons it works) → list (mark "num", how to make the switch in 2–3 steps) → photo (a quotable summary: stop X, start Y, because Z) → cta.`,
  },
  credible: {
    name: 'Credible',
    guide: `Credible: authority and proof. Ideas: what I'd do if I had to start over, lessons from years of practice, behind-the-scenes of how she works.
Only use facts from the brand profile or the topic notes as proof.
Structure: cover2 → photo (context) → 4–5 note slides (one lesson each) → list (mark "check", summary) → cta.`,
  },
};

const SLIDE_SCHEMA = `Return ONLY a JSON object with this shape:
{
  "title": "short internal name for this carousel",
  "slides": [ ...slide objects... ],
  "caption": "Instagram caption: 2–4 short paragraphs with a few emojis, ending with one easy question or a save/share prompt, then 8–10 relevant hashtags on the last line",
  "checkNotes": ["any statement Isabelle should confirm is true for her before posting"]
}
Slide objects (use only these types and fields):
- {"type":"cover","big":"7","title":"things I wish I knew at 22","sub":"short handwritten-style subtitle"}   (big is optional, use for list-style posts)
- {"type":"cover2","title":"bold hook headline, max 12 words","label":"short label strip under it"}
- {"type":"photo","kicker":"optional small line like 'my first mistake ↓'","lines":["1–3 short lines of text on a photo"]}
- {"type":"note","eyebrow":"small label e.g. lesson 01","title":"headline","sub":"optional short line","lines":["1–2 short paragraphs"]}
- {"type":"list","eyebrow":"small label","title":"headline","mark":"num|check|x","items":[{"text":"item","note":"optional tiny explanation"}]}
- {"type":"dodont","eyebrow":"small label","title":"headline","do":["3 items"],"dont":["3 items"]}
- {"type":"cta","kicker":"optional small closing line","lines":["1–2 lines: soft call to action"]}
Wrap 1–4 words per slide in **double asterisks** to highlight them (only on photo and cta slides).
Keep text short: max 35 English words or 60 Chinese characters per slide. 6–10 slides total.`;
