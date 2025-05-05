// Cookie Consent JS for FindMySpot
document.addEventListener('DOMContentLoaded', function() {
    // Check if user already consented
    if (!getCookie('cookieConsent')) {
        createCookieConsentPopup();
    }
    
    // Add event listener for privacy preferences link in footer
    const privacyPrefsLinks = document.querySelectorAll('.privacy-preferences-link');
    privacyPrefsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            createCookieConsentPopup();
        });
    });
});

function createCookieConsentPopup() {
    // Create main container
    const cookiePopup = document.createElement('div');
    cookiePopup.id = 'cookie-consent-popup';
    cookiePopup.className = 'cookie-consent-popup';
    
    // Create container for content
    const popupContainer = document.createElement('div');
    popupContainer.className = 'cookie-consent-container';
    
    // Create header section
    const headerSection = document.createElement('div');
    headerSection.className = 'cookie-header';
    
    const title = document.createElement('h3');
    title.textContent = 'Cookie Preferences';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'cookie-close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.addEventListener('click', function() {
        hideCookiePopup();
    });
    
    headerSection.appendChild(title);
    headerSection.appendChild(closeBtn);
    
    // Create content section
    const contentSection = document.createElement('div');
    contentSection.className = 'cookie-content';
    
    const mainText = document.createElement('p');
    mainText.innerHTML = 'We use cookies to improve your experience on our website. Some cookies are necessary for the site to function properly, while others help us understand how you use our site and to improve our services.';
    
    contentSection.appendChild(mainText);
    
    // Create checkboxes section
    const cookieCategories = document.createElement('div');
    cookieCategories.className = 'cookie-categories';
    
    // Necessary cookies - always enabled
    const necessarySection = createCategorySection(
        'necessary', 
        'Necessary', 
        'These cookies are required for the basic functionality of our website and cannot be turned off.',
        true,
        true
    );
    
    // Analytics cookies - optional
    const analyticsSection = createCategorySection(
        'analytics', 
        'Analytics', 
        'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
        false,
        false
    );
    
    // Marketing cookies - optional
    const marketingSection = createCategorySection(
        'marketing', 
        'Marketing', 
        'These cookies are used to track visitors across websites to enable us to display relevant advertisements.',
        false,
        false
    );
    
    // Functional cookies - optional
    const functionalSection = createCategorySection(
        'functional', 
        'Functional', 
        'These cookies enable enhanced functionality and personalization, such as remembering your preferences.',
        false,
        false
    );
    
    cookieCategories.appendChild(necessarySection);
    cookieCategories.appendChild(analyticsSection);
    cookieCategories.appendChild(functionalSection);
    cookieCategories.appendChild(marketingSection);
    
    contentSection.appendChild(cookieCategories);
    
    // Privacy policy link
    const privacyLink = document.createElement('p');
    privacyLink.className = 'cookie-privacy-link';
    privacyLink.innerHTML = 'For more details, please read our <a href="privacy-policy.html">Privacy Policy</a>.';
    contentSection.appendChild(privacyLink);
    
    // Create buttons section
    const buttonsSection = document.createElement('div');
    buttonsSection.className = 'cookie-buttons';
    
    // Reject button
    const rejectBtn = document.createElement('button');
    rejectBtn.className = 'cookie-reject-btn';
    rejectBtn.textContent = 'Reject All';
    rejectBtn.addEventListener('click', function() {
        saveCookiePreferences('necessary');
        hideCookiePopup();
    });
    
    // Accept selected button
    const acceptSelectedBtn = document.createElement('button');
    acceptSelectedBtn.className = 'cookie-accept-selected-btn';
    acceptSelectedBtn.textContent = 'Accept Selected';
    acceptSelectedBtn.addEventListener('click', function() {
        const selectedCategories = getSelectedCategories();
        saveCookiePreferences(selectedCategories);
        hideCookiePopup();
    });
    
    // Accept all button
    const acceptAllBtn = document.createElement('button');
    acceptAllBtn.className = 'cookie-accept-btn';
    acceptAllBtn.textContent = 'Accept All';
    acceptAllBtn.addEventListener('click', function() {
        saveCookiePreferences('necessary,analytics,functional,marketing');
        hideCookiePopup();
    });
    
    buttonsSection.appendChild(rejectBtn);
    buttonsSection.appendChild(acceptSelectedBtn);
    buttonsSection.appendChild(acceptAllBtn);
    
    // Assemble the popup
    popupContainer.appendChild(headerSection);
    popupContainer.appendChild(contentSection);
    popupContainer.appendChild(buttonsSection);
    cookiePopup.appendChild(popupContainer);
    
    // Add the popup to the document
    document.body.appendChild(cookiePopup);
    
    // Add event listener to prevent clicks from bubbling through the popup
    cookiePopup.addEventListener('click', function(e) {
        if (e.target === cookiePopup) {
            // Don't close when clicking the popup background
            e.stopPropagation();
        }
    });
    
    // Add overlay
    const overlay = document.createElement('div');
    overlay.id = 'cookie-consent-overlay';
    overlay.className = 'cookie-consent-overlay';
    document.body.appendChild(overlay);
    
    // Add CSS
    addCookieConsentStyles();
}

