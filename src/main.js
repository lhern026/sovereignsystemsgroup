console.log('SOVEREIGN SYSTEMS // ONLINE');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Loaded');

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.innerText = navLinks.classList.contains('active') ? 'CLOSE' : 'MENU';
        });

        // Close on click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.innerText = 'MENU';
            });
        });
    }

    // SaaS Asset Toggle (Carousel)
    const saasImages = document.querySelectorAll('.saas .asset-preview img');
    if (saasImages.length > 1) {
        let currentIndex = 0;
        setInterval(() => {
            saasImages[currentIndex].classList.add('hidden');
            currentIndex = (currentIndex + 1) % saasImages.length;
            saasImages[currentIndex].classList.remove('hidden');
        }, 3000);
    }

    // Mobile Menu Logic Initialized
});

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
        this.vx = (Math.random() - 0.5) * 0.1; /* Slowed down for luxury */
        this.vy = (Math.random() - 0.5) * 0.1;
        this.size = Math.random() * 150 + 50; /* Smaller */
        this.alpha = Math.random() * 0.02; /* Fainter */
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
        gradient.addColorStop(0, `rgba(150, 150, 150, ${this.alpha})`); /* Slightly warmer grey */
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Init particles
for (let i = 0; i < 15; i++) { /* Fewer particles */
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

/* Ticker Removed for V4 (Quiet Luxury) */
