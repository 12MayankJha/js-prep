<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>JS Interview Prep</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<style>
:root {
  --bg:#0b0e17;--surface:#111520;--card:#161b2e;--border:#1e2740;
  --accent:#6ee7ff;--accent2:#ff6b9d;--accent3:#a78bfa;
  --text:#e2e8f0;--muted:#64748b;--code-bg:#0d1117;
  --tag-basic-bg:#134e4a;--tag-basic:#5eead4;
  --tag-int-bg:#1e3a5f;--tag-int:#60a5fa;
  --tag-adv-bg:#3b1f5e;--tag-adv:#c084fc;
  --success:#22c55e;--warning:#f59e0b;
}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;overflow-x:hidden}

/* ── SIDEBAR ── */
.sidebar{position:fixed;left:0;top:0;bottom:0;width:272px;background:var(--surface);border-right:1px solid var(--border);overflow-y:auto;z-index:100;display:flex;flex-direction:column;transition:transform .3s}
.sidebar::-webkit-scrollbar{width:3px}.sidebar::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px}
.logo{padding:22px 18px 18px;border-bottom:1px solid var(--border);flex-shrink:0}
.logo-title{font-family:'Syne',sans-serif;font-weight:800;font-size:1.2rem;background:linear-gradient(135deg,var(--accent),var(--accent3));-webkit-background-clip:text;-webkit-text-fill-color:transparent;line-height:1.2}
.logo-sub{font-size:.7rem;color:var(--muted);margin-top:3px;letter-spacing:.06em;text-transform:uppercase}
.prog-wrap{padding:14px 18px;border-bottom:1px solid var(--border);flex-shrink:0}
.prog-label{display:flex;justify-content:space-between;font-size:.7rem;color:var(--muted);margin-bottom:6px}
.prog-bar{height:3px;background:var(--border);border-radius:2px;overflow:hidden}
.prog-fill{height:100%;background:linear-gradient(90deg,var(--accent),var(--accent3));transition:width .4s;width:0%}
.search-wrap{padding:10px 18px;border-bottom:1px solid var(--border);flex-shrink:0;position:relative}
.search-icon{position:absolute;left:30px;top:50%;transform:translateY(-50%);color:var(--muted);font-size:.75rem;pointer-events:none}
.search-input{width:100%;background:var(--card);border:1px solid var(--border);border-radius:7px;padding:7px 10px 7px 28px;color:var(--text);font-size:.8rem;font-family:'Inter',sans-serif;outline:none;transition:border-color .2s}
.search-input:focus{border-color:var(--accent)}
.nav-hdr{font-family:'Syne',sans-serif;font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);padding:14px 18px 6px}
.nav-item{display:flex;align-items:center;gap:9px;padding:7px 18px;cursor:pointer;font-size:.8rem;color:var(--muted);border-left:2px solid transparent;transition:all .15s;user-select:none}
.nav-item:hover{color:var(--text);background:rgba(110,231,255,.04)}
.nav-item.active{color:var(--accent);border-left-color:var(--accent);background:rgba(110,231,255,.06)}
.nav-count{margin-left:auto;font-size:.67rem;background:var(--border);padding:1px 6px;border-radius:10px;color:var(--muted)}
.nav-item.active .nav-count{background:rgba(110,231,255,.15);color:var(--accent)}
.nav-dot{width:5px;height:5px;border-radius:50%;background:var(--border);flex-shrink:0}
.nav-item.active .nav-dot{background:var(--accent)}
.nav-cached{width:6px;height:6px;border-radius:50%;background:var(--success);flex-shrink:0;margin-left:auto}

