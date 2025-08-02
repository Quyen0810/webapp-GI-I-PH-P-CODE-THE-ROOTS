// Global variables
let panoramaViewer = null;
let currentPanorama = 'image/4.jpg';

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking Pannellum availability...');
    
    // Wait for Pannellum to be available
    if (typeof pannellum !== 'undefined') {
        console.log('Pannellum is already available');
        initializePanorama();
        initializeControlButtons();
        initializeResponsiveHandling();
    } else {
        console.log('Pannellum not available, waiting...');
        // If Pannellum is not loaded yet, wait for it
        const checkPannellum = setInterval(() => {
            if (typeof pannellum !== 'undefined') {
                console.log('Pannellum became available');
                clearInterval(checkPannellum);
                initializePanorama();
                initializeControlButtons();
                initializeResponsiveHandling();
            }
        }, 100);
        
        // Timeout after 10 seconds
        setTimeout(() => {
            clearInterval(checkPannellum);
            console.error('Pannellum library failed to load');
            showNotification('Không thể tải thư viện panorama!', 'error');
            
            // Try to load Pannellum manually
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/pannellum@2.5.6/build/pannellum.js';
            script.onload = function() {
                console.log('Pannellum loaded manually');
                initializePanorama();
                initializeControlButtons();
                initializeResponsiveHandling();
            };
            script.onerror = function() {
                console.error('Failed to load Pannellum manually');
                showNotification('Không thể tải thư viện panorama từ CDN!', 'error');
            };
            document.head.appendChild(script);
        }, 5000);
    }
});

// Initialize 360° Panorama Viewer
function initializePanorama() {
    try {
        console.log('Initializing panorama with:', currentPanorama);
        
        // Check if panorama element exists
        const panoramaContainer = document.getElementById('panorama');
        if (!panoramaContainer) {
            console.error('Panorama element not found');
            showNotification('Không tìm thấy phần tử panorama!', 'error');
            return;
        }
        
        const panoramaConfig = {
            "type": "equirectangular",
            "panorama": currentPanorama,
            "autoLoad": true,
            "autoRotate": -2,
            "autoRotateInactivityDelay": 2000,
            "autoRotateStopDelay": 2000,
            "compass": true,
            "northOffset": 0,
            "showZoomCtrl": true,
            "showFullscreenCtrl": true,
            "showControls": true,
            "mouseZoom": true,
            "draggable": true,
            "keyboard": true,
            "friction": 0.15,
            "minZoom": 0.5,
            "maxZoom": 2.0,
            "minPitch": -90,
            "maxPitch": 90,
            "minYaw": -180,
            "maxYaw": 180,
            "onLoad": function() {
                console.log('Panorama loaded successfully');
                // Remove loading state
                const loadedPanoramaElement = document.getElementById('panorama');
                loadedPanoramaElement.classList.remove('loading');
                showNotification('Panorama đã tải xong!', 'success');
            },
            "onError": function(error) {
                console.error('Panorama error:', error);
                // Remove loading state
                const errorPanoramaElement = document.getElementById('panorama');
                errorPanoramaElement.classList.remove('loading');
                showNotification('Lỗi khi tải panorama: ' + error, 'error');
            }
        };

        // Initialize panorama viewer
        panoramaViewer = pannellum.viewer('panorama', panoramaConfig);
        
        // Add event listeners for panorama controls
        addPanoramaControlListeners();
        
        // Set initial loading state
        const initialPanoramaElement = document.getElementById('panorama');
        initialPanoramaElement.classList.add('loading');
        
        console.log('Panorama viewer initialized successfully');
    } catch (error) {
        console.error('Error initializing panorama:', error);
        showNotification('Lỗi khởi tạo panorama: ' + error.message, 'error');
    }
}

