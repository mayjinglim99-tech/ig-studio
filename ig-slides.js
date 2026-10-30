// Instagram Studio slide renderer — shared by the studio preview and the PNG export page.
(function () {
  const D = {
    sparkle:`<svg viewBox="0 0 120 90" width="150" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"><path d="M20 70 8 40M55 60 58 10M88 68 112 36"/></svg>`,
    heart:`<svg viewBox="0 0 100 90" width="110" fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round"><path d="M50 82C18 60 6 44 8 28 10 12 30 4 42 14c4 3 7 8 8 12 1-4 4-9 8-12 12-10 32-2 34 14 2 16-10 32-42 54z"/></svg>`,
    stars:`<svg viewBox="0 0 120 100" width="130" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"><path d="M40 10l8 22 22 2-17 14 6 22-19-12-19 12 6-22L10 34l22-2z"/><path d="M92 54l4 11 11 1-8 7 3 11-10-6-10 6 3-11-8-7 11-1z"/></svg>`,
    crown:`<svg viewBox="0 0 140 100" width="150" fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"><path d="M14 80 22 26l30 30 18-44 18 44 30-30 8 54z"/><path d="M14 92h112"/></svg>`,
    bubble:`<svg viewBox="0 0 150 110" width="150" fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round"><path d="M20 20h88a12 12 0 0 1 12 12v34a12 12 0 0 1-12 12H58l-22 18 4-18H20A12 12 0 0 1 8 66V32a12 12 0 0 1 12-12z"/><circle cx="44" cy="49" r="4" fill="currentColor"/><circle cx="64" cy="49" r="4" fill="currentColor"/><circle cx="84" cy="49" r="4" fill="currentColor"/></svg>`,
    coffee:`<svg viewBox="0 0 140 120" width="150" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 50h80v20a32 32 0 0 1-32 32H50a32 32 0 0 1-32-32z"/><path d="M98 58h10a14 14 0 0 1 0 28h-12"/><path d="M44 36c-6-8 6-12 0-22M64 36c-6-8 6-12 0-22"/><path d="M10 112h100"/></svg>`,
    squiggle:`<svg viewBox="0 0 160 40" width="150" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"><path d="M6 26c14-22 24 18 38 0s24 18 38 0 24 18 38 0 18 10 34-6"/></svg>`,
    flower:`<svg viewBox="0 0 100 100" width="100" fill="none" stroke="currentColor" stroke-width="5"><circle cx="50" cy="50" r="10"/><path d="M50 40c-8-26 8-34 0 0M60 50c26-8 34 8 0 0M50 60c8 26-8 34 0 0M40 50c-26 8-34-8 0 0"/></svg>`,
    arrow:`<svg viewBox="0 0 200 120" width="200" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 96c30 8 46-30 30-44s-36 18-4 30c34 12 92 2 142-34"/><path d="M152 34l26 14-12 26"/></svg>`
  };
  const S = {
    mug:`<svg viewBox="0 0 260 240" width="260"><ellipse cx="120" cy="214" rx="104" ry="16" fill="rgba(0,0,0,.25)"/><path d="M30 70h180v90a60 60 0 0 1-60 60H90a60 60 0 0 1-60-60z" fill="#f3eee8"/><path d="M210 92h12a34 34 0 0 1 0 68h-16" fill="none" stroke="#f3eee8" stroke-width="18"/><ellipse cx="120" cy="70" rx="90" ry="20" fill="#e4dbd1"/><ellipse cx="120" cy="72" rx="78" ry="14" fill="#8a5f45"/><path d="M96 72c10-6 34-6 46 0" stroke="#d9b89c" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`,
    polaroid:`<svg viewBox="0 0 220 250" width="220"><rect x="10" y="10" width="200" height="230" rx="8" fill="#fbf9f6"/><rect x="26" y="26" width="168" height="158" fill="#c9a49d"/><circle cx="110" cy="105" r="42" fill="#e9c9c2"/><path d="M26 184l50-50 40 34 30-24 48 40z" fill="#9c7a73"/><path d="M60 214h100" stroke="#cbbfb5" stroke-width="6" stroke-linecap="round"/></svg>`,
    note:`<svg viewBox="0 0 240 230" width="240"><rect x="12" y="12" width="210" height="200" fill="#f1d9a7" transform="rotate(-6 117 112)"/><path d="M60 80h110M60 112h120M60 144h80" stroke="#7a5f3a" stroke-width="7" stroke-linecap="round" transform="rotate(-6 117 112)"/><rect x="90" y="0" width="70" height="26" fill="rgba(255,255,255,.6)" transform="rotate(4 125 13)"/></svg>`,
    laptop:`<svg viewBox="0 0 320 200" width="320"><rect x="40" y="10" width="240" height="150" rx="10" fill="#d8d3cd"/><rect x="54" y="24" width="212" height="122" rx="4" fill="#2f2a27"/><path d="M80 60h120M80 84h160M80 108h90" stroke="#d9a7a0" stroke-width="8" stroke-linecap="round"/><path d="M10 168h300l-16 22H26z" fill="#e8e3dd"/></svg>`
  };
  const CARD_DOODLES = ['stars', 'bubble', 'squiggle', 'heart', 'crown', 'coffee', 'flower', 'sparkle'];
  const STICKERS = ['mug', 'note', 'polaroid', 'laptop'];
  const BGS = ['relatable', 'storytelling', 'saveable', 'educational', 'contrast', 'credible'];

  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const rich = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<span class="hl">$1</span>');
  const plain = s => esc(String(s ?? '').replace(/\*\*/g, ''));
  const pos = (html, css, cls = 'dood') => `<div class="${cls}" style="${css}">${html}</div>`;
  const streaks = `<div class="streak" style="left:620px"></div><div class="streak" style="left:820px;width:90px"></div>`;
  const rings = '<div class="rings">' + '<i></i>'.repeat(13) + '</div>';
  const swipe = `<div class="swipe">${D.arrow}</div>`;
  const handle = name => `<div class="handle">${esc(name || 'Isabelle · Penang')}</div>`;

  function card(s, i, inner) {
    const side = i % 2 ? 'left' : 'right';
    const dood = D[CARD_DOODLES[i % CARD_DOODLES.length]];
    const stickerName = STICKERS[Math.floor(i / 2) % STICKERS.length];
    const sticker = i % 2 ? pos(S[stickerName], 'right:300px;bottom:50px;transform:rotate(-6deg)', 'sticker') : '';
    return `<div class="card ${side}">${rings}
      ${s.eyebrow ? `<div class="eyebrow">${plain(s.eyebrow)}</div>` : ''}
      ${s.title ? `<h3>${plain(s.title)}</h3>` : ''}
      ${s.sub ? `<div class="sub">${plain(s.sub)}</div>` : ''}
      ${inner}
      ${pos(dood, 'right:60px;bottom:40px')}</div>${sticker}`;
  }

  const T = {
    cover: (s, i, ctx) => `${pos(D.sparkle, 'left:110px;top:110px')}
      <div class="cover-title">${s.big ? `<span class="big">${plain(s.big)}</span>` : ''}${plain(s.title)}</div>
      ${s.sub ? `<div class="cover-sub">${plain(s.sub)}</div>` : ''}${pos(D.heart, 'right:120px;bottom:200px')}${handle(ctx.handle)}`,
    cover2: (s, i, ctx) => `<div class="serif-wrap"><div class="serif-title">${plain(s.title)}</div>${s.label ? `<div class="label-strip">${plain(s.label)}</div>` : ''}</div>${handle(ctx.handle)}`,
    photo: (s, i) => `<div class="ptext">${s.kicker ? `<div class="kicker">${plain(s.kicker)}</div>` : ''}${(s.lines || []).map(l => `<div>${rich(l)}</div>`).join('')}</div>
      ${pos(D[i % 2 ? 'bubble' : 'sparkle'], 'right:120px;bottom:260px')}`,
    note: (s, i) => card(s, i, (s.lines || []).map(l => `<p>${plain(l)}</p>`).join('')),
    list: (s, i) => {
      const mark = (k) => s.mark === 'check' ? '✓ ' : s.mark === 'x' ? '✗ ' : `${k + 1}. `;
      return card(s, i, `<ul>${(s.items || []).map((it, k) => {
        const o = typeof it === 'string' ? { text: it } : it;
        return `<li>${mark(k)}${plain(o.text)}${o.note ? `<small>${plain(o.note)}</small>` : ''}</li>`;
      }).join('')}</ul>`);
    },
    dodont: (s, i, ctx) => card(s, i, `<div class="two">
      <div><h4>${ctx.zh ? '该做 ✓' : 'Do ✓'}</h4><ul>${(s.do || []).map(x => `<li>${plain(x)}</li>`).join('')}</ul></div>
      <div><h4>${ctx.zh ? '不该做 ✗' : "Don't ✗"}</h4><ul>${(s.dont || []).map(x => `<li>${plain(x)}</li>`).join('')}</ul></div></div>`),
    cta: (s, i, ctx) => `<div class="ptext" style="top:260px">${(s.lines || []).map(l => `<div>${rich(l)}</div>`).join('')}${s.kicker ? `<div class="kicker">${plain(s.kicker)}</div>` : ''}</div>
      ${pos(D.flower, 'left:110px;bottom:230px')}${pos(D.stars, 'right:120px;top:120px')}${handle(ctx.handle)}`,
  };

  function renderSlide(item, i, opts = {}) {
    const s = item.slides[i] || {};
    const total = item.slides.length;
    const ctx = { zh: item.language === 'zh', handle: opts.handle };
    const bg = BGS.includes(item.format) ? item.format : 'relatable';
    const body = (T[s.type] || T.note)(s, i, ctx);
    const last = i === total - 1;
    const pager = '<div class="pager">' + item.slides.map((_, k) => `<i class="${k === i ? 'on' : ''}"></i>`).join('') + '</div>';
    return `<div class="slide bg-${bg}${ctx.zh ? ' zh' : ''}">${streaks}${body}${last ? '' : swipe}${pager}</div>`;
  }

  // Shrink text on any slide whose content would overflow the 1080×1350 frame
  function fit(root) {
    root.querySelectorAll('.slide').forEach(slide => {
      const box = slide.querySelector('.card, .ptext, .serif-wrap, .cover-title');
      if (!box) return;
      const limit = box.classList.contains('card') ? 1180 : box.classList.contains('serif-wrap') ? 980 : box.classList.contains('cover-title') ? 650 : 900;
      let k = 1;
      slide.style.setProperty('--k', k);
      while (box.offsetHeight > limit && k > 0.55) { k -= 0.05; slide.style.setProperty('--k', k.toFixed(2)); }
    });
  }

  window.IGSlides = { renderSlide, fit };
})();