/* ── MAIN ── */
.main{margin-left:272px;min-height:100vh;display:flex;flex-direction:column}
.topbar{position:sticky;top:0;z-index:50;background:rgba(11,14,23,.92);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);padding:11px 28px;display:flex;align-items:center;gap:14px}
.topbar-title{font-family:'Syne',sans-serif;font-size:1.05rem;font-weight:700;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pills{display:flex;gap:5px;flex-shrink:0}
.pill{padding:4px 11px;border-radius:20px;font-size:.72rem;font-weight:500;cursor:pointer;border:1px solid var(--border);background:transparent;color:var(--muted);transition:all .15s;font-family:'Inter',sans-serif}
.pill:hover{border-color:var(--accent);color:var(--accent)}
.pill.active{background:var(--accent);color:#000;border-color:var(--accent);font-weight:600}
.pill.basic.active{background:var(--tag-basic);color:#000;border-color:var(--tag-basic)}
.pill.intermediate.active{background:var(--tag-int);color:#000;border-color:var(--tag-int)}
.pill.advanced.active{background:var(--tag-adv);color:#000;border-color:var(--tag-adv)}
.hamburger{display:none;background:none;border:none;color:var(--text);font-size:1.2rem;cursor:pointer;padding:4px}
.content{padding:28px;flex:1}

/* ── INTRO ── */
.intro{margin-bottom:24px;padding:24px 28px;background:var(--card);border:1px solid var(--border);border-radius:14px;position:relative;overflow:hidden}
.intro::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--accent),var(--accent3),var(--accent2))}
.intro h1{font-family:'Syne',sans-serif;font-size:1.5rem;font-weight:800;margin-bottom:6px}
.intro p{color:var(--muted);font-size:.87rem;line-height:1.6;max-width:560px}
.stats-row{display:flex;gap:16px;margin-top:16px;flex-wrap:wrap}
.stat{background:var(--surface);border:1px solid var(--border);border-radius:7px;padding:7px 14px;font-size:.78rem;display:flex;align-items:center;gap:7px}
.stat .n{font-family:'Syne',sans-serif;font-weight:700;font-size:1.05rem;color:var(--accent)}
.stat .l{color:var(--muted)}

/* ── FETCH STATUS ── */
.fetch-banner{display:flex;align-items:center;gap:12px;padding:16px 20px;background:rgba(110,231,255,.05);border:1px solid rgba(110,231,255,.15);border-radius:10px;margin-bottom:20px;font-size:.85rem;color:var(--accent)}
.fetch-banner .spinner{width:18px;height:18px;border:2px solid rgba(110,231,255,.2);border-top-color:var(--accent);border-radius:50%;animation:spin .7s linear infinite;flex-shrink:0}
@keyframes spin{to{transform:rotate(360deg)}}
.fetch-error{background:rgba(255,107,157,.05);border-color:rgba(255,107,157,.2);color:var(--accent2)}
.retry-btn{margin-left:auto;padding:4px 12px;background:none;border:1px solid var(--accent2);color:var(--accent2);border-radius:5px;cursor:pointer;font-size:.75rem;font-family:'Inter',sans-serif;transition:all .15s}
.retry-btn:hover{background:rgba(255,107,157,.1)}

/* ── Q CARDS ── */
.q-list{display:flex;flex-direction:column;gap:2px}
.q-card{background:var(--card);border:1px solid var(--border);border-radius:9px;overflow:hidden;transition:border-color .2s,box-shadow .2s}
.q-card:hover{border-color:rgba(110,231,255,.25);box-shadow:0 0 16px rgba(110,231,255,.04)}
.q-card.opened{border-color:rgba(110,231,255,.2)}
.q-hdr{display:flex;align-items:flex-start;gap:12px;padding:14px 18px;cursor:pointer;user-select:none}
.q-num{font-family:'JetBrains Mono',monospace;font-size:.7rem;color:var(--muted);min-width:28px;padding-top:2px;flex-shrink:0}
.q-title{flex:1;font-size:.9rem;font-weight:500;line-height:1.5}
.q-meta{display:flex;align-items:center;gap:7px;flex-shrink:0;padding-top:2px}
.badge{font-size:.63rem;font-weight:600;padding:2px 7px;border-radius:9px;letter-spacing:.04em;text-transform:uppercase}
.badge.basic{background:var(--tag-basic-bg);color:var(--tag-basic)}
.badge.intermediate{background:var(--tag-int-bg);color:var(--tag-int)}
.badge.advanced{background:var(--tag-adv-bg);color:var(--tag-adv)}
.bm-btn{background:none;border:none;color:var(--muted);cursor:pointer;font-size:.88rem;padding:1px 3px;transition:color .15s;line-height:1}
.bm-btn:hover,.bm-btn.on{color:var(--warning)}
.chevron{color:var(--muted);font-size:.72rem;transition:transform .22s;flex-shrink:0}
.q-card.opened .chevron{transform:rotate(180deg)}
.q-body{display:none;padding:0 18px 18px 58px;border-top:1px solid var(--border);animation:fadeIn .18s ease}
.q-body.show{display:block}
@keyframes fadeIn{from{opacity:0;transform:translateY(-3px)}to{opacity:1;transform:translateY(0)}}

/* ── ANSWER CONTENT ── */
.ans{font-size:.86rem;line-height:1.78;color:#cbd5e1;margin-top:14px}
.ans p{margin-bottom:8px}
.ans ul,.ans ol{padding-left:18px;margin-bottom:8px}
.ans li{margin-bottom:3px}
.ans strong{color:var(--text)}
.ans em{color:var(--accent);font-style:normal}
.code-block{background:var(--code-bg);border:1px solid var(--border);border-radius:7px;margin:10px 0;overflow:hidden}
.code-hdr{display:flex;align-items:center;justify-content:space-between;padding:7px 12px;border-bottom:1px solid var(--border);background:rgba(255,255,255,.02)}
.code-lang{font-family:'JetBrains Mono',monospace;font-size:.68rem;color:var(--muted)}
.copy-btn{background:none;border:1px solid var(--border);color:var(--muted);font-size:.68rem;padding:2px 9px;border-radius:4px;cursor:pointer;font-family:'Inter',sans-serif;transition:all .15s}
.copy-btn:hover{border-color:var(--accent);color:var(--accent)}
.copy-btn.done{border-color:var(--success);color:var(--success)}
.code-block pre{padding:12px 14px;overflow-x:auto;font-family:'JetBrains Mono',monospace;font-size:.79rem;line-height:1.65;color:#c9d1d9}
.code-block pre::-webkit-scrollbar{height:3px}.code-block pre::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px}
.icode{font-family:'JetBrains Mono',monospace;font-size:.8em;background:rgba(110,231,255,.08);color:var(--accent);padding:1px 5px;border-radius:3px}
.ans-table{width:100%;border-collapse:collapse;margin:10px 0;font-size:.81rem}
.ans-table th{background:var(--surface);color:var(--accent);padding:7px 11px;text-align:left;font-weight:600;border:1px solid var(--border)}
.ans-table td{padding:7px 11px;border:1px solid var(--border);vertical-align:top}
.ans-table tr:nth-child(even) td{background:rgba(255,255,255,.02)}
.note{background:rgba(110,231,255,.05);border-left:3px solid var(--accent);border-radius:0 5px 5px 0;padding:9px 12px;margin:10px 0;font-size:.81rem;color:#94a3b8}
.note strong{color:var(--accent)}

/* ── SKELETON ── */
.skeleton{background:var(--card);border:1px solid var(--border);border-radius:9px;padding:14px 18px;display:flex;gap:12px;align-items:center}
.skel-line{background:linear-gradient(90deg,var(--border) 25%,rgba(30,39,64,.8) 50%,var(--border) 75%);background-size:200% 100%;animation:shimmer 1.5s infinite;border-radius:4px;height:14px}
@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}

/* ── EMPTY ── */
.empty{text-align:center;padding:70px 20px;color:var(--muted)}
.empty .icon{font-size:2.2rem;margin-bottom:10px}
.empty p{font-size:.88rem}

/* ── MOBILE ── */
.sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:99}
@media(max-width:768px){
  .sidebar{transform:translateX(-100%)}.sidebar.open{transform:translateX(0)}
  .main{margin-left:0}.hamburger{display:block}.sidebar-overlay.active{display:block}
  .content{padding:14px}.q-body{padding-left:18px}.topbar{padding:9px 14px}
  .pills{overflow-x:auto}
}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px}
</style>
</head>
<body>

<div class="sidebar-overlay" id="overlay" onclick="closeSidebar()"></div>

<nav class="sidebar" id="sidebar">
  <div class="logo">
    <div class="logo-title">JS Interview<br>Prep</div>
    <div class="logo-sub">478 Questions · AI Powered</div>
  </div>
  <div class="prog-wrap">
    <div class="prog-label"><span>Progress</span><span id="prog-txt">0 / 478</span></div>
    <div class="prog-bar"><div class="prog-fill" id="prog-fill"></div></div>
  </div>
  <div class="search-wrap">
    <span class="search-icon">🔍</span>
    <input class="search-input" id="search-in" type="text" placeholder="Search questions...">
  </div>
  <div id="nav-body"></div>
</nav>

<div class="main">
  <div class="topbar">
    <button class="hamburger" onclick="toggleSidebar()">☰</button>
    <div class="topbar-title" id="top-title">JavaScript Interview Prep</div>
    <div class="pills">
      <button class="pill active" onclick="setLevel('all',this)">All</button>
      <button class="pill basic" onclick="setLevel('basic',this)">Basic</button>
      <button class="pill intermediate" onclick="setLevel('intermediate',this)">Intermediate</button>
      <button class="pill advanced" onclick="setLevel('advanced',this)">Advanced</button>
    </div>
  </div>
  <div class="content" id="content"></div>
</div>

<script>
// ── CONFIG ──────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id:'fundamentals', icon:'🧱', title:'JavaScript Fundamentals',        count:60,
    prompt:`Generate exactly 60 JavaScript interview questions and answers about: variables (var/let/const), data types, type coercion, operators, control flow, loops, hoisting, scope, closures, IIFE, strict mode, error handling (try/catch/finally), typeof/instanceof, equality (==/===), NaN/null/undefined, JSON, eval, cookies, web storage (localStorage/sessionStorage), web workers, service workers, IndexedDB, PWAs, history API, URI encoding.` },
  { id:'functions',   icon:'🔧', title:'Functions & Scope',               count:55,
    prompt:`Generate exactly 55 JavaScript interview questions and answers about: function declarations vs expressions, arrow functions, first-class functions, higher-order functions, pure functions, currying, partial application, memoization, recursion, default parameters, rest parameters, spread operator, arguments object, call/apply/bind, function scope, block scope, lexical scope, shadowing, closures in depth, IIFE patterns, generators (function*), async generators, callback functions, callback hell.` },
  { id:'objects',     icon:'🏗️', title:'Objects & Prototypes',            count:60,
    prompt:`Generate exactly 60 JavaScript interview questions and answers about: object creation patterns (literal, constructor, Object.create, class), prototype chain, prototypal inheritance, __proto__ vs prototype, Object methods (assign/keys/values/entries/freeze/seal/create/defineProperty/getOwnPropertyDescriptor), property descriptors, getters/setters, ES6 classes (extends/super/static/private fields), Proxy and Reflect, Symbol, WeakRef, FinalizationRegistry, JSON serialize/deserialize, deep vs shallow copy, structuredClone, this keyword in different contexts, new keyword, instanceof.` },
  { id:'arrays',      icon:'📦', title:'Arrays, Strings & Collections',   count:55,
    prompt:`Generate exactly 55 JavaScript interview questions and answers about: array methods (map/filter/reduce/forEach/find/findIndex/some/every/flat/flatMap/at/includes/indexOf/splice/slice/sort/reverse/fill), array destructuring, spread with arrays, Set, Map, WeakSet, WeakMap, string methods (split/join/trim/padStart/includes/startsWith/replace/replaceAll/matchAll/slice/substring/template literals), iterables and iterators, for...of vs for...in, typed arrays, array-like objects, converting collections.` },
  { id:'async',       icon:'⚡', title:'Asynchronous JavaScript',         count:55,
    prompt:`Generate exactly 55 JavaScript interview questions and answers about: event loop, call stack, Web APIs, callback queue, microtask queue, macrotasks vs microtasks, Promises (creation/chaining/all/allSettled/any/race), async/await, error handling in async code, AbortController, fetch API, XMLHttpRequest, CORS, SSE (Server-Sent Events), WebSockets, setTimeout/setInterval/clearTimeout, requestAnimationFrame, queueMicrotask, Promise polyfills, async patterns (retry/throttle/debounce), concurrent vs parallel execution.` },
  { id:'dom',         icon:'🌐', title:'DOM, Events & Browser',           count:55,
    prompt:`Generate exactly 55 JavaScript interview questions and answers about: DOM tree, selecting elements (getElementById/querySelector/querySelectorAll), DOM manipulation (createElement/appendChild/innerHTML/textContent/insertAdjacentHTML), event handling (addEventListener/removeEventListener), event bubbling, event capturing, event delegation, stopPropagation/preventDefault, custom events, MutationObserver, IntersectionObserver, ResizeObserver, shadow DOM, browser storage comparison, BOM (window/navigator/location/history/screen), same-origin policy, CSRF, XSS, content security policy, performance.now(), reflow vs repaint.` },
  { id:'es6plus',     icon:'🚀', title:'ES6+ & Modern JavaScript',        count:58,
    prompt:`Generate exactly 58 JavaScript interview questions and answers about: ES6 features overview, let/const vs var, template literals, tagged templates, destructuring (array/object/nested/default), rest/spread, arrow functions edge cases, classes (all features), modules (import/export/dynamic import/tree shaking), optional chaining, nullish coalescing, logical assignment operators (&&=/||=/ ??=), object shorthand, computed properties, Symbol.iterator, Symbol.asyncIterator, generators, async generators, Promise combinators, BigInt, globalThis, import.meta, top-level await, ES2022-2024 features (at()/Object.hasOwn/Array.fromAsync/using).` },
  { id:'patterns',    icon:'⚙️', title:'Patterns, Internals & Performance',count:80,
    prompt:`Generate exactly 80 JavaScript interview questions and answers about: design patterns (singleton/factory/observer/decorator/module/command/strategy/proxy), SOLID principles in JS, functional programming concepts, immutability, composition vs inheritance, event emitter pattern, pub/sub, dependency injection, V8 internals (hidden classes/inline caching/JIT compilation), garbage collection algorithms, memory leaks detection and prevention, performance optimization techniques, Web Vitals, lazy loading, code splitting, debounce/throttle implementation, virtual DOM concept, reconciliation, TypeScript basics, JSDoc, testing patterns (unit/integration/mocking), bundlers (Webpack/Vite/Rollup concepts), npm/package.json, semantic versioning, monorepos.` },
];