// Add event listeners for panorama control buttons
function addPanoramaControlListeners() {
    const controlButtons = document.querySelectorAll('.control-btn');
    
    controlButtons.forEach(button => {
        button.addEventListener('click', function() {
            const panoramaFile = this.getAttribute('data-panorama');
            if (panoramaFile && panoramaFile !== currentPanorama) {
                loadPanorama(panoramaFile);
                updateActiveControl(this);
            }
        });
    });
}

// Load new panorama
function loadPanorama(panoramaFile) {
    if (panoramaViewer) {
        // Show loading state
        const loadingPanoramaElement = document.getElementById('panorama');
        loadingPanoramaElement.classList.add('loading');
        
        panoramaViewer.load(panoramaFile);
        currentPanorama = panoramaFile;
        
        // Show loading indicator
        showNotification('Đang tải panorama...', 'info');
        
        // Update URL hash
        updateURLHash(panoramaFile);
    }
}

// Update active control button
function updateActiveControl(activeButton) {
    const allButtons = document.querySelectorAll('.control-btn');
    allButtons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');
}

// Update URL hash
function updateURLHash(panoramaFile) {
    const hash = panoramaFile.replace('.jpg', '');
    window.location.hash = hash;
}

// Initialize control buttons
function initializeControlButtons() {
    // Set initial active button
    const initialButton = document.querySelector(`[data-panorama="${currentPanorama}"]`);
    if (initialButton) {
        updateActiveControl(initialButton);
    }
    
    // Handle URL hash on page load
    const hash = window.location.hash.substring(1);
    if (hash) {
        const panoramaFile = `${hash}.jpg`;
        const button = document.querySelector(`[data-panorama="${panoramaFile}"]`);
        if (button) {
            loadPanorama(panoramaFile);
            updateActiveControl(button);
        }
    }
}

// Initialize responsive handling
function initializeResponsiveHandling() {
    // Handle window resize
    window.addEventListener('resize', function() {
        if (panoramaViewer) {
            panoramaViewer.resize();
        }
    });
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            if (panoramaViewer) {
                panoramaViewer.resize();
            }
        }, 100);
    });
    
    // Handle touch events for mobile
    if ('ontouchstart' in window) {
        const panoramaElement = document.getElementById('panorama');
        if (panoramaElement) {
            panoramaElement.style.touchAction = 'none';
        }
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Handle panorama loading events
if (typeof pannellum !== 'undefined') {
    // Add event listeners for panorama loading
    document.addEventListener('pannellum-load', function(e) {
        showNotification('Panorama đã tải xong!', 'success');
    });
    
    document.addEventListener('pannellum-error', function(e) {
        showNotification('Lỗi khi tải panorama!', 'error');
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (panoramaViewer) {
        switch(e.key) {
            case 'ArrowLeft':
                panoramaViewer.setYaw(panoramaViewer.getYaw() - 10);
                break;
            case 'ArrowRight':
                panoramaViewer.setYaw(panoramaViewer.getYaw() + 10);
                break;
            case 'ArrowUp':
                panoramaViewer.setPitch(panoramaViewer.getPitch() + 10);
                break;
            case 'ArrowDown':
                panoramaViewer.setPitch(panoramaViewer.getPitch() - 10);
                break;
            case '+':
            case '=':
                panoramaViewer.setZoom(panoramaViewer.getZoom() + 0.1);
                break;
            case '-':
                panoramaViewer.setZoom(panoramaViewer.getZoom() - 0.1);
                break;
            case '0':
                panoramaViewer.setZoom(1);
                panoramaViewer.setYaw(0);
                panoramaViewer.setPitch(0);
                break;
        }
    }
});

// Handle panorama viewer ready event
document.addEventListener('pannellum-ready', function() {
    showNotification('Sẵn sàng khám phá 360°!', 'success');
});

// Handle panorama viewer error
document.addEventListener('pannellum-error', function(e) {
    console.error('Panorama error:', e.detail);
    showNotification('Có lỗi xảy ra khi tải panorama!', 'error');
});
