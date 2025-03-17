// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true
});

// Mobile Navigation
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
});

// Smooth Scrolling
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

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Skill Progress Animation
const skillSection = document.querySelector('.skills');
const progressBars = document.querySelectorAll('.progress');

function showProgress() {
    progressBars.forEach(progress => {
        const value = progress.dataset.progress;
        progress.style.opacity = 1;
        progress.style.width = `${value}%`;
    });
}

function hideProgress() {
    progressBars.forEach(progress => {
        progress.style.opacity = 0;
        progress.style.width = 0;
    });
}

window.addEventListener('scroll', () => {
    const sectionPos = skillSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 2;
    
    if(sectionPos < screenPos) {
        showProgress();
    } else {
        hideProgress();
    }
});

// Form Validation and Submission
const contactForm = document.querySelector('.contact-form');
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Add loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form submission)
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.backgroundColor = '#27ae60';
        
        // Reset form
        setTimeout(() => {
            contactForm.reset();
            submitBtn.innerHTML = 'Send Message';
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = '';
        }, 3000);
    }, 1500);
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Search Functionality
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        // Implement search functionality
        console.log('Searching for:', searchTerm);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            // Implement search functionality
            console.log('Searching for:', searchTerm);
        }
    }
});

// Profile Tabs
const profileTabs = document.querySelectorAll('.profile-menu a');
const tabContents = document.querySelectorAll('.tab-content');

profileTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = tab.getAttribute('href').substring(1);
        
        // Update active tab
        profileTabs.forEach(t => t.parentElement.classList.remove('active'));
        tab.parentElement.classList.add('active');
        
        // Show target content
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === targetId) {
                content.classList.add('active');
            }
        });
    });
});

// Cart Functionality
const quantityButtons = document.querySelectorAll('.quantity-btn');
const cartItems = document.querySelectorAll('.cart-item');

quantityButtons.forEach(button => {
    button.addEventListener('click', () => {
        const input = button.parentElement.querySelector('input');
        const currentValue = parseInt(input.value);
        
        if (button.classList.contains('plus')) {
            input.value = currentValue + 1;
        } else if (button.classList.contains('minus') && currentValue > 1) {
            input.value = currentValue - 1;
        }
        
        updateCartTotal();
    });
});

function updateCartTotal() {
    // Implement cart total calculation
    console.log('Updating cart total...');
}

// Wishlist Functionality
const wishlistItems = document.querySelectorAll('.wishlist-item');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

wishlistItems.forEach(item => {
    const removeButton = item.querySelector('.remove-from-wishlist');
    if (removeButton) {
        removeButton.addEventListener('click', () => {
            item.remove();
            checkEmptyWishlist();
        });
    }
});

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Implement add to cart functionality
        console.log('Adding item to cart...');
    });
});

function checkEmptyWishlist() {
    const wishlistGrid = document.querySelector('.wishlist-grid');
    const emptyWishlist = document.querySelector('.empty-wishlist');
    
    if (wishlistGrid.children.length === 0) {
        emptyWishlist.style.display = 'block';
    } else {
        emptyWishlist.style.display = 'none';
    }
}

// Form Validation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        if (isValid) {
            // Implement form submission
            console.log('Form submitted successfully');
        }
    });
});

// Image Upload Preview
const imageInput = document.querySelector('input[type="file"]');
const profileImage = document.querySelector('.profile-image img');

if (imageInput) {
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profileImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}

// Initialize tooltips
const tooltips = document.querySelectorAll('[data-tooltip]');
tooltips.forEach(element => {
    element.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.textContent = element.getAttribute('data-tooltip');
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
        tooltip.style.left = rect.left + (rect.width - tooltip.offsetWidth) / 2 + 'px';
    });
    
    element.addEventListener('mouseleave', () => {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
}); 