const TOTAL = CATEGORIES.reduce((s,c)=>s+c.count,0);

// ── STATE ────────────────────────────────────────────────────────────────────
let activeCat = 'fundamentals';
let activeLevel = 'all';
let searchQ = '';
let cache = {};          // catId -> [{n,q,a,level}]
let fetchState = {};     // catId -> 'idle'|'loading'|'done'|'error'
let bookmarks = new Set();
let viewed = new Set();
let opened = new Set();

// ── STORAGE HELPERS ──────────────────────────────────────────────────────────
async function loadFromStorage(catId) {
  try {
    const r = await window.storage.get('qs-' + catId);
    if (r && r.value) { cache[catId] = JSON.parse(r.value); fetchState[catId] = 'done'; return true; }
  } catch(e) {}
  return false;
}
async function saveToStorage(catId, data) {
  try { await window.storage.set('qs-' + catId, JSON.stringify(data)); } catch(e) {}
}
async function loadMeta() {
  try {
    const r = await window.storage.get('meta');
    if (r && r.value) { const m=JSON.parse(r.value); bookmarks=new Set(m.bookmarks||[]); viewed=new Set(m.viewed||[]); }
  } catch(e){}
}
async function saveMeta() {
  try { await window.storage.set('meta', JSON.stringify({bookmarks:[...bookmarks],viewed:[...viewed]})); } catch(e){}
}

