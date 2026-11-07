document.getElementById('year').textContent = new Date().getFullYear();

const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Rising embers
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const c = document.getElementById('sparks');
  const ctx = c.getContext('2d');
  let w, h, dots = [];
  const cssVar = (n, f) => getComputedStyle(document.documentElement).getPropertyValue(n).trim() || f;
  const palette = () => [cssVar('--accent2', '#ff9a6c'), cssVar('--gold', '#ffc857'), cssVar('--accent', '#c9375f'), cssVar('--violet', '#a97bd6')];
  const resize = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
  const make = (fromBottom) => ({
    x: Math.random() * w, y: fromBottom ? h + 10 : Math.random() * h,
    r: Math.random() * 1.8 + .6, v: Math.random() * .35 + .12,
    d: Math.random() * Math.PI * 2, a: Math.random() * .5 + .2, c: Math.floor(Math.random() * 4)
  });
  resize(); addEventListener('resize', resize);
  dots = Array.from({ length: 40 }, () => make(false));
  (function tick() {
    ctx.clearRect(0, 0, w, h);
    const pal = palette();
    dots.forEach((p, i) => {
      p.y -= p.v; p.d += .01; p.x += Math.sin(p.d) * .25;
      if (p.y < -10) dots[i] = make(true);
      ctx.fillStyle = pal[p.c];
      ctx.globalAlpha = p.a * Math.min(1, p.y / (h * .4));
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
    });
    requestAnimationFrame(tick);
  })();
})();
