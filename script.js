/* --- Live Relationship Timer (Start Date: April 24, 2024) --- */
const startDate = new Date('2024-04-24T00:00:00');

function updateTimer() {
  const now = new Date();
  const diff = now - startDate;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('days').innerText = days;
  document.getElementById('hours').innerText = hours;
  document.getElementById('minutes').innerText = minutes;
  document.getElementById('seconds').innerText = seconds;
}

setInterval(updateTimer, 1000);
updateTimer();

/* --- Canvas Animation (Floating Hearts, Stars & Petals) --- */
const canvas = document.getElementById('fx-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

const items = ['❤️', '💖', '✨', '💕', '🌸', '👑', '🌹'];
const particles = [];

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = -20;
    this.size = Math.random() * 22 + 12;
    this.speedY = Math.random() * 1.6 + 0.7;
    this.speedX = Math.random() * 1.2 - 0.6;
    this.char = items[Math.floor(Math.random() * items.length)];
    this.rotation = Math.random() * 360;
    this.rotSpeed = Math.random() * 2 - 1;
    this.opacity = Math.random() * 0.7 + 0.3;
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotSpeed;

    if (this.y > height + 20) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.globalAlpha = this.opacity;
    ctx.font = `${this.size}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.char, 0, 0);
    ctx.restore();
  }
}

for (let i = 0; i < 40; i++) {
  particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();

/* --- Interactive Fingerprint Scanner --- */
let scanned = false;
function scanLove() {
  if (scanned) return;
  
  const resBox = document.getElementById('scanResult');
  const percent = document.getElementById('percentText');
  const msg = document.getElementById('resultMsg');

  resBox.style.display = 'block';
  msg.innerText = "جاري الكشف عن البصمة وتطابق القلوب...";

  let current = 0;
  const interval = setInterval(() => {
    current += 25;
    percent.innerText = current + "%";

    if (current >= 1000) {
      clearInterval(interval);
      percent.innerText = "1000%";
      msg.innerText = "عشق لا ينتهي! بسبوسة هي عشقك الأبدي والوحيد ❤️✨";
      scanned = true;

      // Confetti Explosion
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ff1744', '#ffd700', '#ff80ab']
      });
    }
  }, 100);
}

/* --- Reveal Secret Card Messages --- */
function revealSecret(card, text) {
  card.classList.add('opened');
  card.innerHTML = `<p style="font-size:1.05rem; font-weight:700; color:#fff; line-height:1.6;">${text}</p>`;

  confetti({
    particleCount: 25,
    spread: 50,
    origin: { y: 0.7 }
  });
}

/* --- Screen Tap Hearts Effect --- */
window.addEventListener('click', (e) => {
  if (e.target.closest('.fingerprint-btn') || e.target.closest('.secret-card')) return;

  const pop = document.createElement('div');
  pop.innerText = ['💖', '❤️', '✨', '👑'][Math.floor(Math.random() * 4)];
  pop.style.position = 'fixed';
  pop.style.left = e.clientX + 'px';
  pop.style.top = e.clientY + 'px';
  pop.style.fontSize = '30px';
  pop.style.pointerEvents = 'none';
  pop.style.zIndex = '999';
  pop.style.transition = 'all 1s ease-out';
  document.body.appendChild(pop);

  setTimeout(() => {
    pop.style.transform = `translate(${(Math.random() - 0.5) * 80}px, -120px) scale(1.5)`;
    pop.style.opacity = '0';
  }, 20);

  setTimeout(() => pop.remove(), 1050);
});
