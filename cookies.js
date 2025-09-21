// cookies.js - Advanced Cookie Consent System
// GDPR & Israeli Privacy Law Compliant
// Hebrew RTL Support, LocalStorage Management, Conditional GA Loading

document.addEventListener('DOMContentLoaded', function() {
    const banner = document.getElementById('cookie-banner');
    const acceptAllBtn = document.getElementById('accept-all');
    const essentialOnlyBtn = document.getElementById('essential-only');

    if (!banner || !acceptAllBtn || !essentialOnlyBtn) {
        console.error('Cookie banner elements not found. Please ensure HTML snippet is added correctly.');
        return;
    }

    // Get consent from localStorage
    function getConsent() {
        return localStorage.getItem('cookieConsent');
    }

    // Set consent and handle actions
    function setConsent(type) {
        localStorage.setItem('cookieConsent', type);
        console.log('Cookie consent set to:', type);
        hideBanner();
        if (type === 'all') {
            loadGoogleAnalytics();
        }
    }

    // Show banner with animation
    function showBanner() {
        banner.style.display = 'block';
        setTimeout(() => {
            banner.classList.add('show');
        }, 10);
    }

    // Hide banner with animation
    function hideBanner() {
        banner.classList.remove('show');
        setTimeout(() => {
            banner.style.display = 'none';
        }, 300);
    }

    // Dynamically load Google Analytics if consent is 'all'
    function loadGoogleAnalytics() {
        // Check if already loaded
        if (typeof gtag !== 'undefined') {
            console.log('Google Analytics already loaded.');
            return;
        }

        // Create and append gtag.js script
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-4RTCLV7Q4P';
        document.head.appendChild(script);

        // Initialize dataLayer and gtag
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-4RTCLV7Q4P', { 'anonymize_ip': true }); // Anonymize IP for privacy

        console.log('Google Analytics loaded successfully (ID: G-4RTCLV7Q4P)');
    }

    // Event listeners for buttons
    acceptAllBtn.addEventListener('click', function() {
        setConsent('all');
    });

    essentialOnlyBtn.addEventListener('click', function() {
        setConsent('essential');
    });

    // Initialize on page load
    const consent = getConsent();
    if (!consent) {
        console.log('No consent found. Showing banner.');
        showBanner();
    } else if (consent === 'all') {
        console.log('User accepted all cookies. Loading Google Analytics.');
        loadGoogleAnalytics();
    } else {
        console.log('User chose essential cookies only. No analytics loaded.');
    }
});

// Cross-browser compatibility: Polyfill for older browsers if needed
if (!window.localStorage) {
    console.warn('localStorage not supported. Cookie consent will not persist.');
}