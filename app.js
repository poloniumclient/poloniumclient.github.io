const MODS = [
  // combat (9)
  { n: 'killaura', c: 'combat', d: 'auto-atak ghost, pvp 1.8 / 1.9' },
  { n: 'reach', c: 'combat', d: 'większy zasięg ataku' },
  { n: 'velocity', c: 'combat', d: 'mniejszy odrzut po hitach' },
  { n: 'antibot', c: 'combat', d: 'filtruje boty na serwerach' },
  { n: 'keepsprint', c: 'combat', d: 'sprint nie spada po hicie' },
  { n: 'autoweapon', c: 'combat', d: 'broń i tool pod celownik' },
  { n: 'autototem', c: 'combat', d: 'totem automatycznie do offhanda' },
  { n: 'autopot', c: 'combat', d: 'auto splash-heal w walce' },
  { n: 'crystal aura', c: 'combat', d: 'automatyczne wybuchanie crystali' },
  // player (1)
  { n: 'autoarmor', c: 'player', d: 'zakłada najlepszą zbroję' },
  // movement (6)
  { n: 'sprint', c: 'movement', d: 'stały sprint' },
  { n: 'speed', c: 'movement', d: 'szybkie poruszanie z autohopem' },
  { n: 'safewalk', c: 'movement', d: 'auto-shift na krawędzi bloku' },
  { n: 'nofall', c: 'movement', d: 'blokuje obrażenia z upadku' },
  { n: 'mlg', c: 'movement', d: 'auto-woda przy upadku z wysokości' },
  { n: 'scaffold', c: 'movement', d: 'auto-stawianie bloków pod nogi' },
  // render (2)
  { n: 'esp', c: 'render', d: 'boxy graczy i mobów przez ściany' },
  { n: 'fullbright', c: 'render', d: 'pełna jasność w ciemności' },
  // hud (5)
  { n: 'fps-hud', c: 'hud', d: 'licznik fps na ekranie' },
  { n: 'cps-hud', c: 'hud', d: 'licznik kliknięć lpm i ppm' },
  { n: 'keystrokes', c: 'hud', d: 'podgląd klawiszy i przycisków myszy' },
  { n: 'armor-hud', c: 'hud', d: 'stan zbroi i wytrzymałość' },
  { n: 'arraylist', c: 'hud', d: 'lista włączonych modułów' },
];
const VERSIONS = ['26.2','26.1.2','26.1.1','26.1','1.21.11','1.21.10','1.21.9','1.21.8','1.21.7','1.21.6','1.21.5','1.21.4','1.21.3','1.21.2','1.21.1','1.21','1.20.6','1.20.5','1.20.4','1.20.3','1.20.2','1.20.1','1.20','1.19.4','1.19.3','1.19.2','1.19.1','1.19','1.18.2','1.18.1','1.18','1.17.1','1.17','1.16.5','1.16.4','1.16.3','1.16.2','1.16.1','1.16','1.15.2','1.15.1','1.15','1.14.4','1.14.3','1.14.2','1.14.1','1.14','1.13.2','1.13.1','1.13','1.12.2','1.12.1','1.12','1.11.2','1.11.1','1.11','1.10.2','1.10.1','1.10','1.9.4','1.9.3','1.9.2','1.9.1','1.9','1.8.9','1.8.8','1.8.7','1.8.6','1.8.5','1.8.4','1.8.3','1.8.2','1.8.1','1.8'];

const html = VERSIONS.map(v => `<span>${v}</span>`).join('');
document.getElementById('vlist').innerHTML = html;
document.getElementById('vlist2').innerHTML = html;
document.getElementById('year').textContent = new Date().getFullYear();

function renderMods(cat) {
  document.getElementById('modgrid').innerHTML = MODS
    .filter(m => cat === 'all' || m.c === cat)
    .map(m => `<div><b>${m.n}</b><small>${m.c}</small><p>${m.d}</p></div>`).join('');
}
renderMods('all');
document.querySelectorAll('.filter button').forEach(b => b.onclick = () => {
  document.querySelectorAll('.filter button').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  renderMods(b.dataset.cat);
});

// seg pokazowy
document.querySelectorAll('.seg button').forEach(b => b.onclick = () => {
  document.querySelectorAll('.seg button').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  document.getElementById('play-sub').textContent = b.textContent.includes('Obviously') ? 'cheats on • 1.21' : 'vanilla • 1.21';
});

// os tabs
document.querySelectorAll('.os').forEach(b => b.onclick = () => {
  document.querySelectorAll('.os').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
});

