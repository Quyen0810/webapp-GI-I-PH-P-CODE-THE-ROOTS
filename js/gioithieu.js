document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    setupSmoothScrolling();
    setupChatMessenger();
    setupScrollEffects();
    setupFloatingButtons();
});

// Smooth Scrolling for Sub-navigation
function setupSmoothScrolling() {
    const subNavLinks = document.querySelectorAll('.sub-nav a');
    
    subNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const subNavHeight = document.querySelector('.sub-nav').offsetHeight;
                const totalOffset = headerHeight + subNavHeight;
                
                window.scrollTo({
                    top: targetSection.offsetTop - totalOffset,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Setup chat messenger functionality
function setupChatMessenger() {
    const chatForm = document.querySelector('.chat-box form');
    const chatCheckbox = document.getElementById('click');
    
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

// Setup scroll effects
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

// Setup floating buttons
function setupFloatingButtons() {
    const floatingButtons = document.querySelectorAll('.float-btn');
    
    floatingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonType = this.classList[1]; // Get the second class (view-360, view-vr, etc.)
            handleFloatingButtonClick(buttonType);
        });
    });
}

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

// Show notification
function showNotification(message) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add styles
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
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
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

