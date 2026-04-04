/**
 * AI Agent Signup Popup
 * Displays a modal popup on homepage and blog page with embedded Google Form
 * Shows thank you modal after form submission
 */

// Configuration
const aiAgentPopupConfig = {
  storageKey: 'aiAgentPopupSeen',
  expiryDays: 30,
  delayMs: 6000, // 6 seconds
  googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSevs-Ma-mkgaLzGI9fgksmYQZ7vWpWS8OPCVYXHqHizW1SgPQ/viewform?embedded=true',
  gammaGuideUrl: 'https://gamma.app/docs/ChatGPT--zmfbdt0qikv0l5c',
  whatsappUrl: 'https://chat.whatsapp.com/CS6dgqnK45Q9XAMqScNr6R',
  allowedPages: ['/', '/pages/blog.html']
};

// Initialize on document ready
document.addEventListener('DOMContentLoaded', function() {
  aiAgentPopup.init();
});

// Main popup object
const aiAgentPopup = {
  // State
  isVisible: false,
  currentState: 'form', // 'form' or 'thankYou'

  /**
   * Initialize popup
   */
  init: function() {
    // Check if popup is allowed on this page
    if (!this.isAllowedPage()) {
      return;
    }

    // Check if user has already seen popup
    if (this.hasSeenPopup()) {
      return;
    }

    // Wait for delay before showing popup
    setTimeout(() => {
      this.show();
    }, aiAgentPopupConfig.delayMs);
  },

  /**
   * Check if current page is allowed for popup
   */
  isAllowedPage: function() {
    const path = window.location.pathname;
    // Normalize path (remove trailing slashes except for root)
    const normalizedPath = path === '/' ? '/' : path.replace(/\/$/, '');
    return aiAgentPopupConfig.allowedPages.some(allowedPath =>
      normalizedPath === allowedPath || normalizedPath.endsWith(allowedPath)
    );
  },

  /**
   * Check if user has seen popup in last 30 days
   */
  hasSeenPopup: function() {
    const stored = localStorage.getItem(aiAgentPopupConfig.storageKey);
    if (!stored) {
      return false;
    }

    const timestamp = parseInt(stored, 10);
    const expiryMs = aiAgentPopupConfig.expiryDays * 24 * 60 * 60 * 1000;
    const now = Date.now();

    if (now - timestamp > expiryMs) {
      // Flag has expired, allow popup to show again
      localStorage.removeItem(aiAgentPopupConfig.storageKey);
      return false;
    }

    return true;
  },

  /**
   * Mark popup as seen
   */
  markAsSeen: function() {
    localStorage.setItem(aiAgentPopupConfig.storageKey, Date.now().toString());
  },

  /**
   * Show popup
   */
  show: function() {
    if (this.isVisible) {
      return;
    }

    this.createDOM();
    this.attachEventListeners();
    this.isVisible = true;
  },

  /**
   * Hide popup
   */
  hide: function() {
    const overlay = document.getElementById('aiAgentOverlay');
    if (overlay) {
      overlay.remove();
    }
    this.isVisible = false;
  }
};
