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
  },

  /**
   * Create popup DOM structure
   */
  createDOM: function() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'aiAgentOverlay';
    document.body.appendChild(overlay);

    // Create popup modal
    const popup = document.createElement('div');
    popup.id = 'aiAgentPopup';

    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.id = 'aiAgentClose';
    closeBtn.innerHTML = '×';
    closeBtn.setAttribute('aria-label', 'סגור');

    // Create content container
    const content = document.createElement('div');
    content.id = 'aiAgentContent';

    // Add close button to popup
    popup.appendChild(closeBtn);
    popup.appendChild(content);
    overlay.appendChild(popup);

    // Render initial form state
    this.renderFormState();
  },

  /**
   * Render form state
   */
  renderFormState: function() {
    const content = document.getElementById('aiAgentContent');
    if (!content) return;

    content.innerHTML = `
      <div class="aiAgent-icon">🤖</div>
      <h2 class="aiAgent-headline">סוכני AI לניהול פיננסי</h2>
      <p class="aiAgent-subheadline">מדריך להקמת סוכני AI לאוטומציה חשבונאית חכמה</p>
      <button class="aiAgent-button aiAgent-whatsapp-btn" type="button">
        הצטרף לקהילת AI FINANCE TRANSFORMATION
      </button>
      <div id="aiAgentFormContainer">
        <iframe
          id="aiAgentForm"
          src="${aiAgentPopupConfig.googleFormUrl}"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          style="width: 100%; min-height: 600px;"
          title="AI Agent Signup Form">
          Loading...
        </iframe>
      </div>
    `;
  },

  /**
   * Render thank you state
   */
  renderThankYouState: function() {
    const content = document.getElementById('aiAgentContent');
    if (!content) return;

    content.innerHTML = `
      <div id="aiAgentThankYou">
        <div class="aiAgent-icon">✓</div>
        <h2 class="aiAgent-headline">תודה על ההרשמה!</h2>
        <p class="aiAgent-subheadline">המדריך זמין לך עכשיו</p>
        <button class="aiAgent-button aiAgent-guide-btn" type="button">
          פתח את המדריך
        </button>
        <button class="aiAgent-button aiAgent-whatsapp-btn" type="button">
          הצטרף לקהילת AI FINANCE TRANSFORMATION
        </button>
      </div>
    `;
  }
};
