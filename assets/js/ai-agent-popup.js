(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPopup);
    } else {
        initPopup();
    }

    function initPopup() {
        // Check if popup was already shown
        if (localStorage.getItem('aiAgentPopupShown')) {
            return;
        }

    // Inject CSS
    const css = `
        .ai-agent-popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 10000;
            display: none;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(3px);
            direction: rtl;
        }

        .ai-agent-popup {
            background: white;
            max-width: 600px;
            width: 90%;
            border-radius: 20px;
            padding: 2.5rem;
            text-align: center;
            position: relative;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: popupSlideIn 0.4s ease-out;
        }

        @keyframes popupSlideIn {
            from {
                opacity: 0;
                transform: scale(0.8) translateY(-50px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }

        .ai-agent-popup-close {
            position: absolute;
            top: 15px;
            left: 20px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
            padding: 5px;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .ai-agent-popup-close:hover {
            background: #f0f0f0;
            color: #333;
        }

        .ai-agent-popup-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }

        .ai-agent-popup-title {
            font-size: 1.8rem;
            color: #2C5282;
            margin-bottom: 0.5rem;
            font-weight: bold;
        }

        .ai-agent-popup-subtitle {
            font-size: 1.1rem;
            color: #68D391;
            margin-bottom: 1.5rem;
            font-weight: 500;
        }

        .ai-agent-popup-benefits {
            text-align: right;
            margin: 1.5rem 0;
            background: linear-gradient(135deg, #f7fafc 0%, #e6f7ff 100%);
            padding: 1.5rem;
            border-radius: 12px;
            border: 2px solid #68D391;
        }

        .ai-agent-popup-benefit {
            display: flex;
            align-items: center;
            margin-bottom: 0.8rem;
            font-size: 1rem;
            color: #2d3748;
        }

        .ai-agent-popup-benefit:last-child {
            margin-bottom: 0;
        }

        .ai-agent-popup-benefit .checkmark {
            color: #68D391;
            font-weight: bold;
            margin-left: 8px;
            font-size: 1.2rem;
        }

        .ai-agent-popup-form {
            margin: 1.5rem 0;
        }

        .ai-agent-popup-form iframe {
            width: 100%;
            min-height: 600px;
            border: none;
            border-radius: 12px;
        }

        .ai-agent-popup-whatsapp {
            display: inline-block;
            background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: bold;
            font-size: 1rem;
            margin: 1rem 0.5rem;
            transition: transform 0.3s ease;
            box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
        }

        .ai-agent-popup-whatsapp:hover {
            transform: translateY(-2px);
            color: white;
        }

        .ai-agent-popup-registered {
            display: inline-block;
            background: linear-gradient(135deg, #68D391 0%, #2C5282 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: bold;
            font-size: 1rem;
            margin: 1rem 0.5rem;
            cursor: pointer;
            transition: transform 0.3s ease;
            box-shadow: 0 4px 15px rgba(104, 211, 145, 0.3);
        }

        .ai-agent-popup-registered:hover {
            transform: translateY(-2px);
            color: white;
        }

        .ai-agent-popup-privacy {
            font-size: 0.85rem;
            color: #666;
            margin-top: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
        }

        .ai-agent-thank-you {
            display: none;
            text-align: center;
        }

        .ai-agent-thank-you h3 {
            color: #2C5282;
            margin-bottom: 1rem;
        }

        .ai-agent-thank-you p {
            color: #4a5568;
            margin-bottom: 1.5rem;
        }

        .ai-agent-guide-link {
            display: inline-block;
            background: linear-gradient(135deg, #68D391 0%, #2C5282 100%);
            color: white;
            padding: 15px 30px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: bold;
            font-size: 1.1rem;
            transition: transform 0.3s ease;
            box-shadow: 0 4px 15px rgba(104, 211, 145, 0.3);
        }

        .ai-agent-guide-link:hover {
            transform: translateY(-2px);
            color: white;
        }

        @media (max-width: 768px) {
            .ai-agent-popup {
                padding: 2rem 1.5rem;
                margin: 20px;
            }

            .ai-agent-popup-title {
                font-size: 1.5rem;
            }

            .ai-agent-popup-whatsapp,
            .ai-agent-popup-registered {
                display: block;
                margin: 0.5rem auto;
                width: 100%;
                max-width: 250px;
            }
        }
    `;

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    // Inject HTML
    const popupHTML = `
        <div id="aiAgentPopupOverlay" class="ai-agent-popup-overlay">
            <div class="ai-agent-popup">
                <button class="ai-agent-popup-close" onclick="closeAIAgentPopup()">&times;</button>

                <div class="ai-agent-popup-icon">🤖</div>

                <h2 class="ai-agent-popup-title">קבלו מדריך מלא לבניית סוכני AI</h2>
                <p class="ai-agent-popup-subtitle">הרשמו לקבלת המדריך החינמי + הצטרפו לקהילת WhatsApp AI FINANCE TRANSFORMATION</p>

                <div class="ai-agent-popup-benefits">
                    <div class="ai-agent-popup-benefit">
                        <span class="checkmark">✅</span>
                        <span>מדריך מלא לבניית סוכני AI מעשיים</span>
                    </div>
                    <div class="ai-agent-popup-benefit">
                        <span class="checkmark">✅</span>
                        <span>15 פרומפטים מוכנים לחיסכון בזמן</span>
                    </div>
                    <div class="ai-agent-popup-benefit">
                        <span class="checkmark">✅</span>
                        <span>גישה לקהילת AI FINANCE TRANSFORMATION</span>
                    </div>
                    <div class="ai-agent-popup-benefit">
                        <span class="checkmark">✅</span>
                        <span>עדכונים על טכנולוגיות AI חדשות</span>
                    </div>
                </div>

                <div class="ai-agent-popup-form">
                    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSevs-Ma-mkgaLzGI9fgksmYQZ7vWpWS8OPCVYXHqHizW1SgPQ/viewform?embedded=true" frameborder="0" marginheight="0" marginwidth="0">טוען…</iframe>
                </div>

                <a href="https://chat.whatsapp.com/CS6dgqnK45Q9XAMqScNr6R" target="_blank" class="ai-agent-popup-whatsapp">
                    הצטרפו לקהילת WhatsApp
                </a>

                <button class="ai-agent-popup-registered" onclick="showThankYou()">
                    הרשמתי - תנו לי את המדריך!
                </button>

                <div class="ai-agent-popup-privacy">
                    🔒 <span>לא נשלח ספאם. ביטול מנוי בכל עת.</span>
                </div>

                <div class="ai-agent-thank-you" id="thankYouSection">
                    <h3>תודה על ההרשמה! 🎉</h3>
                    <p>המדריך שלכם מוכן:</p>
                    <a href="https://gamma.app/docs/ChatGPT--zmfbdt0qikv0l5c" target="_blank" class="ai-agent-guide-link">
                        הורידו את המדריך המלא
                    </a>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', popupHTML);

    // Global functions
    window.closeAIAgentPopup = function() {
        document.getElementById('aiAgentPopupOverlay').style.display = 'none';
        document.body.style.overflow = 'auto';
        localStorage.setItem('aiAgentPopupShown', 'true');

        // Track close
        if (typeof gtag !== 'undefined') {
            gtag('event', 'popup_close', {
                event_category: 'ai_agent_popup',
                event_label: 'user_closed'
            });
        }
    };

    window.showThankYou = function() {
        document.querySelector('.ai-agent-popup-form').style.display = 'none';
        document.querySelector('.ai-agent-popup-whatsapp').style.display = 'none';
        document.querySelector('.ai-agent-popup-registered').style.display = 'none';
        document.querySelector('.ai-agent-popup-benefits').style.display = 'none';
        document.getElementById('thankYouSection').style.display = 'block';

        // Track conversion
        if (typeof gtag !== 'undefined') {
            gtag('event', 'popup_conversion', {
                event_category: 'ai_agent_popup',
                event_label: 'guide_access'
            });
        }
    };

    // Show popup function
    function showPopup() {
        if (localStorage.getItem('aiAgentPopupShown')) return;

        document.getElementById('aiAgentPopupOverlay').style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Track view
        if (typeof gtag !== 'undefined') {
            gtag('event', 'popup_view', {
                event_category: 'ai_agent_popup',
                event_label: 'ai_agent_guide_offer'
            });
        }
    }

    // Triggers
    let popupShown = false;
    let exitIntentTriggered = false;

    // Show after 30 seconds
    setTimeout(() => {
        if (!popupShown && !localStorage.getItem('aiAgentPopupShown')) {
            showPopup();
            popupShown = true;
        }
    }, 30000);

    // Exit intent detection
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0 && !exitIntentTriggered && !popupShown && !localStorage.getItem('aiAgentPopupShown')) {
            exitIntentTriggered = true;
            showPopup();
            popupShown = true;
        }
    });

    // Close on overlay click
    document.getElementById('aiAgentPopupOverlay').addEventListener('click', (e) => {
        if (e.target === document.getElementById('aiAgentPopupOverlay')) {
            closeAIAgentPopup();
        }
    });

    } // End of initPopup function

})(); // End of IIFE