function createCategorySection(id, title, description, isRequired, isChecked) {
    const section = document.createElement('div');
    section.className = 'cookie-category';
    
    const header = document.createElement('div');
    header.className = 'category-header';
    
    const label = document.createElement('label');
    label.htmlFor = `cookie-${id}`;
    label.className = 'category-label';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `cookie-${id}`;
    checkbox.className = 'category-checkbox';
    checkbox.name = id;
    checkbox.checked = isChecked;
    
    if (isRequired) {
        checkbox.disabled = true;
        checkbox.required = true;
    }
    
    const titleSpan = document.createElement('span');
    titleSpan.className = 'category-title';
    titleSpan.textContent = title;
    
    if (isRequired) {
        const requiredBadge = document.createElement('span');
        requiredBadge.className = 'required-badge';
        requiredBadge.textContent = 'Required';
        titleSpan.appendChild(requiredBadge);
    }
    
    label.appendChild(checkbox);
    label.appendChild(titleSpan);
    
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'category-toggle';
    toggleBtn.setAttribute('aria-label', 'Toggle details');
    toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
    toggleBtn.addEventListener('click', function() {
        const detailsEl = section.querySelector('.category-details');
        const isExpanded = detailsEl.classList.contains('expanded');
        
        detailsEl.classList.toggle('expanded');
        toggleBtn.innerHTML = isExpanded ? 
            '<i class="fas fa-chevron-down"></i>' : 
            '<i class="fas fa-chevron-up"></i>';
    });
    
    header.appendChild(label);
    header.appendChild(toggleBtn);
    
    const details = document.createElement('div');
    details.className = 'category-details';
    details.textContent = description;
    
    section.appendChild(header);
    section.appendChild(details);
    
    return section;
}

function getSelectedCategories() {
    const checkboxes = document.querySelectorAll('.category-checkbox:checked');
    const categories = [];
    
    checkboxes.forEach(function(checkbox) {
        categories.push(checkbox.name);
    });
    
    return categories.join(',');
}

function saveCookiePreferences(categories) {
    // Save cookie consent preferences (expiry of 6 months as per Belgian DPA guidelines)
    setCookie('cookieConsent', 'true', 180);
    setCookie('cookieCategories', categories, 180);
    
    // Here you would implement the actual cookie handling based on selections
    // For example, only load Google Analytics if analytics cookies are accepted
    if (categories.includes('analytics')) {
        // Code to load analytics
        console.log('Analytics cookies accepted');
    }
    
    if (categories.includes('marketing')) {
        // Code to load marketing cookies
        console.log('Marketing cookies accepted');
    }
    
    if (categories.includes('functional')) {
        // Code to load functional cookies
        console.log('Functional cookies accepted');
    }
}

function hideCookiePopup() {
    const popup = document.getElementById('cookie-consent-popup');
    const overlay = document.getElementById('cookie-consent-overlay');
    
    if (popup) {
        popup.classList.add('hiding');
        setTimeout(function() {
            document.body.removeChild(popup);
        }, 300);
    }
    
    if (overlay) {
        overlay.classList.add('hiding');
        setTimeout(function() {
            document.body.removeChild(overlay);
        }, 300);
    }
}

