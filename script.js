// Initialize Lucide Icons
lucide.createIcons();

// 1. Generate Global Twinkling Starfield (Covering entire viewport)
const starContainer = document.getElementById('star-field');
const starCount = 320; // Striking dense white starfield

if (starContainer) {
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2.8 + 0.8; // 0.8px to 3.6px
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 6;
        const duration = Math.random() * 3 + 2.5; // 2.5s - 5.5s
        const opacity = Math.random() * 0.8 + 0.2;
        const isBrightWhite = Math.random() > 0.35;

        star.style.cssText = `
            position: absolute;
            background-color: ${isBrightWhite ? '#ffffff' : '#f3e8ff'};
            border-radius: 50%;
            left: ${left}%;
            top: ${top}%;
            width: ${size}px;
            height: ${size}px;
            opacity: ${opacity};
            box-shadow: ${isBrightWhite ? `0 0 ${size * 2.5}px rgba(255, 255, 255, 0.9)` : `0 0 ${size * 2}px rgba(216, 180, 254, 0.7)`};
            animation: twinkle ${duration}s infinite ease-in-out;
            animation-delay: ${delay}s;
        `;
        starContainer.appendChild(star);
    }
}

// 2. Generate Floating Space Particles (Upward Drifting)
const particleContainer = document.getElementById('particle-field');
const particleCount = 25;

if (particleContainer) {
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 2;
        const left = Math.random() * 100;
        const top = Math.random() * 100 + 10;
        const delay = Math.random() * 10;
        const duration = Math.random() * 10 + 12; // 12s - 22s
        const floatDx = (Math.random() - 0.5) * 80;

        particle.className = 'floating-particle';
        particle.style.cssText = `
            left: ${left}%;
            top: ${top}%;
            width: ${size}px;
            height: ${size}px;
            --float-dx: ${floatDx}px;
            --float-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;
        particleContainer.appendChild(particle);
    }
}

// 3. Dynamic Shooting Stars Generator (Striking frequent white meteors: random interval 1s - 2.5s)
const meteorContainer = document.getElementById('meteor-field');

function spawnShootingStar() {
    if (!meteorContainer) return;

    const star = document.createElement('div');
    star.className = 'shooting-star-elem';
    
    // Random position across upper viewport
    const startTop = Math.random() * 55; // 0% - 55% top
    const startLeft = Math.random() * 70 + 20; // 20% - 90% right
    const duration = Math.random() * 1.1 + 0.9; // 0.9s - 2.0s

    star.style.top = startTop + '%';
    star.style.left = startLeft + '%';
    star.style.setProperty('--star-duration', `${duration}s`);

    meteorContainer.appendChild(star);

    // Clean up DOM after animation finishes
    setTimeout(() => {
        star.remove();
    }, duration * 1000 + 200);

    // Schedule next shooting star (random 1s - 2.5s)
    const nextInterval = Math.random() * 1500 + 1000;
    setTimeout(spawnShootingStar, nextInterval);
}

// Start shooting star spawner
setTimeout(spawnShootingStar, 1500);

// 4. Parallax Depth Scrolling Effect (60 FPS GPU-accelerated transforms)
const nebulaLayer = document.getElementById('nebula-layer');
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const pageY = window.pageYOffset;
            
            if (nebulaLayer) {
                nebulaLayer.style.transform = `translate3d(0, ${pageY * 0.08}px, 0)`;
            }
            if (starContainer) {
                starContainer.style.transform = `translate3d(0, ${pageY * 0.15}px, 0)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// 3. Contact Form AJAX submission (Works seamlessly on local file:// preview & live sites)
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        const name = this.querySelector('input[name="name"]').value;
        const email = this.querySelector('input[name="email"]').value;
        const subject = this.querySelector('input[name="subject"]').value;
        const message = this.querySelector('textarea[name="message"]').value;

        try {
            const response = await fetch('https://formsubmit.co/ajax/manojmanoharan0007@gmail.com', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    _subject: subject || 'Portfolio Contact Message',
                    message: message
                })
            });

            const data = await response.json();

            if (response.ok || data.success === 'true' || data.message) {
                alert('Thank you! Your message has been sent successfully to manojmanoharan0007@gmail.com.');
                this.reset();
            } else {
                triggerMailtoFallback(name, email, message);
            }
        } catch (err) {
            triggerMailtoFallback(name, email, message);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

function triggerMailtoFallback(name, email, message) {
    const encSubject = encodeURIComponent(`Portfolio Message from ${name}`);
    const encBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:manojmanoharan0007@gmail.com?subject=${encSubject}&body=${encBody}`;
}

// 4. Lightbox Modal Functions
function openLightbox(imgSrc, caption) {
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const captionElem = document.getElementById('lightbox-caption');

    if (modal && img && captionElem) {
        img.src = imgSrc;
        captionElem.textContent = caption || '';
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
        modal.classList.add('opacity-0');
        setTimeout(() => {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    }
}
