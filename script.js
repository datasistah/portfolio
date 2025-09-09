// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Resume Download Functionality
document.addEventListener('DOMContentLoaded', () => {
    const resumeBtn = document.querySelector('.btn-resume');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            try {
                // Create a temporary link for download
                const link = document.createElement('a');
                link.href = '/assets/LelahMckoy_DataAnalyst_Resume.pdf';
                link.download = 'LelahMckoy_DataAnalyst_Resume.pdf';
                link.target = '_blank';
                
                // Append to body, click, and remove
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Show success notification
                showNotification('Resume download started! (Note: Replace placeholder with actual PDF)', 'success');
                
                // Analytics tracking (if you have Google Analytics)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'resume_download', {
                        'event_category': 'engagement',
                        'event_label': 'Resume PDF'
                    });
                }
                
            } catch (error) {
                console.error('Resume download error:', error);
                showNotification('Resume temporarily unavailable. Please contact directly for resume.', 'error');
            }
        });
    }
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: '10000',
        background: type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#8B5CF6',
        color: 'white',
        padding: '1rem',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '400px',
        backdropFilter: 'blur(10px)'
    });
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 32, 44, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(26, 32, 44, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Enhanced Contact Form with Data Analytics Focus
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Enhanced validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            showNotification('Thank you for your message! I\'ll get back to you within 24 hours.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Analytics tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact_form_submit', {
                    'event_category': 'engagement',
                    'event_label': 'Contact Form'
                });
            }
        }, 1500);
    });
}

// Enhanced scroll animations for data analyst portfolio
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add specific animations for different elements
            if (entry.target.classList.contains('skill-category')) {
                entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                entry.target.classList.add('animate-in');
            }
            
            if (entry.target.classList.contains('recommendation-card')) {
                entry.target.classList.add('animate-recommendation');
            }
        }
    });
}, observerOptions);

// Skill level animation
function animateSkillLevels() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((skill, index) => {
        setTimeout(() => {
            skill.style.transform = 'scale(1)';
            skill.style.opacity = '1';
        }, index * 100);
    });
}

// Data visualization demo (for projects)
function createDataVizDemo() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            // Add subtle data visualization effect
            const overlay = document.createElement('div');
            overlay.className = 'data-overlay';
            overlay.innerHTML = `
                <div class="data-points">
                    <div class="data-point" style="--delay: 0s"></div>
                    <div class="data-point" style="--delay: 0.2s"></div>
                    <div class="data-point" style="--delay: 0.4s"></div>
                    <div class="data-point" style="--delay: 0.6s"></div>
                </div>
            `;
            
            // Add styles for the overlay
            Object.assign(overlay.style, {
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(16, 185, 129, 0.1))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: '0',
                transition: 'opacity 0.3s ease',
                pointerEvents: 'none'
            });
            
            card.style.position = 'relative';
            card.appendChild(overlay);
            
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 50);
        });
        
        card.addEventListener('mouseleave', () => {
            const overlay = card.querySelector('.data-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 300);
            }
        });
    });
}

// Initialize data analyst specific features
document.addEventListener('DOMContentLoaded', () => {
    // Animate elements on scroll
    const animateElements = document.querySelectorAll(
        '.project-card, .skill-category, .about-text, .recommendation-card, .experience-item'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    // Initialize skill level animations
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillLevels();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        skillsObserver.observe(skillsSection);
    }
    
    // Initialize data visualization demos
    createDataVizDemo();
    
    // Add CSS for data points animation
    const style = document.createElement('style');
    style.textContent = `
        .data-point {
            width: 10px;
            height: 10px;
            background: #10B981;
            border-radius: 50%;
            margin: 5px;
            opacity: 0;
            transform: scale(0);
            animation: dataPointPulse 1s ease-out infinite var(--delay);
        }
        
        @keyframes dataPointPulse {
            0% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1.5); }
            100% { opacity: 0; transform: scale(0); }
        }
        
        .data-points {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }
        
        .animate-recommendation {
            animation: recommendationFloat 3s ease-in-out infinite;
        }
        
        @keyframes recommendationFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        .skill-category.animate-in {
            animation: skillCategorySlide 0.8s ease-out;
        }
        
        @keyframes skillCategorySlide {
            from {
                opacity: 0;
                transform: translateX(-50px) rotateY(-15deg);
            }
            to {
                opacity: 1;
                transform: translateX(0) rotateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});
    
    // Background points sequential animation
    const backgroundPoints = document.querySelectorAll('.background-points li');
    const backgroundSection = document.querySelector('.about-background');
    
    if (backgroundSection) {
        const backgroundObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate background points sequentially
                    backgroundPoints.forEach((point, index) => {
                        setTimeout(() => {
                            point.classList.add('animate-in');
                        }, index * 200); // 200ms delay between each point
                    });
                    backgroundObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });
        
        backgroundObserver.observe(backgroundSection);
    }
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.innerHTML;
    
    // Small delay before starting the typing effect
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 50);
    }, 500);
});

// Add active class to current navigation item
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.transform = `translateY(${scrolled * -0.2}px)`;
    }
});

// Skills animation on scroll
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// Project cards hover effect enhancement
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add some interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add download resume button functionality (if you have a resume)
    const downloadBtn = document.querySelector('.btn-download-resume');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // You can add actual resume download logic here
            alert('Resume download would start here!');
        });
    }
    
    // Add theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }
});

// Add subtle animations to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Console welcome message for data analysts and recruiters
console.log(`
📊 Welcome to Le'lah McKoy's Data Analyst Portfolio!
📧 Contact: Lelahnikohl@gmail.com
💼 Focus: Data Analysis | Business Intelligence | Data Visualization
🛠️ Built with: HTML5, CSS3, JavaScript + Modern UI/UX
📈 Recommendation: "Smart, curious, eager" - Matthew E., VP of Engineering
🚀 Ready to turn data into insights!
`);

// Add performance tracking for portfolio analytics
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`⚡ Portfolio loaded in ${loadTime}ms`);
    });
}
