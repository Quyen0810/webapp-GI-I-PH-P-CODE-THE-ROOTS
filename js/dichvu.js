document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    setupSouvenirFiltering();
    setupFormHandling();
    setupSmoothScrolling();
    setupChatMessenger();
    setupScrollEffects();
    setupFloatingButtons();
});

// Souvenir Category Filtering
function setupSouvenirFiltering() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const souvenirItems = document.querySelectorAll('.souvenir-item');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            souvenirItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Form Handling
function setupFormHandling() {
    // Booking form
    const bookingForm = document.querySelector('.booking-section form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleBookingSubmission(this);
        });
    }

    // Contact form
    const contactForm = document.querySelector('.contact-section form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactSubmission(this);
        });
    }

    // Souvenir purchase buttons
    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            handleSouvenirPurchase(this);
        });
    });
}

function handleBookingSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate required fields
    if (!data.name || !data.phone || !data.date || !data.people || !data.tourType) {
        showNotification('Vui lòng điền đầy đủ thông tin bắt buộc!', 'error');
        return;
    }

    // Simulate form submission
    showNotification('Đang xử lý đặt vé...', 'info');
    
    setTimeout(() => {
        showNotification('Đặt vé thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.', 'success');
        form.reset();
    }, 2000);
}

function handleContactSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.message) {
        showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
        return;
    }

    // Simulate form submission
    showNotification('Đang gửi tin nhắn...', 'info');
    
    setTimeout(() => {
        showNotification('Tin nhắn đã được gửi thành công! Chúng tôi sẽ phản hồi sớm nhất.', 'success');
        form.reset();
    }, 2000);
}

function handleSouvenirPurchase(button) {
    const item = button.closest('.souvenir-item');
    const productName = item.querySelector('h3').textContent;
    const price = item.querySelector('.price').textContent;
    
    showNotification(`Đã thêm "${productName}" vào giỏ hàng!`, 'success');
    
    // Simulate adding to cart
    setTimeout(() => {
        showNotification('Sản phẩm đã được thêm vào giỏ hàng. Vui lòng liên hệ để hoàn tất đơn hàng.', 'info');
    }, 1000);
}

// Smooth Scrolling for Navigation
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.sub-nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 150; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav item
                document.querySelectorAll('.sub-nav a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

// Chat Messenger Setup
function setupChatMessenger() {
    const chatForm = document.querySelector('.wrapper form');
    if (chatForm) {
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleChatSubmission(this);
        });
    }
}

function handleChatSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
        showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
        return;
    }

    // Add loading state
    form.classList.add('loading');
    
    // Simulate chat submission
    setTimeout(() => {
        showNotification('Tin nhắn đã được gửi! Nhân viên sẽ liên hệ với bạn sớm nhất.', 'success');
        form.reset();
        form.classList.remove('loading');
    }, 2000);
}

// Scroll Effects
function setupScrollEffects() {
    let lastScrollTop = 0;
    const subNav = document.querySelector('.sub-nav');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Sub-navigation hide/show on scroll
        if (subNav) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                subNav.style.transform = 'translateY(-100%)';
                subNav.style.opacity = '0';
            } else {
                subNav.style.transform = 'translateY(0)';
                subNav.style.opacity = '1';
            }
        }
        
        lastScrollTop = scrollTop;
    });
}

// Floating Buttons

// Map Button
function setupMapButton() {
    const mapBtn = document.querySelector('.map-btn');
    if (mapBtn) {
        mapBtn.addEventListener('click', function() {
            // Open Google Maps with the location
            const address = 'Phường Phú Thọ Hòa, Quận Tân Phú, TP.HCM';
            const encodedAddress = encodeURIComponent(address);
            window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
        });
    }
}

// Notification System
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
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
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

// Add CSS animations for notifications
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
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-left: 10px;
        padding: 0;
        line-height: 1;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .notification-message {
        flex: 1;
    }
`;
document.head.appendChild(style);

// Initialize map button
setupMapButton();

// Add loading state styles for forms
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    .booking-form form.loading,
    .contact-form form.loading {
        opacity: 0.7;
        pointer-events: none;
    }
    
    .booking-form form.loading button,
    .contact-form form.loading button {
        background: #ccc;
        cursor: not-allowed;
    }
`;
document.head.appendChild(loadingStyles);
