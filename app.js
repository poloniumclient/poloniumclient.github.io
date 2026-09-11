const MODS = [
  { n: 'killaura', c: 'combat', d: 'auto-atak, tryb ghost' },
  { n: 'aim assist', c: 'combat', d: 'delikatna pomoc celowania' },
  { n: 'reach', c: 'combat', d: 'większy zasięg' },
  { n: 'velocity', c: 'combat', d: 'mniejszy odrzut' },
  { n: 'autoclicker', c: 'combat', d: 'klikanie z randomizacją' },
  { n: 'antibot', c: 'combat', d: 'filtruje boty' },
  { n: 'sprint', c: 'movement', d: 'stały sprint' },
  { n: 'speed', c: 'movement', d: 'bunnyhop / strafe' },
  { n: 'scaffold', c: 'movement', d: 'auto-stawianie bloków' },
  { n: 'nofall', c: 'movement', d: 'brak fall damage' },
  { n: 'esp', c: 'hud', d: 'boxy przez ściany' },
  { n: 'fps hud', c: 'hud', d: 'licznik fps' },
  { n: 'cps hud', c: 'hud', d: 'licznik kliknięć' },
  { n: 'keystrokes', c: 'hud', d: 'podgląd klawiszy' },
  { n: 'armor hud', c: 'hud', d: 'stan zbroi' },
  { n: 'arraylist', c: 'hud', d: 'lista modułów' }
];
const VERSIONS = ['1.21.1','1.21','1.20.1','1.16.5','1.12.2','1.8.9'];

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

// copy ip
document.getElementById('copy-ip').onclick = async (e) => {
  const ip = 'play.polonium.gg';
  try { await navigator.clipboard.writeText(ip); e.target.textContent = 'skopiowano: ' + ip; }
  catch { e.target.textContent = ip; }
  setTimeout(() => e.target.textContent = 'kopiuj ip serwera', 2000);
};

// latest release
fetch('https://api.github.com/repos/poloniumclient/poloniumclient.github.io/releases/latest')
  .then(r => r.ok ? r.json() : null)
  .then(d => { if (d && d.tag_name) document.getElementById('latest').textContent = d.tag_name; })
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

// fake online drift
let online = 12400;
setInterval(() => {
  online += Math.round(Math.random() * 40 - 18);
  document.getElementById('online').textContent = online.toLocaleString('pl-PL');
}, 3000);

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
