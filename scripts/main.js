console.log('SOVEREIGN SYSTEMS // ONLINE');

// Smooth Scroll for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Simple Smoke/Fog Effect using Canvas
const canvas = document.createElement('canvas');
canvas.id = 'smoke-canvas';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-2';
    canvas.style.pointerEvents = 'none';
}

window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 200 + 100;
        this.alpha = Math.random() * 0.05;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -this.size) this.x = width + this.size;
        if (this.x > width + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = height + this.size;
        if (this.y > height + this.size) this.y = -this.size;
    }

    draw() {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, `rgba(100, 100, 100, ${this.alpha})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Init particles
for (let i = 0; i < 20; i++) {
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

// Data Ticker
const ticker = document.createElement('div');
ticker.className = 'data-ticker';
ticker.style.position = 'fixed';
ticker.style.bottom = '10px';
ticker.style.left = '0';
ticker.style.width = '100%';
ticker.style.fontFamily = 'monospace';
ticker.style.fontSize = '10px';
ticker.style.color = 'var(--accent-color)';
ticker.style.whiteSpace = 'nowrap';
ticker.style.opacity = '0.7';
ticker.style.zIndex = '9998'; /* Below scanner, above bg */
ticker.style.pointerEvents = 'none';
ticker.style.overflow = 'hidden';
document.body.appendChild(ticker);

function updateTicker() {
    const pairs = ['BTC', 'ETH', 'SOL', 'XMR', 'VIX', 'NDX'];
    let text = '';
    for (let i = 0; i < 10; i++) {
        const pair = pairs[Math.floor(Math.random() * pairs.length)];
        const val = (Math.random() * 10000).toFixed(2);
        text += `${pair}: ${val} // `;
    }
    ticker.innerText = text + text; // Duplicate for filling
}

setInterval(updateTicker, 500); // Frenetic update
