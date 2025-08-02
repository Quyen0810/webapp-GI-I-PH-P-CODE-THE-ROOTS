// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSearch();
    initializeSubNavigation();
    initializeDocumentDownloads();
    initializeGallery();
    initializeVideos();
    initializeResearchCards();
    initializeFloatingButtons();
    initializeChatBox();
    initializeScrollAnimations();
    initializeResponsiveHandling();
});

// Initialize navigation
function initializeNavigation() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-item, .sub-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            
            // Update active navigation
            updateActiveNavigation(this);
        });
    });

    // Update active navigation based on scroll position
    window.addEventListener('scroll', updateActiveNavigationOnScroll);
}

// Update active navigation
function updateActiveNavigation(activeLink) {
    // Remove active class from all navigation items
    const allNavItems = document.querySelectorAll('.nav-item, .sub-nav a');
    allNavItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to clicked item
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Update active navigation based on scroll position
function updateActiveNavigationOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.sub-nav a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        // Search button click
        searchBtn.addEventListener('click', performSearch);
        
        // Enter key press
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Real-time search (optional)
        searchInput.addEventListener('input', function() {
            if (this.value.length > 2) {
                performRealTimeSearch(this.value);
            }
        });
    }
}

// Perform search
function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.trim();
    
    if (query) {
        showNotification(`Đang tìm kiếm: ${query}`, 'info');
        // Simulate search functionality
        setTimeout(() => {
            showNotification('Kết quả tìm kiếm sẽ được hiển thị', 'success');
        }, 1000);
    }
}

// Perform real-time search
function performRealTimeSearch(query) {
    // Simulate real-time search
    console.log('Searching for:', query);
}

// Initialize sub navigation
function initializeSubNavigation() {
    const subNavLinks = document.querySelectorAll('.sub-nav a');
    
    subNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all sub-nav links
            subNavLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize document downloads
function initializeDocumentDownloads() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.document-card');
            const title = card.querySelector('h3').textContent;
            
            // Simulate download
            showNotification(`Đang tải xuống: ${title}`, 'info');
            
            // Simulate download progress
            setTimeout(() => {
                showNotification(`${title} đã được tải xuống thành công!`, 'success');
            }, 2000);
        });
    });
}

// Initialize gallery
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            
            // Create lightbox effect (simplified)
            showImageModal(title, description);
        });
    });
}

// Show image modal
function showImageModal(title, description) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <p>${description}</p>
            </div>
        </div>
    `;
    
    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        position: relative;
        animation: slideInUp 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(modal);
    
    // Close functionality
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    });
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        }
    });
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        @keyframes slideInUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize videos
function initializeVideos() {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            
            // Simulate video player
            showVideoModal(title, description);
        });
    });
}

// Show video modal
function showVideoModal(title, description) {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <div class="video-placeholder">
                    <i class="fas fa-play-circle"></i>
                    <p>Video Player</p>
                </div>
                <p>${description}</p>
            </div>
        </div>
    `;
    
    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        max-width: 600px;
        width: 90%;
        position: relative;
        animation: slideInUp 0.3s ease;
    `;
    
    const videoPlaceholder = modal.querySelector('.video-placeholder');
    videoPlaceholder.style.cssText = `
        background: #f8f9fa;
        height: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        margin-bottom: 20px;
        color: #666;
    `;
    
    // Add to page
    document.body.appendChild(modal);
    
    // Close functionality
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    });
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        }
    });
}

// Initialize research cards
function initializeResearchCards() {
    const readButtons = document.querySelectorAll('.read-btn');
    
    readButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.research-card');
            const title = card.querySelector('h3').textContent;
            
            // Simulate reading research
            showNotification(`Đang mở báo cáo: ${title}`, 'info');
            
            setTimeout(() => {
                showNotification(`${title} đã được mở thành công!`, 'success');
            }, 1500);
        });
    });
}

// Initialize floating buttons
function initializeFloatingButtons() {
    const floatingButtons = document.querySelectorAll('.float-btn');
    
    floatingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonType = this.classList[1]; // view-360, view-vr, phone, zalo
            
            switch(buttonType) {
                case 'view-360':
                    window.open('map.html', '_blank');
                    break;
                case 'view-vr':
                    showNotification('Chế độ VR sẽ được kích hoạt sớm!', 'info');
                    break;
                case 'phone':
                    makePhoneCall();
                    break;
                case 'zalo':
                    openZaloChat();
                    break;
            }
        });
    });
}

// Make phone call
function makePhoneCall() {
    const phoneNumber = '0235.3731.309';
    if (confirm(`Bạn có muốn gọi đến số ${phoneNumber}?`)) {
        window.location.href = `tel:${phoneNumber}`;
    }
}

// Open Zalo chat
function openZaloChat() {
    const zaloUrl = 'https://zalo.me/0235.3731.309';
    window.open(zaloUrl, '_blank');
}

// Initialize chat box
function initializeChatBox() {
    const chatForm = document.querySelector('.chat-box form');
    const chatInput = document.querySelector('.chat-box input');
    const chatTextarea = document.querySelector('.chat-box textarea');
    
    if (chatForm) {
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = chatInput.value.trim();
            const email = document.querySelector('.chat-box input[type="email"]').value.trim();
            const message = chatTextarea.value.trim();
            
            if (name && email && message) {
                // Simulate sending message
                showNotification('Tin nhắn đã được gửi! Chúng tôi sẽ phản hồi sớm nhất.', 'success');
                
                // Clear form
                chatInput.value = '';
                document.querySelector('.chat-box input[type="email"]').value = '';
                chatTextarea.value = '';
                
                // Close chat box
                document.getElementById('click').checked = false;
            } else {
                showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
            }
        });
    }
}

// Initialize scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.document-card, .gallery-item, .video-card, .research-card, .section-header');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Initialize responsive handling
function initializeResponsiveHandling() {
    // Handle window resize
    window.addEventListener('resize', function() {
        // Add any responsive logic here
    });
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Add any orientation change logic here
        }, 100);
    });
    
    // Handle touch events for mobile
    if ('ontouchstart' in window) {
        // Add touch-specific interactions
    }
}

// Show notification
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
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
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
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
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
`;
document.head.appendChild(style);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC key to close modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.image-modal, .video-modal');
        modals.forEach(modal => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        });
        
        // Close chat box
        document.getElementById('click').checked = false;
    }
    
    // Search shortcut (Ctrl/Cmd + K)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.focus();
        }
    }
});

// Export functions for global access
window.LibraryController = {
    performSearch,
    showNotification,
    makePhoneCall,
    openZaloChat
};
