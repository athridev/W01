// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', function() {
    // Elements to animate
    const animatedElements = [
        '.hero-content',
        '.about-content',
        '.feature-card',
        '.cta-content'
    ];
    
    animatedElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    });
    
    // Stagger animation for feature cards
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
});

// Typewriter effect for hero subtitle
function typewriterEffect(element, text, speed = 50, onComplete) {
    element.textContent = '';
    let i = 0;

    function typeChar() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, speed);
        } else if (typeof onComplete === 'function') {
            onComplete();
        }
    }

    typeChar();
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {

        }, 2000);
    }
});

// Dynamic terminal lines
function createDynamicLines() {
    const flowingLines = document.querySelector('.flowing-lines');
    if (!flowingLines) return;
    
    setInterval(() => {
        // Create new flowing line
        const line = document.createElement('div');
        line.style.position = 'absolute';
        line.style.width = '2px';
        line.style.height = '80px';
        line.style.background = 'linear-gradient(to bottom, transparent, #00FFCC, transparent)';
        line.style.left = Math.random() * 100 + '%';
        line.style.top = '-80px';
        line.style.opacity = '0.7';
        line.style.animation = 'flowDown 4s linear forwards';
        
        flowingLines.appendChild(line);
        
        // Remove line after animation
        setTimeout(() => {
            if (line.parentNode) {
                line.parentNode.removeChild(line);
            }
        }, 4000);
    }, 2000);
}

// Initialize dynamic effects
document.addEventListener('DOMContentLoaded', function() {
    createDynamicLines();
});

// Parallax effect for background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const gridLines = document.querySelector('.grid-lines');
    
    if (gridLines) {
        gridLines.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Button hover effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Feature card enhanced hover effects
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(13, 13, 13, 0.95)';
        header.style.borderBottomColor = 'rgba(0, 255, 204, 0.2)';
    } else {
        header.style.background = 'rgba(13, 13, 13, 0.9)';
        header.style.borderBottomColor = 'rgba(0, 255, 204, 0.1)';
    }
});

// Performance optimization: throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Existing scroll handlers here
}, 16)); // ~60fps

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add CSS for loading state
    const style = document.createElement('style');
    style.textContent = `
        body:not(.loaded) {
            overflow: hidden;
        }
        
        body:not(.loaded) .hero-content {
            opacity: 0;
            transform: translateY(30px);
        }
        
        body.loaded .hero-content {
            opacity: 1;
            transform: translateY(0);
            transition: all 1s ease 0.5s;
        }
    `;
    document.head.appendChild(style);
});

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Skip to main content with Tab
    if (e.key === 'Tab' && !e.shiftKey && document.activeElement === document.body) {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.focus();
            e.preventDefault();
        }
    }
});

// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    const style = document.createElement('style');
    style.textContent = `
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}
