// Contact Form Functionality
const contactForm = document.getElementById('contactForm');
const formGroups = document.querySelectorAll('.form-group');

// Form validation
function validateForm() {
    let isValid = true;
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        if (!input.value.trim()) {
            isValid = false;
            group.classList.add('error');
            
            // Create error message if it doesn't exist
            if (!group.querySelector('.error-message')) {
                const error = document.createElement('span');
                error.className = 'error-message';
                error.textContent = `${label.textContent} is required`;
                group.appendChild(error);
            }
        } else {
            group.classList.remove('error');
            const error = group.querySelector('.error-message');
            if (error) {
                error.remove();
            }
            
            // Email validation
            if (input.type === 'email') {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(input.value)) {
                    isValid = false;
                    group.classList.add('error');
                    const error = document.createElement('span');
                    error.className = 'error-message';
                    error.textContent = 'Please enter a valid email address';
                    group.appendChild(error);
                }
            }
        }
    });
    
    return isValid;
}

// Real-time validation
formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    
    input.addEventListener('blur', () => {
        if (!input.value.trim()) {
            group.classList.add('error');
        } else {
            group.classList.remove('error');
        }
    });
    
    input.addEventListener('input', () => {
        const error = group.querySelector('.error-message');
        if (error) {
            error.remove();
        }
        group.classList.remove('error');
    });
});

// Form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
        showNotification('Please fill in all required fields correctly.', 'error');
        return;
    }
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real application, you would send the data to your server here
        console.log('Form data:', data);
        
        // Show success message
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
    } catch (error) {
        showNotification('An error occurred. Please try again later.', 'error');
    }
});

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add floating label effect
formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const label = group.querySelector('label');
    
    input.addEventListener('focus', () => {
        label.classList.add('active');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            label.classList.remove('active');
        }
    });
    
    // Check if input has value on page load
    if (input.value) {
        label.classList.add('active');
    }
}); 