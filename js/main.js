/* ========================================
   Wyrd Life Drawing — Main JS
   ======================================== */

(function () {
    'use strict';

    // ── Team order shuffle (50/50) ──
    // Randomly swap Sam and Esmee on each page load
    var teamGrid = document.querySelector('.team-grid');
    if (teamGrid && teamGrid.children.length === 2 && Math.random() < 0.5) {
        teamGrid.appendChild(teamGrid.firstElementChild);
    }

    // ── Language Toggle ──
    let currentLang = 'en';
    const langToggle = document.getElementById('langToggle');

    langToggle.addEventListener('click', function () {
        currentLang = currentLang === 'en' ? 'fr' : 'en';
        langToggle.textContent = currentLang === 'en' ? 'FR' : 'EN';
        document.documentElement.lang = currentLang === 'en' ? 'en' : 'fr';

        document.querySelectorAll('[data-en][data-fr]').forEach(function (el) {
            var text = el.getAttribute('data-' + currentLang);
            if (text) {
                // Preserve child elements (like links inside text)
                if (el.children.length > 0 && el.querySelector('a')) {
                    // For elements that contain links, only update the text node
                    var nodes = el.childNodes;
                    for (var i = 0; i < nodes.length; i++) {
                        if (nodes[i].nodeType === Node.TEXT_NODE && nodes[i].textContent.trim()) {
                            nodes[i].textContent = text + ' ';
                            break;
                        }
                    }
                } else {
                    el.textContent = text;
                }
            }
        });
    });

    // ── Mobile Navigation ──
    var navToggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', function () {
        navLinks.classList.toggle('open');
        // Animate hamburger
        var spans = navToggle.querySelectorAll('span');
        if (navLinks.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });

    // Close mobile nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('open');
            var spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        });
    });

    // ── Navbar background on scroll ──
    var nav = document.getElementById('nav');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.9)';
        }
    });

    // ── Smooth scroll for anchor links ──
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ── Scroll animations (fade in on scroll) ──
    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply initial hidden state and observe
    document.querySelectorAll('.section').forEach(function (section) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // ── Active nav link highlighting ──
    var sections = document.querySelectorAll('.section');
    var navAnchors = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function () {
        var current = '';
        sections.forEach(function (section) {
            var sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navAnchors.forEach(function (a) {
            a.style.color = '';
            if (a.getAttribute('href') === '#' + current) {
                a.style.color = '#BFFF00';
            }
        });
    });

})();
