const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function throttle(func, limit = 100) {
    let inThrottle;
    let lastArgs;
    let lastContext;

    return function throttledFunction(...args) {
        lastArgs = args;
        lastContext = this;
        if (!inThrottle) {
            func.apply(lastContext, lastArgs);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
                if (lastArgs) {
                    func.apply(lastContext, lastArgs);
                    lastArgs = null;
                }
            }, limit);
        }
    };
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    const header = document.querySelector('[data-header]');

    links.forEach(link => {
        link.addEventListener('click', event => {
            const href = link.getAttribute('href');
            if (!href || href === '#') {
                return;
            }

            const target = document.querySelector(href);
            if (!target) {
                return;
            }

            event.preventDefault();
            const headerOffset = header ? header.getBoundingClientRect().height - 8 : 0;
            const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
        });
    });
}

function initIntersectionObserver() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    if (!animatedElements.length) {
        return;
    }

    if (prefersReducedMotion) {
        animatedElements.forEach(el => {
            el.classList.add('visible');
        });
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    });

    animatedElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.transitionDelay = `${Math.min(index * 0.08, 0.6)}s`;
        observer.observe(element);
    });
}

function typewriterEffect(element, text, speed = 45, onComplete) {
    let index = 0;

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index += 1;
            setTimeout(type, speed);
        } else if (typeof onComplete === 'function') {
            onComplete();
        }
    }

    type();
}

function initTypewriter() {
    const subtitle = document.querySelector('[data-typewriter-text]');
    if (!subtitle) {
        return;
    }

    const text = subtitle.getAttribute('data-typewriter-text');
    if (!text) {
        return;
    }

    if (prefersReducedMotion) {
        subtitle.textContent = text;
        return;
    }

    const wrapper = document.createElement('span');
    wrapper.className = 'typewriter-wrapper';

    const textSpan = document.createElement('span');
    textSpan.className = 'typewriter-text';

    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.textContent = '▌';

    wrapper.append(textSpan, cursor);
    subtitle.textContent = '';
    subtitle.appendChild(wrapper);
    subtitle.setAttribute('aria-live', 'polite');

    typewriterEffect(textSpan, text, 45, () => {
        subtitle.classList.add('typewriter-complete');
    });
}

function createDynamicLines() {
    const flowingLines = document.querySelector('.flowing-lines');
    if (!flowingLines || prefersReducedMotion) {
        return;
    }

    function spawnLine() {
        const line = document.createElement('div');
        line.style.position = 'absolute';
        line.style.width = '2px';
        line.style.height = '90px';
        line.style.background = 'linear-gradient(to bottom, transparent, #00FFCC, transparent)';
        line.style.left = `${Math.random() * 100}%`;
        line.style.top = '-120px';
        line.style.opacity = '0.7';
        line.style.animation = 'flowDown 5s linear forwards';

        flowingLines.appendChild(line);

        setTimeout(() => {
            if (line.parentNode) {
                line.parentNode.removeChild(line);
            }
        }, 5000);
    }

    spawnLine();
    const intervalId = setInterval(() => {
        if (!document.body.contains(flowingLines)) {
            clearInterval(intervalId);
            return;
        }
        spawnLine();
    }, 2200);
}

function updateHeaderState() {
    const header = document.querySelector('[data-header]');
    if (!header) {
        return;
    }

    const isScrolled = window.scrollY > 16;
    header.classList.toggle('header-scrolled', isScrolled);
}

function updateParallax() {
    const gridLines = document.querySelector('.grid-lines');
    if (!gridLines) {
        return;
    }

    const parallaxOffset = window.pageYOffset * 0.12;
    gridLines.style.setProperty('--grid-parallax', `${parallaxOffset}px`);
}

let scrollTopButton;

function initScrollTopButton() {
    scrollTopButton = document.querySelector('.scroll-to-top');
    if (!scrollTopButton) {
        return;
    }

    scrollTopButton.addEventListener('click', event => {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
    });
}

function updateScrollTopButton() {
    if (!scrollTopButton) {
        return;
    }

    const shouldShow = window.scrollY > 500;
    scrollTopButton.classList.toggle('visible', shouldShow);
}

function initNavigation() {
    const nav = document.querySelector('[data-nav]');
    const toggle = document.querySelector('[data-nav-toggle]');
    if (!nav || !toggle) {
        return;
    }

    nav.setAttribute('data-open', 'false');
    toggle.setAttribute('aria-expanded', 'false');

    const closeNav = () => {
        nav.setAttribute('data-open', 'false');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
    };

    const openNav = () => {
        nav.setAttribute('data-open', 'true');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('nav-open');
    };

    toggle.addEventListener('click', () => {
        const isOpen = nav.getAttribute('data-open') === 'true';
        if (isOpen) {
            closeNav();
        } else {
            openNav();
        }
    });

    nav.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', () => {
            closeNav();
        });
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && nav.getAttribute('data-open') === 'true') {
            closeNav();
        }
    });

    document.addEventListener('click', event => {
        if (nav.getAttribute('data-open') !== 'true') {
            return;
        }

        if (!nav.contains(event.target) && event.target !== toggle && !toggle.contains(event.target)) {
            closeNav();
        }
    });
}

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        if (!question || !answer) {
            return;
        }

        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            question.setAttribute('aria-expanded', String(!isExpanded));
            answer.hidden = isExpanded;
        });
    });
}

function handleScrollEffects() {
    updateHeaderState();
    updateParallax();
    updateScrollTopButton();
}

function onLoad() {
    document.body.classList.add('loaded');
}

document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initIntersectionObserver();
    initTypewriter();
    createDynamicLines();
    initNavigation();
    initFAQ();
    initScrollTopButton();
    handleScrollEffects();
});

window.addEventListener('load', onLoad);
window.addEventListener('scroll', throttle(handleScrollEffects, 100), { passive: true });
