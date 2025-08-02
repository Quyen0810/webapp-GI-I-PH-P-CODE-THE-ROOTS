// News and Events Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initSearchFunctionality();
    initEventRegistration();
    initFloatingButtons();
    initChatBox();
    initNewsFiltering();
    initEventCountdown();
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
    
    // Event registration functionality
    function initEventRegistration() {
        const registerButtons = document.querySelectorAll('.register-btn');
        
        registerButtons.forEach(button => {
            button.addEventListener('click', function() {
                const eventTitle = this.closest('.event-card').querySelector('h3').textContent;
                registerForEvent(eventTitle);
            });
        });
    }
    
    function registerForEvent(eventTitle) {
        // Simulate registration process
        const button = event.target;
        const originalText = button.textContent;
        
        button.textContent = 'Đang đăng ký...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = 'Đã đăng ký!';
            button.style.background = '#27ae60';
            
            showNotification(`Đã đăng ký thành công cho sự kiện: "${eventTitle}"`, 'success');
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
            }, 3000);
        }, 1500);
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
    
    // News filtering functionality
    function initNewsFiltering() {
        const newsCards = document.querySelectorAll('.news-card');
        
        // Add filter buttons dynamically
        const newsSection = document.querySelector('.news-section');
        if (newsSection) {
            const filterContainer = document.createElement('div');
            filterContainer.className = 'news-filter';
            filterContainer.innerHTML = `
                <div class="filter-buttons">
                    <button class="filter-btn active" data-filter="all">Tất cả</button>
                    <button class="filter-btn" data-filter="preservation">Bảo Tồn</button>
                    <button class="filter-btn" data-filter="tourism">Du Lịch</button>
                    <button class="filter-btn" data-filter="education">Giáo Dục</button>
                </div>
            `;
            
            const sectionHeader = newsSection.querySelector('.section-header');
            sectionHeader.appendChild(filterContainer);
            
            // Add filter functionality
            const filterButtons = filterContainer.querySelectorAll('.filter-btn');
            filterButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');
                    filterNews(filter);
                    
                    // Update active button
                    filterButtons.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                });
            });
        }
    }
    
    function filterNews(category) {
        const newsCards = document.querySelectorAll('.news-card');
        
        newsCards.forEach(card => {
            const cardCategory = card.querySelector('.news-category').textContent.toLowerCase();
            
            if (category === 'all' || cardCategory.includes(category.toLowerCase())) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Event countdown functionality
    function initEventCountdown() {
        const eventCards = document.querySelectorAll('.event-card');
        
        eventCards.forEach(card => {
            const eventDate = card.querySelector('.event-date');
            const day = eventDate.querySelector('.day').textContent;
            const month = eventDate.querySelector('.month').textContent;
            
            // Create countdown element
            const countdownElement = document.createElement('div');
            countdownElement.className = 'event-countdown';
            countdownElement.innerHTML = `
                <span class="countdown-label">Còn lại:</span>
                <span class="countdown-time">--</span>
            `;
            
            card.querySelector('.event-content').appendChild(countdownElement);
            
            // Start countdown
            updateCountdown(card, day, month);
        });
    }
    
    function updateCountdown(card, day, month) {
        const countdownElement = card.querySelector('.event-countdown .countdown-time');
        
        // Convert month abbreviation to number
        const monthMap = {
            'Th01': 0, 'Th02': 1, 'Th03': 2, 'Th04': 3, 'Th05': 4, 'Th06': 5,
            'Th07': 6, 'Th08': 7, 'Th09': 8, 'Th10': 9, 'Th11': 10, 'Th12': 11
        };
        
        const currentYear = new Date().getFullYear();
        const eventDate = new Date(currentYear, monthMap[month], parseInt(day));
        
        // If event date has passed, set it to next year
        if (eventDate < new Date()) {
            eventDate.setFullYear(currentYear + 1);
        }
        
        const countdown = setInterval(() => {
            const now = new Date().getTime();
            const distance = eventDate.getTime() - now;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            
            if (distance < 0) {
                countdownElement.textContent = 'Đã diễn ra';
                clearInterval(countdown);
            } else {
                countdownElement.textContent = `${days} ngày ${hours} giờ ${minutes} phút`;
            }
        }, 1000);
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
        const animatedElements = document.querySelectorAll('.news-card, .event-card, .activity-card');
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
        
        .news-filter {
            margin-top: 30px;
        }
        
        .filter-buttons {
            display: flex;
            justify-content: center;
            gap: 15px;
            flex-wrap: wrap;
        }
        
        .filter-btn {
            background: #f8f9fa;
            border: 2px solid #d4a574;
            color: #d4a574;
            padding: 8px 20px;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
        }
        
        .filter-btn:hover,
        .filter-btn.active {
            background: #d4a574;
            color: white;
        }
        
        .event-countdown {
            margin-top: 15px;
            padding: 10px;
            background: #f8f9fa;
            border-radius: 8px;
            text-align: center;
        }
        
        .countdown-label {
            font-size: 12px;
            color: #666;
            display: block;
            margin-bottom: 5px;
        }
        
        .countdown-time {
            font-size: 14px;
            font-weight: 600;
            color: #d4a574;
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
            if (button.classList.contains('register-btn') || 
                button.classList.contains('float-btn') ||
                button.textContent.includes('Đăng ký')) {
                
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
    
    console.log('News and Events page initialized successfully!');
});
