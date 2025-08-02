// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initSearchFunctionality();
    initContactForm();
    initFloatingButtons();
    initChatBox();
    initFAQ();
    initGoogleMaps();
    initAnimations();
    
    // Navigation functionality
    function initNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        const subNavLinks = document.querySelectorAll('.sub-nav a');
        
        // Active navigation highlighting
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Sub navigation highlighting
        subNavLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                subNavLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        // Sticky navigation
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });
    }
    
    // Smooth scrolling functionality
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Search functionality
    function initSearchFunctionality() {
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        
        if (searchInput && searchBtn) {
            searchBtn.addEventListener('click', function() {
                performSearch(searchInput.value);
            });
            
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch(this.value);
                }
            });
        }
    }
    
    function performSearch(query) {
        if (query.trim() === '') return;
        
        // Simulate search functionality
        console.log('Searching for:', query);
        
        // You can implement actual search logic here
        // For now, we'll show a notification
        showNotification(`Đang tìm kiếm: "${query}"`, 'info');
    }
    
    // Contact form functionality
    function initContactForm() {
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (validateForm(this)) {
                    submitContactForm(this);
                }
            });
            
            // Real-time validation
            const formInputs = contactForm.querySelectorAll('input, select, textarea');
            formInputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateField(this);
                });
                
                input.addEventListener('input', function() {
                    clearFieldError(this);
                });
            });
        }
    }
    
    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        // Validate email format
        const emailField = form.querySelector('input[type="email"]');
        if (emailField && emailField.value) {
            if (!isValidEmail(emailField.value)) {
                showFieldError(emailField, 'Email không hợp lệ');
                isValid = false;
            }
        }
        
        // Validate phone number
        const phoneField = form.querySelector('input[type="tel"]');
        if (phoneField && phoneField.value) {
            if (!isValidPhone(phoneField.value)) {
                showFieldError(phoneField, 'Số điện thoại không hợp lệ');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    function validateField(field) {
        const value = field.value.trim();
        
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'Trường này là bắt buộc');
            return false;
        }
        
        clearFieldError(field);
        return true;
    }
    
    function showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.add('error');
        
        // Remove existing error message
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        formGroup.appendChild(errorElement);
    }
    
    function clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error');
        
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^[0-9+\-\s()]{10,}$/;
        return phoneRegex.test(phone);
    }
    
    function submitContactForm(form) {
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Đang gửi...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = 'Đã gửi thành công!';
            submitBtn.style.background = '#27ae60';
            
            showNotification('Tin nhắn đã được gửi thành công! Chúng tôi sẽ liên hệ lại sớm nhất.', 'success');
            
            // Reset form
            form.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                submitBtn.classList.remove('loading');
            }, 3000);
        }, 2000);
    }
    
    // Floating buttons functionality
    function initFloatingButtons() {
        const floatButtons = document.querySelectorAll('.float-btn');
        
        floatButtons.forEach(button => {
            button.addEventListener('click', function() {
                const buttonType = this.className.split(' ')[1];
                handleFloatingButton(buttonType);
            });
        });
    }
    
    function handleFloatingButton(type) {
        switch(type) {
            case 'view-360':
                showNotification('Mở chế độ xem 360°', 'info');
                // Implement 360° view functionality
                break;
            case 'view-vr':
                showNotification('Mở chế độ thực tế ảo', 'info');
                // Implement VR functionality
                break;
            case 'phone':
                window.location.href = 'tel:02353731309';
                break;
            case 'zalo':
                window.open('https://zalo.me/02353731309', '_blank');
                break;
        }
    }
    
    // Chat box functionality
    function initChatBox() {
        const chatForm = document.querySelector('.chat-box form');
        
        if (chatForm) {
            chatForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const name = this.querySelector('input[type="text"]').value;
                const email = this.querySelector('input[type="email"]').value;
                const message = this.querySelector('textarea').value;
                
                if (name && email && message) {
                    submitChatForm(name, email, message);
                    this.reset();
                } else {
                    showNotification('Vui lòng điền đầy đủ thông tin', 'error');
                }
            });
        }
    }
    
    function submitChatForm(name, email, message) {
        // Simulate form submission
        const submitBtn = document.querySelector('.chat-box form button');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Đang gửi...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'Đã gửi!';
            showNotification('Tin nhắn đã được gửi thành công!', 'success');
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }, 1500);
    }
    
    // FAQ functionality
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faq => faq.classList.remove('active'));
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }
    
    // Google Maps functionality
    function initGoogleMaps() {
        // Initialize Google Maps when the page loads
        if (typeof google !== 'undefined' && google.maps) {
            initializeMap();
        } else {
            // Load Google Maps API if not already loaded
            loadGoogleMapsAPI();
        }
    }
    
    function loadGoogleMapsAPI() {
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initializeMap';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }
    
    // This function will be called by Google Maps API
    window.initializeMap = function() {
        // Coordinates for Phu Tho Hoa Tunnel (example coordinates)
        const tunnelLocation = { lat: 10.7891, lng: 106.6291 };
        
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: tunnelLocation,
            styles: [
                {
                    featureType: 'poi',
                    elementType: 'labels',
                    stylers: [{ visibility: 'off' }]
                }
            ]
        });
        
        // Add marker for the tunnel
        const marker = new google.maps.Marker({
            position: tunnelLocation,
            map: map,
            title: 'Địa Đạo Phú Thọ Hòa',
            icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                scaledSize: new google.maps.Size(32, 32)
            }
        });
        
        // Add info window
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="padding: 10px;">
                    <h3 style="margin: 0 0 10px 0; color: #d4a574;">Địa Đạo Phú Thọ Hòa</h3>
                    <p style="margin: 0; font-size: 14px;">Phường Phú Thọ Hòa, Quận Tân Phú, TP.HCM</p>
                    <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">Hotline: 0235.3731.309</p>
                </div>
            `
        });
        
        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
        
        // Add directions service
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);
        
        // Add direction buttons
        addDirectionButtons(map, directionsService, directionsRenderer);
    };
    
    function addDirectionButtons(map, directionsService, directionsRenderer) {
        const directionButtons = document.querySelectorAll('.direction-btn');
        
        directionButtons.forEach(button => {
            button.addEventListener('click', function() {
                const directionItem = this.closest('.direction-item');
                const mode = directionItem.getAttribute('data-mode');
                if (mode) {
                    calculateAndDisplayRoute(directionsService, directionsRenderer, mode);
                }
            });
        });
    }
    
    function calculateAndDisplayRoute(directionsService, directionsRenderer, mode) {
        // Get user's current location or default to city center
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const origin = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    const destination = { lat: 10.7891, lng: 106.6291 };
                    
                    const request = {
                        origin: origin,
                        destination: destination,
                        travelMode: google.maps.TravelMode[mode.toUpperCase()]
                    };
                    
                    directionsService.route(request, (result, status) => {
                        if (status === 'OK') {
                            directionsRenderer.setDirections(result);
                            showNotification(`Đã hiển thị đường đi bằng ${mode}`, 'success');
                        } else {
                            showNotification('Không thể tính toán đường đi', 'error');
                        }
                    });
                },
                () => {
                    showNotification('Không thể lấy vị trí hiện tại', 'error');
                }
            );
        }
    }
    
    // Animation functionality
    function initAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.contact-card, .map-frame, .form-container, .faq-item');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 10000;
            max-width: 300px;
            animation: slideInRight 0.3s ease-out;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add responsive functionality
    function handleResize() {
        const isMobile = window.innerWidth <= 768;
        
        // Adjust floating buttons position on mobile
        const floatingButtons = document.querySelector('.floating-buttons');
        if (floatingButtons) {
            if (isMobile) {
                floatingButtons.style.right = '15px';
                floatingButtons.style.bottom = '15px';
            } else {
                floatingButtons.style.right = '30px';
                floatingButtons.style.bottom = '90px';
            }
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    
    // Add loading states
    function addLoadingStates() {
        const buttons = document.querySelectorAll('button');
        
        buttons.forEach(button => {
            if (button.classList.contains('submit-btn') || 
                button.classList.contains('float-btn') ||
                button.textContent.includes('Gửi')) {
                
                button.addEventListener('click', function() {
                    if (!this.disabled) {
                        this.style.pointerEvents = 'none';
                        setTimeout(() => {
                            this.style.pointerEvents = 'auto';
                        }, 2000);
                    }
                });
            }
        });
    }
    
    addLoadingStates();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape to close chat box
        if (e.key === 'Escape') {
            const chatCheckbox = document.getElementById('click');
            if (chatCheckbox && chatCheckbox.checked) {
                chatCheckbox.checked = false;
            }
        }
    });
    
    // Add form auto-save functionality
    function initFormAutoSave() {
        const form = document.querySelector('.contact-form');
        if (form) {
            const formData = new FormData(form);
            const formKey = 'contact_form_data';
            
            // Load saved data
            const savedData = localStorage.getItem(formKey);
            if (savedData) {
                const data = JSON.parse(savedData);
                Object.keys(data).forEach(key => {
                    const field = form.querySelector(`[name="${key}"]`);
                    if (field) {
                        field.value = data[key];
                    }
                });
            }
            
            // Save data on input
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('input', function() {
                    const formData = new FormData(form);
                    const data = {};
                    for (let [key, value] of formData.entries()) {
                        data[key] = value;
                    }
                    localStorage.setItem(formKey, JSON.stringify(data));
                });
            });
            
            // Clear saved data on successful submission
            form.addEventListener('submit', function() {
                setTimeout(() => {
                    localStorage.removeItem(formKey);
                }, 3000);
            });
        }
    }
    
    initFormAutoSave();
    
    console.log('Contact page initialized successfully!');
});
