// Animate the live token number on the landing page
let t = 18;
setInterval(() => {
  const el = document.getElementById('hero-token');
  if (el) { el.style.opacity='0.4'; setTimeout(() => { el.style.opacity='1'; }, 200); }
}, 10000);