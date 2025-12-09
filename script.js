// Initialize Lucide Icons
lucide.createIcons();

// 1. Generate Star Field
const starContainer = document.getElementById('star-field');
const starCount = 50;

for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 2 + 1; // 1px to 3px
    const left = Math.random() * 100; // 0% to 100%
    const top = Math.random() * 100;
    const delay = Math.random() * 5;
    const opacity = Math.random();

    star.style.cssText = `
        position: absolute;
        background-color: #d8b4fe; /* purple-300 */
        border-radius: 50%;
        left: ${left}%;
        top: ${top}%;
        width: ${size}px;
        height: ${size}px;
        opacity: ${opacity};
        animation: twinkle 4s infinite ease-in-out;
        animation-delay: ${delay}s;
    `;
    starContainer.appendChild(star);
}

// 2. Generate Meteor Shower
const meteorContainer = document.getElementById('meteor-shower');
const meteorCount = 10;

for (let i = 0; i < meteorCount; i++) {
    const meteor = document.createElement('div');
    const top = -Math.random() * 30; // Start above container
    const left = Math.random() * 50 + 50; // Right side (50-100%)
    const delay = Math.random() * 5;
    const duration = Math.random() * 1.5 + 1.5;

    meteor.className = 'animate-meteor';
    meteor.style.top = top + '%';
    meteor.style.left = left + '%';
    meteor.style.animationDelay = delay + 's';
    meteor.style.animationDuration = duration + 's';
    
    meteorContainer.appendChild(meteor);
}

// 3. Handle Contact Form Submission
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Create mailto link with form data
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:manojmanoharan0007@gmail.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Optional: Show success message
        alert('Opening your email client...');
    });
}
