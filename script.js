const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => entry.target.classList.toggle('in', entry.isIntersecting));
}, { threshold: 0.18 });
reveals.forEach((r) => io.observe(r));

const typeLine = document.querySelector('.type-line');
if (typeLine) {
  const text = typeLine.dataset.text;
  let i = 0;
  const typer = setInterval(() => {
    typeLine.textContent = text.slice(0, i++);
    if (i > text.length) clearInterval(typer);
  }, 40);
}

const letterText = "My love, if I could paint what I feel, the sky would blush. You make me believe in soft miracles — in forever that feels warm, safe, and beautifully ours.";
const letter = document.getElementById('love-letter');
let li = 0;
const letterTyper = setInterval(() => {
  if (!letter) return;
  letter.textContent = letterText.slice(0, li++);
  if (li > letterText.length) clearInterval(letterTyper);
}, 28);

const musicToggle = document.getElementById('music-toggle');
const music = document.getElementById('bg-music');
musicToggle?.addEventListener('click', async () => {
  if (music.paused) {
    await music.play();
    musicToggle.textContent = '⏸ Pause Ambience';
    musicToggle.setAttribute('aria-pressed', 'true');
  } else {
    music.pause();
    musicToggle.textContent = '🎶 Play Our Ambience';
    musicToggle.setAttribute('aria-pressed', 'false');
  }
});

const floatingHearts = document.querySelector('.floating-hearts');
for (let i = 0; i < 18; i++) {
  const heart = document.createElement('span');
  heart.textContent = ['💗', '✨', '💖', '🌸'][Math.floor(Math.random() * 4)];
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.bottom = `${-20 - Math.random() * 90}px`;
  heart.style.animationDelay = `${Math.random() * 8}s`;
  heart.style.fontSize = `${.8 + Math.random() * 1.4}rem`;
  floatingHearts?.appendChild(heart);
}

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function size() { canvas.width = innerWidth; canvas.height = innerHeight; }
window.addEventListener('resize', size); size();
for (let i = 0; i < 80; i++) {
  particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 2.3, vy: .2 + Math.random() * .45 });
}
(function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.y -= p.vy;
    if (p.y < -10) p.y = canvas.height + 8;
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,230,245,.7)';
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(animate);
})();

const trail = document.getElementById('cursor-trail');
document.addEventListener('pointermove', (e) => {
  const dot = document.createElement('span');
  dot.style.left = `${e.clientX}px`;
  dot.style.top = `${e.clientY}px`;
  trail.appendChild(dot);
  setTimeout(() => dot.remove(), 800);
});

const cards = document.querySelectorAll('.flip-card');
cards.forEach((card) => card.addEventListener('click', () => card.classList.toggle('flipped')));

const lightbox = document.getElementById('lightbox');
const lightboxText = document.getElementById('lightbox-text');
document.querySelectorAll('.memory-card').forEach((c) => {
  c.addEventListener('click', () => {
    lightbox.hidden = false;
    lightboxText.textContent = c.dataset.full;
  });
});
document.getElementById('close-lightbox')?.addEventListener('click', () => lightbox.hidden = true);

const unlock = document.getElementById('unlock');
const secret = document.getElementById('secret');
unlock?.addEventListener('click', () => {
  secret.hidden = false;
  burst(unlock.getBoundingClientRect().left + 60, unlock.getBoundingClientRect().top);
});

const quiz = {
  q: 'When I look at you, what do I feel first?',
  options: ['Peace', 'Butterflies', 'Both, always'],
  answer: 'Both, always'
};
document.getElementById('quiz-question').textContent = quiz.q;
const quizOptions = document.getElementById('quiz-options');
quiz.options.forEach((option) => {
  const btn = document.createElement('button');
  btn.textContent = option;
  btn.addEventListener('click', () => {
    document.getElementById('quiz-result').textContent = option === quiz.answer ? 'Exactly. You are my calm and my thrill.' : 'Still cute... but my heart says: both.';
  });
  quizOptions.appendChild(btn);
});

const foreverBtn = document.getElementById('forever-btn');
const foreverNote = document.getElementById('forever-note');
foreverBtn?.addEventListener('click', () => {
  foreverNote.hidden = false;
  fireworks();
});

function burst(x, y) {
  for (let i = 0; i < 24; i++) {
    const b = document.createElement('span');
    b.className = 'floating-emoji';
    b.textContent = ['💖', '✨', '💕'][i % 3];
    b.style.left = `${x + (Math.random() * 80 - 40)}px`;
    b.style.top = `${y + (Math.random() * 40 - 20)}px`;
    b.style.animationDuration = `${2 + Math.random() * 2}s`;
    document.body.appendChild(b);
    setTimeout(() => b.remove(), 3200);
  }
}

function fireworks() {
  for (let j = 0; j < 5; j++) {
    setTimeout(() => burst(Math.random() * innerWidth, Math.random() * innerHeight * .6), j * 260);
  }
}

document.body.addEventListener('dragover', (e) => {
  e.preventDefault();
  document.body.style.filter = 'brightness(1.08)';
});
document.body.addEventListener('dragleave', () => { document.body.style.filter = 'none'; });

const egg = document.createElement('div');
egg.className = 'easter-egg';
egg.textContent = 'psst... press L for a hidden love line';
document.body.appendChild(egg);
document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'l') alert('Hidden note: In every universe, I would still find you.');
});