function addCookieConsentStyles() {
    if (document.getElementById('cookie-consent-styles')) {
        return;
    }
    
    const styleEl = document.createElement('style');
    styleEl.id = 'cookie-consent-styles';
    styleEl.textContent = `
        .cookie-consent-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 9998;
            animation: fadeIn 0.3s ease;
        }
        
        .cookie-consent-overlay.hiding {
            animation: fadeOut 0.3s ease;
        }
        
        .cookie-consent-popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: 520px;
            width: 90%;
            max-height: 80vh;
            background-color: #0D2243;
            border-radius: 10px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
            z-index: 9999;
            overflow: hidden;
            animation: scaleIn 0.3s ease;
            border: 1px solid rgba(58, 185, 139, 0.3);
        }
        
        .cookie-consent-popup.hiding {
            animation: scaleOut 0.3s ease;
        }
        
        .cookie-consent-container {
            display: flex;
            flex-direction: column;
            height: 100%;
            max-height: 80vh;
        }
        
        .cookie-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            border-bottom: 1px solid rgba(58, 185, 139, 0.2);
            background-color: rgba(13, 34, 67, 0.9);
        }
        
        .cookie-header h3 {
            margin: 0;
            color: #ffffff;
            font-size: 18px;
            font-weight: 600;
        }
        
        .cookie-close-btn {
            background: none;
            border: none;
            color: #a8b2c1;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            line-height: 1;
            transition: color 0.2s ease;
        }
        
        .cookie-close-btn:hover {
            color: #ffffff;
        }
        
        .cookie-content {
            padding: 20px;
            overflow-y: auto;
            flex: 1;
        }
        
        .cookie-content p {
            color: #d4e0f0;
            font-size: 14px;
            line-height: 1.5;
            margin-top: 0;
            margin-bottom: 15px;
        }
        
        .cookie-categories {
            margin-bottom: 20px;
        }
        
        .cookie-category {
            margin-bottom: 15px;
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            overflow: hidden;
        }
        
        .category-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 15px;
            cursor: pointer;
        }
        
        .category-label {
            display: flex;
            align-items: center;
            cursor: pointer;
            flex: 1;
        }
        
        .category-checkbox {
            margin-right: 10px;
            cursor: pointer;
            width: 18px;
            height: 18px;
            accent-color: #3AB98B;
        }
        
        .category-title {
            color: #ffffff;
            font-weight: 500;
            display: flex;
            align-items: center;
        }
        
        .required-badge {
            background-color: rgba(58, 185, 139, 0.2);
            color: #3AB98B;
            font-size: 10px;
            padding: 2px 6px;
            border-radius: 4px;
            margin-left: 8px;
            text-transform: uppercase;
            font-weight: bold;
        }
        
        .category-toggle {
            background: none;
            border: none;
            color: #a8b2c1;
            cursor: pointer;
            padding: 5px;
            transition: color 0.2s ease;
        }
        
        .category-toggle:hover {
            color: #ffffff;
        }
        
        .category-details {
            padding: 0 15px;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease, padding 0.3s ease;
            color: #a8b2c1;
            font-size: 13px;
            line-height: 1.5;
        }
        
        .category-details.expanded {
            padding: 0 15px 15px;
            max-height: 200px;
        }
        
        .cookie-privacy-link {
            font-size: 13px;
            color: #a8b2c1;
            text-align: center;
            margin-top: 10px;
        }
        
        .cookie-privacy-link a {
            color: #3AB98B;
            text-decoration: none;
            transition: color 0.2s ease;
        }
        
        .cookie-privacy-link a:hover {
            color: #ffffff;
            text-decoration: underline;
        }
        
        .cookie-buttons {
            display: flex;
            justify-content: center;
            gap: 10px;
            padding: 15px 20px;
            border-top: 1px solid rgba(58, 185, 139, 0.2);
            background-color: rgba(13, 34, 67, 0.9);
        }
        
        .cookie-reject-btn, .cookie-accept-selected-btn, .cookie-accept-btn {
            padding: 10px 15px;
            border-radius: 5px;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
            white-space: nowrap;
        }
        
        .cookie-reject-btn {
            background-color: transparent;
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .cookie-reject-btn:hover {
            background-color: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.5);
        }
        
        .cookie-accept-selected-btn {
            background-color: rgba(58, 185, 139, 0.15);
            color: #3AB98B;
            border: 1px solid rgba(58, 185, 139, 0.5);
        }
        
        .cookie-accept-selected-btn:hover {
            background-color: rgba(58, 185, 139, 0.25);
        }
        
        .cookie-accept-btn {
            background-color: #3AB98B;
            color: #ffffff;
            border: 1px solid #3AB98B;
        }
        
        .cookie-accept-btn:hover {
            background-color: #2da578;
        }
        
        /* Mobile styles */
        @media (max-width: 768px) {
            .cookie-consent-popup {
                width: 95%;
                max-height: 90vh;
            }
            
            .cookie-buttons {
                flex-direction: column;
                gap: 8px;
            }
            
            .cookie-reject-btn, .cookie-accept-selected-btn, .cookie-accept-btn {
                width: 100%;
                padding: 12px 15px;
            }
        }
        
        /* Animations */
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes scaleIn {
            from { transform: translate(-50%, -50%) scale(0.9); opacity: 0; }
            to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        
        @keyframes scaleOut {
            from { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            to { transform: translate(-50%, -50%) scale(0.9); opacity: 0; }
        }
    `;
    
    document.head.appendChild(styleEl);
}

// Helper functions for cookies
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Initialize privacy preferences link
document.addEventListener('DOMContentLoaded', function() {
    addPrivacyPreferencesLink();
});