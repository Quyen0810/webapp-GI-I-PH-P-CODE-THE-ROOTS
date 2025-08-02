// DOM Elements
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const navItems = document.querySelectorAll('.nav-item');
const sideNavDots = document.querySelectorAll('.nav-dot');
const floatingButtons = document.querySelectorAll('.float-btn');
const featureCards = document.querySelectorAll('.feature-card');
const chatCheckbox = document.getElementById('click');
const chatForm = document.querySelector('.chat-box form');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    setupEventListeners();
    setupScrollEffects();
    setupFloatingButtons();
    setupChatMessenger();
    
    // Ensure navigation links work properly
    setTimeout(() => {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href && href !== '#' && !href.startsWith('#')) {
                // Ensure external links are clickable
                item.style.pointerEvents = 'auto';
                item.style.cursor = 'pointer';
            }
        });
    }, 100);
});

// Initialize animations
function initializeAnimations() {
    // Animate feature cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, observerOptions);

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Navigation items
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            
            // If it's a hash link or empty, prevent default and handle internally
            if (!href || href === '#' || href.startsWith('#')) {
                e.preventDefault();
                setActiveNavItem(item);
            }
            // For external links (like gioithieu.html), let them work normally
            // but still update the active state if needed
            else if (href && !href.startsWith('#')) {
                // For external links, just update active state without preventing default
                setActiveNavItem(item);
            }
        });
    });

    // Side navigation dots
    sideNavDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            setActiveDot(index);
            scrollToSection(index);
        });
    });
}

// Setup scroll effects
function setupScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    const subNav = document.querySelector('.sub-nav');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header hide/show on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
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

        // Update side navigation based on scroll position
        updateSideNavigation();
    });
}

// Setup floating buttons
function setupFloatingButtons() {
    floatingButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const buttonClass = button.className;
            
            if (buttonClass.includes('view-360')) {
                handle360View();
            } else if (buttonClass.includes('view-vr')) {
                handleVRView();
            } else if (buttonClass.includes('phone')) {
                handlePhoneCall();
            } else if (buttonClass.includes('zalo')) {
                handleZaloChat();
            }
        });
    });
    
    // Handle messenger label click separately
    const messengerLabel = document.querySelector('label[for="click"]');
    if (messengerLabel) {
        messengerLabel.addEventListener('click', (e) => {
            e.preventDefault();
            handleMessengerChat();
        });
    }
}

// Setup chat messenger functionality
function setupChatMessenger() {
    // Handle chat form submission
    if (chatForm) {
        chatForm.addEventListener('submit', handleChatSubmission);
    }

    // Handle chat toggle with keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && chatCheckbox && chatCheckbox.checked) {
            chatCheckbox.checked = false;
        }
    });

    // Add click outside to close chat
    document.addEventListener('click', (e) => {
        const wrapper = document.querySelector('.wrapper');
        const label = document.querySelector('label[for="click"]');
        
        if (chatCheckbox && chatCheckbox.checked && wrapper && label) {
            if (!wrapper.contains(e.target) && !label.contains(e.target)) {
                chatCheckbox.checked = false;
            }
        }
    });
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
    submitButton.textContent = 'AI đang xử lý...';
    
    // Show user message in chat
    addChatMessage(name, message, 'user');
    
    // Call AI API
    callAIAPI(message, name, email);
}

