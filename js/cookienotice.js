/**
 * Cookie Notice Pro - Lightweight GDPR/CCPA Cookie Consent Solution
 * Version: 1.0.0
 */
(function() {
    'use strict';

    // Cấu hình mặc định
    const defaultConfig = {
        position: 'bottom', // 'bottom', 'top', 'bottom-left', 'bottom-right'
        theme: 'dark',      // 'dark', 'light', 'custom'
        showAfter: 1000,    // thời gian hiển thị sau khi trang tải (ms)
        cookieExpiry: 30,   // thời hạn cookie (ngày)
        buttonMode: 'standard', // 'standard', 'accept-all'
        privacyPolicyUrl: '/privacy-policy',
        translations: {
            vi: {
                title: 'Thông báo về cookie',
                message: 'Trang web này sử dụng cookie để cải thiện trải nghiệm của bạn. Bằng cách tiếp tục duyệt trang, bạn đồng ý với việc sử dụng cookie của chúng tôi.',
                acceptBtn: 'Đồng ý',
                customizeBtn: 'Tùy chỉnh',
                rejectBtn: 'Chỉ cần thiết',
                savePreferencesBtn: 'Lưu thiết lập',
                closeBtn: 'Đóng',
                privacyPolicy: 'Chính sách Bảo mật',
                privacyPolicyLinkText: 'Xem Chính sách Bảo mật của chúng tôi',
                cookieSettings: 'Thiết lập Cookie',
                necessary: {
                    title: 'Cookie Cần thiết',
                    description: 'Cần thiết để trang web hoạt động và không thể tắt.',
                    checked: true,
                    disabled: true
                },
                analytics: {
                    title: 'Cookie Phân tích',
                    description: 'Giúp chúng tôi cải thiện trang web bằng cách thu thập thông tin.',
                    checked: false,
                    disabled: false
                },
                marketing: {
                    title: 'Cookie Marketing',
                    description: 'Được sử dụng để cung cấp quảng cáo phù hợp hơn cho bạn.',
                    checked: false,
                    disabled: false
                },
                preferences: {
                    title: 'Cookie Tùy chỉnh',
                    description: 'Lưu trữ cài đặt và tùy chọn giao diện người dùng.',
                    checked: false,
                    disabled: false
                }
            },
            en: {
                title: 'Cookie Notice',
                message: 'This website uses cookies to enhance your experience. By continuing to browse the site, you agree to our use of cookies.',
                acceptBtn: 'Accept All',
                customizeBtn: 'Customize',
                rejectBtn: 'Necessary Only',
                savePreferencesBtn: 'Save Preferences',
                closeBtn: 'Close',
                privacyPolicy: 'Privacy Policy',
                privacyPolicyLinkText: 'View our Privacy Policy',
                cookieSettings: 'Cookie Settings',
                necessary: {
                    title: 'Necessary Cookies',
                    description: 'Essential for the website to function and cannot be turned off.',
                    checked: true,
                    disabled: true
                },
                analytics: {
                    title: 'Analytics Cookies',
                    description: 'Help us improve our website by collecting information.',
                    checked: false,
                    disabled: false
                },
                marketing: {
                    title: 'Marketing Cookies',
                    description: 'Used to deliver more relevant ads to you.',
                    checked: false,
                    disabled: false
                },
                preferences: {
                    title: 'Preference Cookies',
                    description: 'Store user interface settings and preferences.',
                    checked: false,
                    disabled: false
                }
            }
        },
        onAccept: function(cookieChoices) {
            console.log('Cookies accepted:', cookieChoices);
        },
        onReject: function() {
            console.log('Only necessary cookies accepted');
        },
        onSave: function(cookieChoices) {
            console.log('Cookie preferences saved:', cookieChoices);
        }
    };

    // CSS styles for the notice
    const styleContent = `
        .cookie-notice-pro {
            position: fixed;
            z-index: 999999;
            padding: 20px;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
            transition: transform 0.5s ease-in-out;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
            font-size: 14px;
            line-height: 1.5;
        }
        
        .cookie-notice-pro.position-bottom {
            left: 0;
            right: 0;
            bottom: 0;
            border-top: 1px solid #ccc;
        }
        
        .cookie-notice-pro.position-top {
            left: 0;
            right: 0;
            top: 0;
            border-bottom: 1px solid #ccc;
        }
        
        .cookie-notice-pro.position-bottom-left {
            left: 20px;
            bottom: 20px;
            max-width: 400px;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .cookie-notice-pro.position-bottom-right {
            right: 20px;
            bottom: 20px;
            max-width: 400px;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .cookie-notice-pro.theme-dark {
            background-color: #2c3e50;
            color: #ecf0f1;
        }
        
        .cookie-notice-pro.theme-light {
            background-color: #f8f9fa;
            color: #343a40;
            border-color: #dee2e6;
        }
        
        .cookie-notice-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 15px;
        }
        
        .cookie-notice-content {
            flex: 1;
            min-width: 280px;
        }
        
        .cookie-notice-title {
            font-weight: bold;
            margin-bottom: 10px;
            font-size: 16px;
        }
        
        .cookie-notice-message {
            margin-bottom: 15px;
        }
        
        .cookie-notice-link {
            text-decoration: underline;
            margin-left: 5px;
        }
        
        .cookie-notice-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .cookie-btn {
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            border: 0;
            font-weight: 500;
            font-size: 14px;
            transition: all 0.2s ease;
        }
        
        .cookie-btn-accept {
            background-color: #2ecc71;
            color: white;
        }
        
        .cookie-btn-accept:hover {
            background-color: #27ae60;
        }
        
        .cookie-btn-reject {
            background-color: #e74c3c;
            color: white;
        }
        
        .cookie-btn-reject:hover {
            background-color: #c0392b;
        }
        
        .cookie-btn-customize, .cookie-btn-save {
            background-color: transparent;
            border: 1px solid currentColor;
        }
        
        .theme-dark .cookie-btn-customize, .theme-dark .cookie-btn-save {
            color: #bdc3c7;
        }
        
        .theme-light .cookie-btn-customize, .theme-light .cookie-btn-save {
            color: #495057;
        }
        
        .cookie-btn-customize:hover, .cookie-btn-save:hover {
            opacity: 0.8;
        }
        
        .cookie-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1000000;
            background-color: rgba(0, 0, 0, 0.5);
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
            box-sizing: border-box;
        }
        
        .cookie-modal-content {
            background-color: white;
            border-radius: 8px;
            max-width: 600px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            padding: 25px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            position: relative;
        }
        
        .cookie-modal-header {
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #e9ecef;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .cookie-modal-title {
            font-size: 20px;
            font-weight: bold;
            color: #212529;
        }
        
        .cookie-modal-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #adb5bd;
        }
        
        .cookie-modal-categories {
            margin-bottom: 20px;
        }
        
        .cookie-category {
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #e9ecef;
        }
        
        .cookie-category:last-child {
            border-bottom: none;
        }
        
        .cookie-category-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        
        .cookie-category-title {
            font-weight: bold;
            font-size: 16px;
            color: #212529;
        }
        
        .cookie-category-description {
            color: #6c757d;
            margin-bottom: 10px;
        }
        
        .cookie-category-toggle {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 24px;
        }
        
        .cookie-category-toggle input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        
        .cookie-toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 24px;
        }
        
        .cookie-toggle-slider:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }
        
        input:checked + .cookie-toggle-slider {
            background-color: #2ecc71;
        }
        
        input:disabled + .cookie-toggle-slider {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        input:checked + .cookie-toggle-slider:before {
            transform: translateX(26px);
        }
        
        .cookie-modal-footer {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            padding-top: 15px;
            border-top: 1px solid #e9ecef;
        }
        
        .cookie-modal-buttons {
            display: flex;
            gap: 10px;
        }
        
        @media (max-width: 768px) {
            .cookie-notice-container {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .cookie-notice-buttons {
                width: 100%;
                justify-content: space-between;
            }
            
            .cookie-modal-content {
                padding: 15px;
            }
            
            .cookie-modal-footer {
                flex-direction: column;
                gap: 10px;
            }
            
            .cookie-modal-buttons {
                width: 100%;
                justify-content: space-between;
            }
        }
    `;

    // Main Cookie Notice class
    class CookieNoticePro {
        constructor(config) {
            this.config = Object.assign({}, defaultConfig, config);
            this.lang = this.detectLanguage();
            this.cookieName = 'cookie_notice_pro_preferences';
            this.noticeElement = null;
            this.modalElement = null;
            this.init();
        }

        // Initialize the cookie notice
        init() {
            // Add CSS styles
            this.addStyles();

            // Check if user has already made cookie choices
            const savedPreferences = this.getSavedPreferences();
            if (savedPreferences) {
                return; // User already made choices, no need to show notice
            }

            // Create and show the notice
            setTimeout(() => {
                this.createNotice();
                this.showNotice();
            }, this.config.showAfter);
        }

        // Add CSS styles to head
        addStyles() {
            const styleElement = document.createElement('style');
            styleElement.textContent = styleContent;
            document.head.appendChild(styleElement);
        }

        // Detect user language
        detectLanguage() {
            const browserLang = navigator.language || navigator.userLanguage;
            const lang = browserLang.split('-')[0];
            return this.config.translations[lang] ? lang : 'en';
        }

        // Create cookie notice element
        createNotice() {
            const translations = this.config.translations[this.lang];
            
            // Create main container
            this.noticeElement = document.createElement('div');
            this.noticeElement.className = `cookie-notice-pro position-${this.config.position} theme-${this.config.theme}`;
            
            // Create inner content
            const content = document.createElement('div');
            content.className = 'cookie-notice-container';
            
            const textContent = document.createElement('div');
            textContent.className = 'cookie-notice-content';
            
            const title = document.createElement('div');
            title.className = 'cookie-notice-title';
            title.textContent = translations.title;
            textContent.appendChild(title);
            
            const message = document.createElement('div');
            message.className = 'cookie-notice-message';
            message.textContent = translations.message;
            
            // Add privacy policy link if URL provided
            if (this.config.privacyPolicyUrl) {
                const policyLink = document.createElement('a');
                policyLink.href = this.config.privacyPolicyUrl;
                policyLink.className = 'cookie-notice-link';
                policyLink.textContent = translations.privacyPolicyLinkText;
                policyLink.target = '_blank';
                message.appendChild(policyLink);
            }
            
            textContent.appendChild(message);
            content.appendChild(textContent);
            
            // Create buttons container
            const buttons = document.createElement('div');
            buttons.className = 'cookie-notice-buttons';
            
            // Accept button
            const acceptBtn = document.createElement('button');
            acceptBtn.className = 'cookie-btn cookie-btn-accept';
            acceptBtn.textContent = translations.acceptBtn;
            acceptBtn.addEventListener('click', () => this.acceptAll());
            buttons.appendChild(acceptBtn);
            
            // Reject button (necessary only)
            const rejectBtn = document.createElement('button');
            rejectBtn.className = 'cookie-btn cookie-btn-reject';
            rejectBtn.textContent = translations.rejectBtn;
            rejectBtn.addEventListener('click', () => this.rejectNonEssential());
            buttons.appendChild(rejectBtn);
            
            // Customize button
            const customizeBtn = document.createElement('button');
            customizeBtn.className = 'cookie-btn cookie-btn-customize';
            customizeBtn.textContent = translations.customizeBtn;
            customizeBtn.addEventListener('click', () => this.showCustomizeModal());
            buttons.appendChild(customizeBtn);
            
            content.appendChild(buttons);
            this.noticeElement.appendChild(content);
            
            // Create modal for customization
            this.createModal();
            
            // Append to body
            document.body.appendChild(this.noticeElement);
            document.body.appendChild(this.modalElement);
        }

        // Create modal for customizing cookie preferences
        createModal() {
            const translations = this.config.translations[this.lang];
            
            this.modalElement = document.createElement('div');
            this.modalElement.className = 'cookie-modal';
            
            const modalContent = document.createElement('div');
            modalContent.className = 'cookie-modal-content';
            
            // Modal header
            const header = document.createElement('div');
            header.className = 'cookie-modal-header';
            
            const title = document.createElement('div');
            title.className = 'cookie-modal-title';
            title.textContent = translations.cookieSettings;
            header.appendChild(title);
            
            const closeBtn = document.createElement('button');
            closeBtn.className = 'cookie-modal-close';
            closeBtn.innerHTML = '&times;';
            closeBtn.addEventListener('click', () => this.hideModal());
            header.appendChild(closeBtn);
            
            modalContent.appendChild(header);
            
            // Cookie categories
            const categories = document.createElement('div');
            categories.className = 'cookie-modal-categories';
            
            // Create toggle for each category
            const categoryTypes = ['necessary', 'analytics', 'marketing', 'preferences'];
            categoryTypes.forEach(type => {
                const catInfo = translations[type];
                
                const category = document.createElement('div');
                category.className = 'cookie-category';
                
                const catHeader = document.createElement('div');
                catHeader.className = 'cookie-category-header';
                
                const catTitle = document.createElement('div');
                catTitle.className = 'cookie-category-title';
                catTitle.textContent = catInfo.title;
                catHeader.appendChild(catTitle);
                
                const toggle = document.createElement('label');
                toggle.className = 'cookie-category-toggle';
                
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.name = `cookie-cat-${type}`;
                checkbox.checked = catInfo.checked;
                checkbox.disabled = catInfo.disabled;
                
                const slider = document.createElement('span');
                slider.className = 'cookie-toggle-slider';
                
                toggle.appendChild(checkbox);
                toggle.appendChild(slider);
                catHeader.appendChild(toggle);
                
                category.appendChild(catHeader);
                
                const description = document.createElement('div');
                description.className = 'cookie-category-description';
                description.textContent = catInfo.description;
                category.appendChild(description);
                
                categories.appendChild(category);
            });
            
            modalContent.appendChild(categories);
            
            // Modal footer
            const footer = document.createElement('div');
            footer.className = 'cookie-modal-footer';
            
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'cookie-modal-buttons';
            
            const saveBtn = document.createElement('button');
            saveBtn.className = 'cookie-btn cookie-btn-save';
            saveBtn.textContent = translations.savePreferencesBtn;
            saveBtn.addEventListener('click', () => this.savePreferences());
            buttonContainer.appendChild(saveBtn);
            
            const acceptAllBtn = document.createElement('button');
            acceptAllBtn.className = 'cookie-btn cookie-btn-accept';
            acceptAllBtn.textContent = translations.acceptBtn;
            acceptAllBtn.addEventListener('click', () => this.acceptAll());
            buttonContainer.appendChild(acceptAllBtn);
            
            footer.appendChild(buttonContainer);
            modalContent.appendChild(footer);
            
            this.modalElement.appendChild(modalContent);
        }

        // Show the cookie notice
        showNotice() {
            this.noticeElement.style.display = 'block';
        }

        // Hide the cookie notice
        hideNotice() {
            this.noticeElement.style.display = 'none';
        }

        // Show the customization modal
        showCustomizeModal() {
            this.modalElement.style.display = 'flex';
        }

        // Hide the customization modal
        hideModal() {
            this.modalElement.style.display = 'none';
        }

        // Accept all cookies
        acceptAll() {
            const cookieChoices = {
                necessary: true,
                analytics: true,
                marketing: true,
                preferences: true
            };
            
            this.saveChoices(cookieChoices);
            this.hideNotice();
            this.hideModal();
            
            if (typeof this.config.onAccept === 'function') {
                this.config.onAccept(cookieChoices);
            }
        }

        // Reject non-essential cookies
        rejectNonEssential() {
            const cookieChoices = {
                necessary: true,
                analytics: false,
                marketing: false,
                preferences: false
            };
            
            this.saveChoices(cookieChoices);
            this.hideNotice();
            this.hideModal();
            
            if (typeof this.config.onReject === 'function') {
                this.config.onReject();
            }
        }

        // Save custom preferences
        savePreferences() {
            const cookieChoices = {
                necessary: true // Always true as it's essential
            };
            
            // Get values from checkboxes
            ['analytics', 'marketing', 'preferences'].forEach(type => {
                const checkbox = this.modalElement.querySelector(`input[name="cookie-cat-${type}"]`);
                cookieChoices[type] = checkbox.checked;
            });
            
            this.saveChoices(cookieChoices);
            this.hideNotice();
            this.hideModal();
            
            if (typeof this.config.onSave === 'function') {
                this.config.onSave(cookieChoices);
            }
        }

        // Save choices to cookies/localStorage
        saveChoices(choices) {
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + this.config.cookieExpiry);
            
            // Save to cookie
            document.cookie = `${this.cookieName}=${JSON.stringify(choices)}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
            
            // Also save to localStorage as backup
            try {
                localStorage.setItem(this.cookieName, JSON.stringify(choices));
            } catch (e) {
                console.warn('LocalStorage not available, using cookies only');
            }
        }

        // Get saved preferences
        getSavedPreferences() {
            // Try to get from cookies first
            const cookieMatch = document.cookie.match(new RegExp(`(^| )${this.cookieName}=([^;]+)`));
            if (cookieMatch) {
                try {
                    return JSON.parse(cookieMatch[2]);
                } catch (e) {
                    console.error('Failed to parse cookie preferences', e);
                }
            }
            
            // Try localStorage as fallback
            try {
                const localData = localStorage.getItem(this.cookieName);
                if (localData) {
                    return JSON.parse(localData);
                }
            } catch (e) {
                console.warn('LocalStorage not available');
            }
            
            return null;
        }
    }

    // Expose to global scope
    window.CookieNoticePro = CookieNoticePro;
})();
