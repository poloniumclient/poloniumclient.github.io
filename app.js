const VERSIONS = ['1.21.1','1.21','1.20.1','1.16.5','1.12.2','1.8.9'];
const html = VERSIONS.map(v => `<span>${v}</span>`).join('');
document.getElementById('vlist').innerHTML = html;
document.getElementById('vlist2').innerHTML = html;
document.getElementById('vers-line').textContent = VERSIONS.slice().reverse().join(' → ') + '. wybierasz pod przyciskiem.';
document.getElementById('year').textContent = new Date().getFullYear();
fetch('https://api.github.com/repos/poloniumclient/poloniumclient.github.io/releases/latest')
  .then(r => r.ok ? r.json() : null)
  .then(d => { if (d && d.tag_name) document.getElementById('latest').textContent = d.tag_name; })
  .catch(() => {});
// seg tylko pokazowy jak w launcherze
document.querySelectorAll('.seg button').forEach(b => b.onclick = () => {
  document.querySelectorAll('.seg button').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  document.getElementById('play-sub').textContent = b.textContent.includes('Obviously') ? 'cheats on • 1.21' : 'vanilla • 1.21';
});
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
