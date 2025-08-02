// Popup Login/Register and Profile System

class PopupManager {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.init();
    }

    init() {
        this.createPopupHTML();
        this.bindEvents();
        this.checkAuthStatus();
    }

    createPopupHTML() {
        // Create popup overlay
        const popupOverlay = document.createElement('div');
        popupOverlay.className = 'popup-overlay';
        popupOverlay.id = 'popupOverlay';
        
        // Create popup container
        const popupContainer = document.createElement('div');
        popupContainer.className = 'popup-container';
        popupContainer.id = 'popupContainer';
        
        popupOverlay.appendChild(popupContainer);
        document.body.appendChild(popupOverlay);
    }

    bindEvents() {
        // Close popup when clicking overlay
        document.getElementById('popupOverlay').addEventListener('click', (e) => {
            if (e.target.id === 'popupOverlay') {
                this.closePopup();
            }
        });

        // Close popup with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closePopup();
            }
        });
    }

    showLoginPopup() {
        const container = document.getElementById('popupContainer');
        container.innerHTML = this.getLoginHTML();
        document.getElementById('popupOverlay').classList.add('active');
        
        // Bind login form events
        this.bindLoginEvents();
    }

    showRegisterPopup() {
        const container = document.getElementById('popupContainer');
        container.innerHTML = this.getRegisterHTML();
        document.getElementById('popupOverlay').classList.add('active');
        
        // Bind register form events
        this.bindRegisterEvents();
    }

    showProfilePopup() {
        const container = document.getElementById('popupContainer');
        container.innerHTML = this.getProfileHTML();
        document.getElementById('popupOverlay').classList.add('active');
        
        // Bind profile events
        this.bindProfileEvents();
    }

    closePopup() {
        document.getElementById('popupOverlay').classList.remove('active');
        setTimeout(() => {
            document.getElementById('popupContainer').innerHTML = '';
        }, 300);
    }

    getLoginHTML() {
        return `
            <div class="popup-header">
                <h2 class="popup-title">Đăng Nhập</h2>
                <button class="popup-close" onclick="popupManager.closePopup()">&times;</button>
            </div>
            <div class="popup-body">
                <form class="popup-form" id="loginForm">
                    <div class="form-group">
                        <label for="loginEmail">Email</label>
                        <input type="email" id="loginEmail" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="loginPassword">Mật khẩu</label>
                        <input type="password" id="loginPassword" name="password" required>
                    </div>
                    <button type="submit" class="popup-btn popup-btn-primary popup-btn-full">
                        Đăng Nhập
                    </button>
                </form>

                <div class="divider">
                    <span>hoặc</span>
                </div>

                <div class="social-login">
                    <button class="social-btn google" onclick="popupManager.socialLogin('google')">
                        <i class="fab fa-google"></i>
                        Đăng nhập với Google
                    </button>
                    <button class="social-btn facebook" onclick="popupManager.socialLogin('facebook')">
                        <i class="fab fa-facebook-f"></i>
                        Đăng nhập với Facebook
                    </button>
                    <button class="social-btn apple" onclick="popupManager.socialLogin('apple')">
                        <i class="fab fa-apple"></i>
                        Đăng nhập với Apple
                    </button>
                </div>

                <div class="form-switch">
                    <span>Chưa có tài khoản? </span>
                    <a href="#" onclick="popupManager.showRegisterPopup()">Đăng ký ngay</a>
                </div>
            </div>
        `;
    }

    getRegisterHTML() {
        return `
            <div class="popup-header">
                <h2 class="popup-title">Đăng Ký</h2>
                <button class="popup-close" onclick="popupManager.closePopup()">&times;</button>
            </div>
            <div class="popup-body">
                <form class="popup-form" id="registerForm">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="registerFirstName">Họ</label>
                            <input type="text" id="registerFirstName" name="firstName" required>
                        </div>
                        <div class="form-group">
                            <label for="registerLastName">Tên</label>
                            <input type="text" id="registerLastName" name="lastName" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="registerEmail">Email</label>
                        <input type="email" id="registerEmail" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="registerPhone">Số điện thoại</label>
                        <input type="tel" id="registerPhone" name="phone">
                    </div>
                    <div class="form-group">
                        <label for="registerPassword">Mật khẩu</label>
                        <input type="password" id="registerPassword" name="password" required>
                    </div>
                    <div class="form-group">
                        <label for="registerConfirmPassword">Xác nhận mật khẩu</label>
                        <input type="password" id="registerConfirmPassword" name="confirmPassword" required>
                    </div>
                    <button type="submit" class="popup-btn popup-btn-primary popup-btn-full">
                        Đăng Ký
                    </button>
                </form>

                <div class="divider">
                    <span>hoặc</span>
                </div>

                <div class="social-login">
                    <button class="social-btn google" onclick="popupManager.socialLogin('google')">
                        <i class="fab fa-google"></i>
                        Đăng ký với Google
                    </button>
                    <button class="social-btn facebook" onclick="popupManager.socialLogin('facebook')">
                        <i class="fab fa-facebook-f"></i>
                        Đăng ký với Facebook
                    </button>
                    <button class="social-btn apple" onclick="popupManager.socialLogin('apple')">
                        <i class="fab fa-apple"></i>
                        Đăng ký với Apple
                    </button>
                </div>

                <div class="form-switch">
                    <span>Đã có tài khoản? </span>
                    <a href="#" onclick="popupManager.showLoginPopup()">Đăng nhập</a>
                </div>
            </div>
        `;
    }

    getProfileHTML() {
        const user = this.currentUser;
        const initials = user ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` : 'U';
        const fullName = user ? `${user.firstName} ${user.lastName}` : 'Người dùng';
        const email = user ? user.email : 'user@example.com';

        return `
            <div class="popup-header">
                <h2 class="popup-title">Hồ Sơ Cá Nhân</h2>
                <button class="popup-close" onclick="popupManager.closePopup()">&times;</button>
            </div>
            <div class="popup-body">
                <div class="profile-header">
                    <div class="profile-avatar">${initials}</div>
                    <h3 class="profile-name">${fullName}</h3>
                    <p class="profile-email">${email}</p>
                </div>

                <div class="profile-stats">
                    <div class="stat-item">
                        <p class="stat-number">12</p>
                        <p class="stat-label">Lần tham quan</p>
                    </div>
                    <div class="stat-item">
                        <p class="stat-number">5</p>
                        <p class="stat-label">Đánh giá</p>
                    </div>
                    <div class="stat-item">
                        <p class="stat-number">3</p>
                        <p class="stat-label">Ảnh đã chia sẻ</p>
                    </div>
                </div>

                <div class="profile-actions">
                    <button class="popup-btn popup-btn-secondary" onclick="popupManager.editProfile()">
                        <i class="fas fa-edit"></i> Chỉnh sửa hồ sơ
                    </button>
                    <button class="popup-btn popup-btn-secondary" onclick="popupManager.showHistory()">
                        <i class="fas fa-history"></i> Lịch sử tham quan
                    </button>
                    <button class="popup-btn popup-btn-secondary" onclick="popupManager.showFavorites()">
                        <i class="fas fa-heart"></i> Yêu thích
                    </button>
                    <button class="popup-btn popup-btn-secondary" onclick="popupManager.showSettings()">
                        <i class="fas fa-cog"></i> Cài đặt
                    </button>
                    <button class="popup-btn" style="background: #e74c3c; color: white;" onclick="popupManager.logout()">
                        <i class="fas fa-sign-out-alt"></i> Đăng xuất
                    </button>
                </div>
            </div>
        `;
    }

    bindLoginEvents() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }
    }

    bindRegisterEvents() {
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister();
            });
        }
    }

    bindProfileEvents() {
        // Profile events are handled by onclick attributes
    }

    handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const submitBtn = document.querySelector('#loginForm .popup-btn');

        if (!email || !password) {
            this.showNotification('Vui lòng điền đầy đủ thông tin', 'error');
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.textContent = 'Đang đăng nhập...';

        // Simulate login process
        setTimeout(() => {
            // Mock successful login
            this.currentUser = {
                firstName: 'Nguyễn',
                lastName: 'Văn A',
                email: email,
                phone: '0123456789'
            };
            this.isAuthenticated = true;
            this.saveAuthStatus();

            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Đăng nhập thành công!';
            submitBtn.style.background = '#27ae60';

            this.showNotification('Đăng nhập thành công!', 'success');
            this.updateAuthUI();

            setTimeout(() => {
                this.closePopup();
            }, 1500);
        }, 2000);
    }

    handleRegister() {
        const formData = new FormData(document.getElementById('registerForm'));
        const submitBtn = document.querySelector('#registerForm .popup-btn');

        // Validate form
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        if (password !== confirmPassword) {
            this.showNotification('Mật khẩu xác nhận không khớp', 'error');
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.textContent = 'Đang đăng ký...';

        // Simulate registration process
        setTimeout(() => {
            // Mock successful registration
            this.currentUser = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone')
            };
            this.isAuthenticated = true;
            this.saveAuthStatus();

            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Đăng ký thành công!';
            submitBtn.style.background = '#27ae60';

            this.showNotification('Đăng ký thành công!', 'success');
            this.updateAuthUI();

            setTimeout(() => {
                this.closePopup();
            }, 1500);
        }, 2000);
    }

    socialLogin(provider) {
        this.showNotification(`Đang đăng nhập với ${provider}...`, 'info');
        
        // Simulate social login
        setTimeout(() => {
            this.currentUser = {
                firstName: 'Nguyễn',
                lastName: 'Văn B',
                email: `user@${provider}.com`,
                phone: '0123456789'
            };
            this.isAuthenticated = true;
            this.saveAuthStatus();

            this.showNotification(`Đăng nhập với ${provider} thành công!`, 'success');
            this.updateAuthUI();
            this.closePopup();
        }, 1500);
    }

    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.saveAuthStatus();
        this.updateAuthUI();
        this.closePopup();
        this.showNotification('Đã đăng xuất thành công', 'success');
    }

    editProfile() {
        this.showNotification('Tính năng đang phát triển', 'info');
    }

    showHistory() {
        this.showNotification('Tính năng đang phát triển', 'info');
    }

    showFavorites() {
        this.showNotification('Tính năng đang phát triển', 'info');
    }

    showSettings() {
        this.showNotification('Tính năng đang phát triển', 'info');
    }

    checkAuthStatus() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.isAuthenticated = true;
        }
        this.updateAuthUI();
    }

    saveAuthStatus() {
        if (this.currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        } else {
            localStorage.removeItem('currentUser');
        }
    }

    updateAuthUI() {
        const authButtons = document.querySelectorAll('.auth-btn');
        
        authButtons.forEach(btn => {
            if (this.isAuthenticated) {
                btn.innerHTML = '<i class="fas fa-user"></i> Hồ sơ';
                btn.onclick = () => this.showProfilePopup();
            } else {
                btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Đăng nhập';
                btn.onclick = () => this.showLoginPopup();
            }
        });
    }

    showNotification(message, type = 'info') {
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
            z-index: 10001;
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
}

// Initialize popup manager when DOM is loaded
let popupManager;
document.addEventListener('DOMContentLoaded', function() {
    popupManager = new PopupManager();
});

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