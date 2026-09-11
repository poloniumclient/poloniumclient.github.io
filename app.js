const VERSIONS = ['1.21.1','1.21','1.20.1','1.16.5','1.12.2','1.8.9'];
document.getElementById('vlist').innerHTML = VERSIONS.map(v => `<span>${v}</span>`).join('');
document.getElementById('vers-line').textContent = VERSIONS.slice().reverse().join(' → ') + ', lista z backendu, nie hardcode.';
document.getElementById('year').textContent = new Date().getFullYear();
fetch('https://api.github.com/repos/gabeczkag/polonium.github.io/releases/latest')
  .then(r => r.ok ? r.json() : null)
  .then(d => { if (d && d.tag_name) document.getElementById('latest').textContent = d.tag_name; })
  .catch(() => {});
