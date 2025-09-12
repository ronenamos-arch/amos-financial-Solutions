// Main JavaScript for Ronen Amos Financial Solutions

(function() {
    'use strict';

    // DOM Ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeNavigation();
        initializeFAQ();
        initializeContactForm();
        initializeSmoothScrolling();
        initializeIntersectionObserver();
    });

    // Navigation functionality
    function initializeNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
                navToggle.setAttribute('aria-expanded', !isExpanded);
                navMenu.classList.toggle('active');
            });
        }

        // Active navigation highlighting
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        const sections = document.querySelectorAll('section[id]');
        
        function highlightNavigation() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', highlightNavigation);
    }

    // FAQ functionality
    function initializeFAQ() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    faqItem.classList.add('active');
                }
                
                // Update aria-expanded
                const isExpanded = faqItem.classList.contains('active');
                this.setAttribute('aria-expanded', isExpanded);
            });
        });
    }

    // Contact form functionality
    function initializeContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const name = formData.get('name');
                const email = formData.get('email');
                const phone = formData.get('phone') || '';
                const company = formData.get('company') || '';
                const service = formData.get('service') || '';
                const message = formData.get('message');
                
                // Create WhatsApp message
                const whatsappMessage = createWhatsAppMessage(name, email, phone, company, service, message);
                const whatsappURL = `https://api.whatsapp.com/send?phone=+972501234567&text=${encodeURIComponent(whatsappMessage)}`;
                
                // Open WhatsApp
                window.open(whatsappURL, '_blank');
                
                // Show success message
                showFormSuccess();
                
                // Reset form
                this.reset();
            });
        }
    }

    // Create WhatsApp message
    function createWhatsAppMessage(name, email, phone, company, service, message) {
        let whatsappMessage = `שלום, אני ${name}\n\n`;
        whatsappMessage += `📧 אימייל: ${email}\n`;
        
        if (phone) {
            whatsappMessage += `📞 טלפון: ${phone}\n`;
        }
        
        if (company) {
            whatsappMessage += `🏢 חברה: ${company}\n`;
        }
        
        if (service) {
            whatsappMessage += `🔧 שירות מעוניין: ${service}\n`;
        }
        
        whatsappMessage += `\n💬 הודעה: ${message}\n\n`;
        whatsappMessage += `נשלח מהאתר: https://ronenamos-arch.github.io/amos-financial-Solutions/`;
        
        return whatsappMessage;
    }

    // Show form success message
    function showFormSuccess() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div style="background: #d4edda; color: #155724; padding: 1rem; border-radius: 5px; margin-top: 1rem; border: 1px solid #c3e6cb;">
                <strong>תודה!</strong> ההודעה נשלחה בהצלחה. נחזור אליך בהקדם.
            </div>
        `;
        
        const contactForm = document.getElementById('contactForm');
        contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            if (successMessage.parentNode) {
                successMessage.parentNode.removeChild(successMessage);
            }
        }, 5000);
    }

    // Smooth scrolling for anchor links
    function initializeSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Intersection Observer for animations
    function initializeIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll('.service-card, .benefit-item, .testimonial-card, .stat-item');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Utility function for performance optimization
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Performance monitoring
    if ('performance' in window && 'measure' in window.performance) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
                console.log('Page load time:', loadTime + 'ms');
                
                // Send to analytics if available
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'timing_complete', {
                        name: 'load',
                        value: loadTime
                    });
                }
            }, 0);
        });
    }

    // Add CSS animations for intersection observer
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .benefit-item, .testimonial-card, .stat-item {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease-out;
        }
        
        .service-card.animate-in, 
        .benefit-item.animate-in, 
        .testimonial-card.animate-in, 
        .stat-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .nav-menu.active {
            display: block;
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                padding: 1rem;
            }
            
            .nav-list {
                flex-direction: column;
                gap: 1rem;
            }
            
            .nav-toggle {
                display: block;
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.5rem;
            }
            
            .hamburger {
                display: block;
                width: 25px;
                height: 3px;
                background: #2c5282;
                margin: 3px 0;
                transition: 0.3s;
            }
        }
        
        @media (min-width: 769px) {
            .nav-toggle {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);

})();