// Call AI API
async function callAIAPI(message, name, email) {
    const API_KEY = 'AIzaSyBzqLvMvhcLoJpulWLNAmhWiMRcSHDxglA';
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    
    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Bạn là một trợ lý AI chuyên về du lịch và di tích lịch sử Địa Đạo Phú Thọ Hòa. 
                        Hãy trả lời câu hỏi của khách hàng một cách thân thiện và hữu ích.
                        
                        Thông tin khách hàng:
                        - Tên: ${name}
                        - Email: ${email}
                        - Câu hỏi: ${message}
                        
                        Hãy trả lời bằng tiếng Việt và cung cấp thông tin hữu ích về địa đạo Phú Thọ Hòa, 
                        dịch vụ du lịch, hoặc các thông tin liên quan.`
                    }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            const aiResponse = data.candidates[0].content.parts[0].text;
            addChatMessage('AI Assistant', aiResponse, 'ai');
        } else {
            throw new Error('Invalid response format');
        }
        
    } catch (error) {
        console.error('Error calling AI API:', error);
        addChatMessage('AI Assistant', 'Xin lỗi, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau hoặc liên hệ trực tiếp với chúng tôi qua hotline: 0235.3731.309', 'ai');
    } finally {
        // Remove loading state
        const form = document.querySelector('.chat-box form');
        if (form) {
            form.classList.remove('loading');
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.textContent = 'Gửi tin nhắn';
            }
        }
    }
}

// Add chat message to the chat interface
function addChatMessage(sender, message, type) {
    const chatBox = document.querySelector('.chat-box');
    if (!chatBox) return;
    
    // Create message container
    const messageContainer = document.createElement('div');
    messageContainer.className = `chat-message ${type}-message`;
    
    // Create message content
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    // Create sender name
    const senderName = document.createElement('div');
    senderName.className = 'sender-name';
    senderName.textContent = sender;
    
    // Create message text
    const messageText = document.createElement('div');
    messageText.className = 'message-text';
    messageText.textContent = message;
    
    // Assemble message
    messageContent.appendChild(senderName);
    messageContent.appendChild(messageText);
    messageContainer.appendChild(messageContent);
    
    // Insert before the form
    const form = chatBox.querySelector('form');
    if (form) {
        chatBox.insertBefore(messageContainer, form);
    } else {
        chatBox.appendChild(messageContainer);
    }
    
    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Handle Zalo chat
function handleZaloChat() {
    // Open Zalo chat or redirect to Zalo
    const zaloUrl = 'https://zalo.me/02353731309';
    window.open(zaloUrl, '_blank');
    showNotification('Đang mở Zalo...');
}

// Handle messenger chat
function handleMessengerChat() {
    if (chatCheckbox) {
        chatCheckbox.checked = !chatCheckbox.checked;
        
        if (chatCheckbox.checked) {
            showNotification('Chat box đã được mở');
        } else {
            showNotification('Chat box đã được đóng');
        }
    }
}

// Handle search
function handleSearch() {
    const query = searchInput.value.trim();
    if (query) {
        console.log(`Searching for: ${query}`);
        showNotification(`Đang tìm kiếm: "${query}"`);
        // Here you would implement actual search functionality
    }
}

// Set active navigation item
function setActiveNavItem(activeItem) {
    navItems.forEach(item => item.classList.remove('active'));
    activeItem.classList.add('active');
    
    // If it's an external link, we might want to handle it differently
    const href = activeItem.getAttribute('href');
    if (href && href !== '#' && !href.startsWith('#')) {
        // For external links, we can add a small delay to show the active state
        // before the page navigates
        setTimeout(() => {
            // The page will navigate, so we don't need to do anything here
        }, 100);
    }
}

// Set active side navigation dot
function setActiveDot(activeIndex) {
    sideNavDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });
}

// Scroll to section
function scrollToSection(sectionIndex) {
    const sections = ['hero', 'content-section', 'footer'];
    const targetSection = document.querySelector(`.${sections[sectionIndex] || 'hero'}`);
    
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Update side navigation based on scroll
function updateSideNavigation() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Calculate which section is currently in view
    let activeSection = 0;
    
    if (scrollPosition < windowHeight * 0.5) {
        activeSection = 0; // Hero section
    } else if (scrollPosition < documentHeight - windowHeight * 1.5) {
        activeSection = 1; // Content section
    } else {
        activeSection = 2; // Footer section
    }
    
    setActiveDot(activeSection);
}

// Handle 360° view
function handle360View() {
    showNotification('Đang tải chế độ xem 360°...');
    // Here you would implement 360° view functionality
    setTimeout(() => {
        showNotification('Chế độ xem 360° đã sẵn sàng!');
    }, 2000);
}

// Handle VR view
function handleVRView() {
    showNotification('Đang khởi động chế độ thực tế ảo...');
    // Here you would implement VR functionality
    setTimeout(() => {
        showNotification('Chế độ VR đã sẵn sàng!');
    }, 2000);
}

// Handle phone call
function handlePhoneCall() {
    window.location.href = 'tel:0235.3731.309';
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'linear-gradient(135deg, #d4a574 0%, #c19a5b 100%)',
        color: 'white',
        padding: '15px 25px',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        zIndex: '10000',
        fontSize: '14px',
        fontWeight: '500',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add CSS for loaded state
    const style = document.createElement('style');
    style.textContent = `
        body.loaded .hero-content {
            animation: fadeInUp 1s ease-out;
        }
        
        body.loaded .floating-buttons {
            animation: slideInRight 1s ease-out 0.5s both;
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
});

// Handle window resize
window.addEventListener('resize', () => {
    // Recalculate positions and update layout if needed
    updateSideNavigation();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or overlays
        console.log('Escape key pressed');
    }
    
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImg = document.querySelector('.hero-img');
    
    if (heroImg && scrolled < window.innerHeight) {
        heroImg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

console.log('Dia Dao Phu Tho Hoa Heritage Site - Website loaded successfully!');