// faq
document.querySelectorAll('.qa button').forEach(b => b.onclick = () => {
  const qa = b.parentElement;
  const open = qa.classList.toggle('open');
  b.querySelector('i').textContent = open ? '–' : '+';
});

// latest release
fetch('https://api.github.com/repos/poloniumclient/polonium/releases/latest')
  .then(r => r.ok ? r.json() : null)
  .then(d => { if (d && d.tag_name) { document.getElementById('latest').textContent = d.tag_name; const t = document.getElementById('latest-top'); if (t) t.textContent = d.tag_name; } })
  .catch(() => {});

// liczniki
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.querySelectorAll('[data-count]').forEach(el => {
    const end = +el.dataset.count, t0 = performance.now();
    (function tick(t) {
      const p = Math.min(1, (t - t0) / 1200);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString('pl-PL');
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  });
  io.unobserve(e.target);
}), { threshold: 0.3 });
document.querySelectorAll('.stats').forEach(s => io.observe(s));

// reveal
const ro = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

// ---------- LIVE COUNTER (Supabase) ----------
// +1 przy wejściu (upsert wiersza karty), −1 sam wypada z liczby po ~60 s
// (liczymy tylko wiersze odświeżone w ostatniej minucie, heartbeat co 20 s).
// Setup (2 min, SQL Editor w dashboardzie Supabase):
//   create table if not exists presence (id text primary key, seen timestamptz default now());
//   alter table presence enable row level security;
//   create policy "open" on presence for all to anon using (true) with check (true);
// Klucz anon: Project Settings → API → anon public (ten klucz JEST publiczny z natury,
// nigdy nie wklejaj tu service_role ani hasła do bazy).
const SUPABASE = { url: 'https://anecgwskrxgedvkablwz.supabase.co', anon: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuZWNnd3NrcnhnZWR2a2FibHd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkxMjU0ODMsImV4cCI6MjEwNDcwMTQ4M30._EABejpum6WMFergeTnIt1gcYTaI9FHllaGxXwSV3y8' };

const __liveEls = [document.getElementById('live-big')].filter(Boolean);
function paintLive(n) {
  const t = typeof n === 'number' ? n.toLocaleString('pl-PL') : n;
  __liveEls.forEach(el => el.textContent = t);
}

if (SUPABASE && window.supabase) {
  const sb = window.supabase.createClient(SUPABASE.url, SUPABASE.anon);
  let tabId = sessionStorage.getItem('polonium-tab');
  if (!tabId) {
    tabId = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(36).slice(2));
    sessionStorage.setItem('polonium-tab', tabId);
  }
  const fresh = () => new Date(Date.now() - 60000).toISOString();
  const beat = () => sb.from('presence').upsert({ id: tabId, seen: new Date().toISOString() }).then(() => {});
  const count = () => sb.from('presence').select('id', { count: 'exact', head: true }).gt('seen', fresh())
    .then(({ count: n }) => { if (typeof n === 'number') paintLive(n); }).catch(() => {});
  beat(); count();
  setInterval(beat, 20000);   // heartbeat: karta żyje
  setInterval(count, 5000);   // ping bazy co 5 s, bez refreshu strony
  window.addEventListener('pagehide', () => { try { sb.from('presence').delete().eq('id', tabId); } catch {} });
} else {
  paintLive('—'); // brak configu = pauza, zero ściemy
}

// dvd screensaver
(function dvd() {
  const el = document.getElementById('dvd');
  if (!el) return;
  const colors = ['#caff3d', '#7dd3fc', '#ffffff', '#ffb400', '#ff5d5d', '#4ade80'];
  let x = 60, y = 80, vx = 0.6, vy = 0.45, ci = 0;
  const W = 120, H = 34;
  function frame() {
    const bw = window.innerWidth, bh = window.innerHeight;
    x += vx; y += vy;
    let hit = false;
    if (x <= 0) { x = 0; vx = Math.abs(vx); hit = true; }
    if (x + W >= bw) { x = bw - W; vx = -Math.abs(vx); hit = true; }
    if (y <= 0) { y = 0; vy = Math.abs(vy); hit = true; }
    if (y + H >= bh) { y = bh - H; vy = -Math.abs(vy); hit = true; }
    if (hit) { ci = (ci + 1) % colors.length; el.style.color = colors[ci]; }
    el.style.transform = `translate(${x}px,${y}px)`;
    requestAnimationFrame(frame);
  }
  el.style.color = colors[0];
  requestAnimationFrame(frame);
})();
