document.addEventListener('DOMContentLoaded', function() {
    setupSubNavigation();
    setupSmoothScrolling();
    setupFloatingButtons();
    setupChatMessenger();
    setupScrollEffects();
    setupActionButtons();
});

// Setup sub-navigation functionality
function setupSubNavigation() {
    const subNavLinks = document.querySelectorAll('.sub-nav a');
    const sections = document.querySelectorAll('section[id]');
    
    // Add click event listeners to sub-nav links
    subNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const subNavHeight = document.querySelector('.sub-nav').offsetHeight;
                const offset = headerHeight + subNavHeight + 20;
                
                window.scrollTo({
                    top: targetSection.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active sub-nav link on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                subNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Setup smooth scrolling for all internal links
function setupSmoothScrolling() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const subNavHeight = document.querySelector('.sub-nav').offsetHeight;
                const offset = headerHeight + subNavHeight + 20;
                
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Setup floating buttons functionality
function setupFloatingButtons() {
    const floatingButtons = document.querySelectorAll('.float-btn');
    
    floatingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const buttonType = this.classList[1];
            handleFloatingButtonClick(buttonType);
        });
    });
}

// Handle floating button clicks
function handleFloatingButtonClick(buttonType) {
    switch(buttonType) {
        case 'view-360':
            showNotification('Tính năng xem 360° sẽ sớm có mặt!');
            break;
        case 'view-vr':
            showNotification('Tính năng thực tế ảo sẽ sớm có mặt!');
            break;
        case 'phone':
            window.open('tel:0235.3731.309', '_self');
            break;
        case 'zalo':
            showNotification('Liên kết Zalo sẽ sớm có mặt!');
            break;
        default:
            showNotification('Tính năng đang được phát triển!');
    }
}

// Setup chat messenger functionality
function setupChatMessenger() {
    const chatForm = document.querySelector('.chat-box form');
    if (chatForm) {
        chatForm.addEventListener('submit', handleChatSubmission);
    }
}

// Handle chat form submission
function handleChatSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const messageInput = form.querySelector('textarea');
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    
    if (!name || !email || !message) {
        showNotification('Vui lòng điền đầy đủ thông tin!');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Vui lòng nhập email hợp lệ!');
        return;
    }
    
    // Add loading state
    form.classList.add('loading');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Đang gửi...';
    
    // Simulate form submission
    setTimeout(() => {
        showNotification('Tin nhắn đã được gửi! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
        form.reset();
        form.classList.remove('loading');
        submitButton.textContent = originalText;
    }, 2000);
}

// Setup scroll effects
function setupScrollEffects() {
    let lastScrollTop = 0;
    const subNav = document.querySelector('.sub-nav');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
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

// Setup action buttons
function setupActionButtons() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            handleActionButtonClick(buttonText);
        });
    });
    
    const ctaButtons = document.querySelectorAll('.cta-btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            handleCTAButtonClick(buttonText);
        });
    });
}

// Handle action button clicks
function handleActionButtonClick(buttonText) {
    switch(buttonText) {
        case 'Đóng Góp Ngay':
            showNotification('Chuyển hướng đến trang đóng góp...');
            // Add actual donation link here
            break;
        case 'Đăng Ký Tình Nguyện':
            showNotification('Chuyển hướng đến trang đăng ký tình nguyện...');
            // Add actual volunteer registration link here
            break;
        case 'Chia Sẻ Ngay':
            shareContent();
            break;
        case 'Xem Lịch Sự Kiện':
            showNotification('Chuyển hướng đến trang sự kiện...');
            // Add actual events page link here
            break;
        default:
            showNotification('Tính năng đang được phát triển!');
    }
}

// Handle CTA button clicks
function handleCTAButtonClick(buttonText) {
    switch(buttonText) {
        case 'Đóng Góp Ngay':
            showNotification('Chuyển hướng đến trang đóng góp...');
            // Add actual donation link here
            break;
        case 'Tìm Hiểu Thêm':
            showNotification('Chuyển hướng đến trang thông tin chi tiết...');
            // Add actual information page link here
            break;
        default:
            showNotification('Tính năng đang được phát triển!');
    }
}

// Share content functionality
function shareContent() {
    if (navigator.share) {
        navigator.share({
            title: 'Bảo Tồn & Phát Huy - Địa Đạo Phú Thọ Hòa',
            text: 'Hãy chung tay bảo tồn di tích lịch sử cấp Quốc gia',
            url: window.location.href
        }).then(() => {
            showNotification('Cảm ơn bạn đã chia sẻ!');
        }).catch((error) => {
            console.log('Error sharing:', error);
            showNotification('Chia sẻ thất bại, vui lòng thử lại!');
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = window.location.href;
        const text = 'Hãy chung tay bảo tồn di tích lịch sử cấp Quốc gia - Địa Đạo Phú Thọ Hòa';
        
        // Try to copy to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(`${text}\n${url}`).then(() => {
                showNotification('Đã sao chép link vào clipboard!');
            }).catch(() => {
                showNotification('Không thể sao chép, vui lòng thử lại!');
            });
        } else {
            showNotification('Trình duyệt không hỗ trợ chia sẻ tự động!');
        }
    }
}

// Show notification
function showNotification(message) {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #333;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 3000);
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
`;
document.head.appendChild(style);

// Add intersection observer for animations
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

// Observe all cards and timeline items for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.overview-card, .challenge-card, .solution-card, .action-card, .timeline-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const chatCheckbox = document.getElementById('click');
        if (chatCheckbox && chatCheckbox.checked) {
            chatCheckbox.checked = false;
        }
    }
});

// Add click outside to close chat
document.addEventListener('click', function(e) {
    const wrapper = document.querySelector('.wrapper');
    const label = document.querySelector('label[for="click"]');
    const chatCheckbox = document.getElementById('click');
    
    if (chatCheckbox && chatCheckbox.checked && wrapper && label) {
        if (!wrapper.contains(e.target) && !label.contains(e.target)) {
            chatCheckbox.checked = false;
        }
    }
});