// ── AI FETCH ─────────────────────────────────────────────────────────────────
async function fetchCategory(catId) {
  const cat = CATEGORIES.find(c=>c.id===catId);
  if (!cat) return;
  if (fetchState[catId]==='done') return;
  if (fetchState[catId]==='loading') return;

  // Try cache first
  const cached = await loadFromStorage(catId);
  if (cached) { renderContent(); buildNav(); return; }

  fetchState[catId] = 'loading';
  renderContent();

  const systemPrompt = `You are a JavaScript expert generating interview prep content.
Return ONLY valid JSON — no markdown, no backticks, no explanation.
Format: {"questions":[{"n":1,"q":"question text","a":"answer in HTML (use <strong>, <code>, <em>, <br> tags, inline <code> for short snippets, multiline code in <pre><code>)","level":"basic|intermediate|advanced"},...]}`; 

  const userPrompt = `${cat.prompt}
  
Rules:
- Number questions starting from ${CATEGORIES.slice(0,CATEGORIES.indexOf(cat)).reduce((s,c)=>s+c.count,0)+1}
- Mix difficulty: ~30% basic, ~40% intermediate, ~30% advanced
- Each answer should be detailed with code examples where relevant
- Use HTML in answers: <strong> for emphasis, <code> for inline code, <br> for line breaks
- For multiline code blocks use: <pre><code>...code here...</code></pre>
- Return exactly ${cat.count} questions
- Return ONLY the JSON object, nothing else`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        model:'claude-sonnet-4-20250514',
        max_tokens:8000,
        system: systemPrompt,
        messages:[{role:'user',content:userPrompt}]
      })
    });

    if (!res.ok) throw new Error('API ' + res.status);
    const data = await res.json();
    const raw = data.content?.find(b=>b.type==='text')?.text || '';
    
    // Parse JSON — strip any markdown fences
    const clean = raw.replace(/^```json\s*/,'').replace(/^```\s*/,'').replace(/```\s*$/,'').trim();
    const parsed = JSON.parse(clean);
    const questions = parsed.questions || parsed;

    cache[catId] = questions;
    fetchState[catId] = 'done';
    await saveToStorage(catId, questions);
    buildNav();
    renderContent();
  } catch(err) {
    console.error('Fetch error:', err);
    fetchState[catId] = 'error';
    renderContent();
  }
}

// ── RENDER ───────────────────────────────────────────────────────────────────
function renderContent() {
  const cat = CATEGORIES.find(c=>c.id===activeCat);
  if (!cat) return;

  const state = fetchState[activeCat] || 'idle';
  let qs = (cache[activeCat] || []).filter(q => {
    const lvlOk = activeLevel==='all' || q.level===activeLevel;
    const searchOk = !searchQ || q.q.toLowerCase().includes(searchQ) || (q.a||'').toLowerCase().includes(searchQ);
    return lvlOk && searchOk;
  });

  const totalViewed = viewed.size;
  const totalCached = Object.values(cache).reduce((s,arr)=>s+(arr?.length||0),0);

  let html = `<div class="intro">
    <h1>${cat.icon} ${cat.title}</h1>
    <p>${getDescription(cat.id)}</p>
    <div class="stats-row">
      <div class="stat"><span class="n">${cat.count}</span><span class="l">questions</span></div>
      <div class="stat"><span class="n">${totalViewed}</span><span class="l">studied</span></div>
      <div class="stat"><span class="n">${bookmarks.size}</span><span class="l">bookmarked</span></div>
      <div class="stat"><span class="n">${totalCached}</span><span class="l">loaded</span></div>
    </div>
  </div>`;

  if (state === 'loading') {
    html += `<div class="fetch-banner"><div class="spinner"></div>AI is generating ${cat.count} questions for <strong>${cat.title}</strong>… This takes ~15 seconds and is cached forever after.</div>`;
    html += Array(6).fill(0).map(()=>`<div class="skeleton" style="margin-bottom:2px"><div class="skel-line" style="width:${30+Math.random()*50}%;flex:1"></div></div>`).join('');
  } else if (state === 'error') {
    html += `<div class="fetch-banner fetch-error">⚠ Failed to load questions. <button class="retry-btn" onclick="retryFetch('${cat.id}')">Retry</button></div>`;
  } else if (state === 'done' && qs.length === 0) {
    html += `<div class="empty"><div class="icon">🔍</div><p>No questions match your filter.</p></div>`;
  } else if (state === 'done') {
    html += `<div class="q-list">`;
    qs.forEach(q => {
      const isOpen = opened.has(q.n);
      const isBm = bookmarks.has(q.n);
      html += `<div class="q-card${isOpen?' opened':''}" id="qc-${q.n}">
        <div class="q-hdr" onclick="toggleQ(${q.n})">
          <span class="q-num">${String(q.n).padStart(3,'0')}</span>
          <span class="q-title">${esc(q.q)}</span>
          <div class="q-meta">
            <span class="badge ${q.level||'basic'}">${q.level||'basic'}</span>
            <button class="bm-btn${isBm?' on':''}" onclick="toggleBm(event,${q.n})">★</button>
            <span class="chevron">▼</span>
          </div>
        </div>
        <div class="q-body${isOpen?' show':''}" id="qb-${q.n}">
          <div class="ans">${renderAnswer(q.a)}</div>
        </div>
      </div>`;
    });
    html += `</div>`;
  }

  document.getElementById('content').innerHTML = html;
  updateProgress();
}

function renderAnswer(raw) {
  if (!raw) return '';
  let html = raw;
  // Convert pre>code blocks to styled code blocks
  html = html.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, (_, code) => {
    const id = 'cb-'+Math.random().toString(36).substr(2,8);
    return `<div class="code-block"><div class="code-hdr"><span class="code-lang">javascript</span><button class="copy-btn" onclick="cpCode('${id}')">Copy</button></div><pre id="${id}">${code.trim()}</pre></div>`;
  });
  // Inline code
  html = html.replace(/<code>([\s\S]*?)<\/code>/g, (_,c) => `<span class="icode">${c}</span>`);
  return html;
}

function esc(s='') { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function getDescription(id) {
  const d = {
    fundamentals:'Core JavaScript concepts every developer must know — types, scope, closures, storage, and browser APIs.',
    functions:'Deep dive into functions: currying, closures, higher-order patterns, generators, and async callbacks.',
    objects:'Prototypes, classes, Proxy, Reflect, Object internals, and inheritance patterns.',
    arrays:'Array/string methods, Set, Map, WeakMap, WeakSet, iterators, and collection operations.',
    async:'Event loop, Promises, async/await, fetch, WebSockets, and all async patterns in depth.',
    dom:'DOM manipulation, events, observers, browser APIs, security, and rendering performance.',
    es6plus:'Every modern JavaScript feature from ES6 through ES2024 with practical examples.',
    patterns:'Design patterns, V8 internals, performance, TypeScript, testing, and tooling.'
  };
  return d[id] || '';
}

// ── INTERACTIONS ─────────────────────────────────────────────────────────────
function toggleQ(n) {
  if (opened.has(n)) opened.delete(n);
  else { opened.add(n); viewed.add(n); saveMeta(); }
  const card = document.getElementById('qc-'+n);
  const body = document.getElementById('qb-'+n);
  if (card) card.classList.toggle('opened', opened.has(n));
  if (body) body.classList.toggle('show', opened.has(n));
  updateProgress();
}

function toggleBm(e, n) {
  e.stopPropagation();
  if (bookmarks.has(n)) bookmarks.delete(n);
  else bookmarks.add(n);
  saveMeta();
  e.target.classList.toggle('on', bookmarks.has(n));
  document.querySelector('.stat:nth-child(3) .n').textContent = bookmarks.size;
}

function cpCode(id) {
  const el = document.getElementById(id);
  if (!el) return;
  navigator.clipboard.writeText(el.textContent).then(() => {
    const btn = el.closest('.code-block').querySelector('.copy-btn');
    if (btn) { btn.textContent='Copied!'; btn.classList.add('done'); setTimeout(()=>{btn.textContent='Copy';btn.classList.remove('done');},2000); }
  });
}

function retryFetch(catId) {
  fetchState[catId] = 'idle';
  fetchCategory(catId);
}

window.toggleQ = toggleQ;
window.toggleBm = toggleBm;
window.cpCode = cpCode;
window.retryFetch = retryFetch;

// ── PROGRESS ─────────────────────────────────────────────────────────────────
function updateProgress() {
  const pct = Math.round((viewed.size / TOTAL) * 100);
  document.getElementById('prog-fill').style.width = pct+'%';
  document.getElementById('prog-txt').textContent = `${viewed.size} / ${TOTAL}`;
}

// ── NAV ──────────────────────────────────────────────────────────────────────
function buildNav() {
  let html = '<div class="nav-hdr">Topics</div>';
  CATEGORIES.forEach(cat => {
    const cached = fetchState[cat.id]==='done';
    const active = cat.id===activeCat;
    html += `<div class="nav-item${active?' active':''}" onclick="selectCat('${cat.id}')">
      <span>${cat.icon}</span>
      <span style="flex:1;line-height:1.3">${cat.title}<br><span style="font-size:.67rem;opacity:.6">${cat.count} questions</span></span>
      ${cached ? '<span class="nav-cached" title="Cached ✓"></span>' : ''}
    </div>`;
  });
  html += '<div class="nav-hdr" style="margin-top:8px">Quick</div>';
  html += `<div class="nav-item" onclick="showBookmarks()">⭐ Bookmarked<span class="nav-count">${bookmarks.size}</span></div>`;
  html += `<div class="nav-item" onclick="clearCacheConfirm()">🗑 Clear Cache</div>`;
  document.getElementById('nav-body').innerHTML = html;
}

function selectCat(id) {
  activeCat = id;
  const cat = CATEGORIES.find(c=>c.id===id);
  document.getElementById('top-title').textContent = cat.title;
  buildNav();
  fetchCategory(id);
  closeSidebar();
}

window.selectCat = selectCat;

function setLevel(lv, btn) {
  activeLevel = lv;
  document.querySelectorAll('.pill').forEach(p=>p.classList.remove('active'));
  btn.classList.add('active');
  renderContent();
}
window.setLevel = setLevel;

function showBookmarks() {
  const bqs = Object.values(cache).flat().filter(q=>bookmarks.has(q.n));
  const cat = { icon:'⭐', title:'Bookmarked Questions', id:'__bm' };
  document.getElementById('top-title').textContent = 'Bookmarked';
  
  let html = `<div class="intro"><h1>⭐ Bookmarked Questions</h1><p>Your saved questions for quick review.</p>
    <div class="stats-row"><div class="stat"><span class="n">${bqs.length}</span><span class="l">bookmarked</span></div></div></div>`;

  if (!bqs.length) {
    html += `<div class="empty"><div class="icon">⭐</div><p>No bookmarks yet. Click ★ on any question.</p></div>`;
  } else {
    html += '<div class="q-list">';
    bqs.forEach(q => {
      const isOpen = opened.has(q.n);
      html += `<div class="q-card${isOpen?' opened':''}" id="qc-${q.n}">
        <div class="q-hdr" onclick="toggleQ(${q.n})">
          <span class="q-num">${String(q.n).padStart(3,'0')}</span>
          <span class="q-title">${esc(q.q)}</span>
          <div class="q-meta">
            <span class="badge ${q.level||'basic'}">${q.level||'basic'}</span>
            <button class="bm-btn on" onclick="toggleBm(event,${q.n})">★</button>
            <span class="chevron">▼</span>
          </div>
        </div>
        <div class="q-body${isOpen?' show':''}" id="qb-${q.n}">
          <div class="ans">${renderAnswer(q.a)}</div>
        </div>
      </div>`;
    });
    html += '</div>';
  }
  document.getElementById('content').innerHTML = html;
  closeSidebar();
}
window.showBookmarks = showBookmarks;

async function clearCacheConfirm() {
  if (!confirm('Clear all cached questions? They will be re-fetched from AI on next visit.')) return;
  for (const cat of CATEGORIES) {
    try { await window.storage.delete('qs-'+cat.id); } catch(e){}
    delete cache[cat.id];
    delete fetchState[cat.id];
  }
  buildNav();
  fetchCategory(activeCat);
}
window.clearCacheConfirm = clearCacheConfirm;

// ── SEARCH ───────────────────────────────────────────────────────────────────
document.getElementById('search-in').addEventListener('input', e => {
  searchQ = e.target.value.toLowerCase().trim();
  renderContent();
});

// ── SIDEBAR ──────────────────────────────────────────────────────────────────
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('active');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('active');
}
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;

// ── INIT ─────────────────────────────────────────────────────────────────────
async function init() {
  await loadMeta();

  // Pre-check storage for all cats (show green dots in nav)
  for (const cat of CATEGORIES) {
    fetchState[cat.id] = 'idle';
    await loadFromStorage(cat.id);
  }

  buildNav();
  updateProgress();
  fetchCategory(activeCat);
}

init();
</script>
</body>
</html>