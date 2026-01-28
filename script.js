// Custom Cursor
const cursor = document.querySelector(".cursor");
const dot = document.querySelector(".cursor-dot");

document.addEventListener("mousemove", (e) => {
    cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
    dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
});

// Interactive Elements Hover Effect
document
    .querySelectorAll("a, .btn, .skill-tag, .project-card, .contact-link")
    .forEach((el) => {
        el.addEventListener("mouseenter", () => {
            cursor.style.transform += " scale(1.5)";
            cursor.style.borderColor = "var(--secondary)";
            dot.style.background = "var(--secondary)";
        });
        el.addEventListener("mouseleave", () => {
            cursor.style.transform = cursor.style.transform.replace(" scale(1.5)", "");
            cursor.style.borderColor = "var(--primary)";
            dot.style.background = "var(--primary)";
        });
    });

// Particles System
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

// Mouse interaction for particles
let mouse = { x: null, y: null };
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Boundary check
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        // Mouse Interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (100 - distance) / 100;
            this.speedX -= forceDirectionX * force * 0.05;
            this.speedY -= forceDirectionY * force * 0.05;
        }
    }
    draw() {
        ctx.fillStyle = `rgba(99,102,241,${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
        p.update();
        p.draw();
    });

    // Connection lines
    particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                ctx.strokeStyle = `rgba(99,102,241,${0.1 * (1 - dist / 100)})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
        });
    });
    requestAnimationFrame(animate);
}
animate();

// Typing Effect
const texts = [
    "Data Scientist",
    "AI Engineer",
    "ML Enthusiast",
    "LLM Specialist",
    "RAG Developer",
];
let textIdx = 0,
    charIdx = 0,
    isDeleting = false;

function type() {
    const current = texts[textIdx];
    const typed = document.getElementById("typed");
    if (isDeleting) {
        typed.textContent = current.substring(0, charIdx - 1);
        charIdx--;
    } else {
        typed.textContent = current.substring(0, charIdx + 1);
        charIdx++;
    }

    if (!isDeleting && charIdx === current.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        textIdx = (textIdx + 1) % texts.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 50 : 100);
    }
}
type();

// Scroll Reveal
function reveal() {
    document.querySelectorAll(".reveal").forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 50) el.classList.add("active");
    });
}
window.addEventListener("scroll", reveal);
reveal();

// Navbar Scroll Effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Smooth Scroll for Anchors
document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(a.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
        });
    });
});

// Project Card Mouse Movement Effect (Special hover glowing gradient)
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Music Player Logic
let player;
const musicBtn = document.getElementById('music-toggle');
const muteBtn = document.getElementById('mute-toggle');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const muteIcon = document.getElementById('mute-icon');
const unmuteIcon = document.getElementById('unmute-icon');
const equalizer = document.getElementById('equalizer');
const statusDot = document.getElementById('music-status');
let isPlaying = false;
let isPlayerReady = false;

// Load YouTube IFrame API
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '1',
        width: '1',
        videoId: 'Tx9zMFodNtA',
        playerVars: {
            'autoplay': 1,
            'start': 45,
            'loop': 1,
            'playlist': 'Tx9zMFodNtA',
            'controls': 0,
            'showinfo': 0,
            'rel': 0,
            'enablejsapi': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });
}

function onPlayerReady(event) {
    isPlayerReady = true;

    // Set volume and try to play unmuted
    // Note: Some browsers might block unmuted autoplay. 
    // If it doesn't play, user must click the play button.
    event.target.setVolume(50);
    event.target.unMute();
    event.target.playVideo();
    updateMuteUI(false);
}

function onPlayerError(event) {
    statusDot.style.backgroundColor = 'orange';
    // Fallback: If strict origin error (150), buttons wont work via API.
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
        updateMusicUI();
    } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
        isPlaying = false;
        updateMusicUI();
    }
}

function updateMusicUI() {
    if (isPlaying) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        equalizer.classList.add('playing');
        statusDot.classList.add('playing'); // Green
        musicBtn.setAttribute('aria-label', 'Pause Music');
    } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        equalizer.classList.remove('playing');
        statusDot.classList.remove('playing'); // Red
        musicBtn.setAttribute('aria-label', 'Play Music');
    }
}

function updateMuteUI(isMuted) {
    if (isMuted) {
        muteIcon.style.display = 'block';
        unmuteIcon.style.display = 'none';
        muteBtn.setAttribute('aria-label', 'Unmute');
    } else {
        muteIcon.style.display = 'none';
        unmuteIcon.style.display = 'block';
        muteBtn.setAttribute('aria-label', 'Mute');
    }
}

// Play/Pause Toggle
if (musicBtn) {
    musicBtn.addEventListener('click', () => {
        // Allow clicking even if ready flag isn't set, to try and force execution
        if (!player) return;

        if (typeof player.getPlayerState === 'function' && player.getPlayerState() === YT.PlayerState.CUED) {
            player.playVideo();
        }

        if (isPlaying) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    });
}

// Mute/Unmute Toggle
if (muteBtn) {
    muteBtn.addEventListener('click', () => {
        if (!player) return;

        if (typeof player.isMuted === 'function' && player.isMuted()) {
            player.unMute();
            player.setVolume(50);
            updateMuteUI(false);
        } else {
            player.mute();
            updateMuteUI(true);
        }
    });
}
