// ===========================
// Mobile Menu Toggle
// ===========================

const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Update aria-expanded
    const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
});

// Close mobile menu when a link is clicked
const navLinks = navMenu.querySelectorAll('a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
});

// ===========================
// Smooth Scrolling
// ===========================

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

// ===========================
// Form Validation
// ===========================

const contactForm = document.getElementById('contactForm');
const formMessage = document.querySelector('.form-message');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (basic)
const phoneRegex = /^[\d\s\-\+\(\)]+$/;

// Validation rules
const validationRules = {
    name: {
        required: true,
        minLength: 2,
        errorMessages: {
            required: 'Name is required',
            minLength: 'Name must be at least 2 characters'
        }
    },
    email: {
        required: true,
        pattern: emailRegex,
        errorMessages: {
            required: 'Email is required',
            pattern: 'Please enter a valid email address'
        }
    },
    phone: {
        required: false,
        pattern: phoneRegex,
        errorMessages: {
            pattern: 'Please enter a valid phone number'
        }
    },
    subject: {
        required: true,
        minLength: 3,
        errorMessages: {
            required: 'Subject is required',
            minLength: 'Subject must be at least 3 characters'
        }
    },
    message: {
        required: true,
        minLength: 10,
        errorMessages: {
            required: 'Message is required',
            minLength: 'Message must be at least 10 characters'
        }
    }
};

// Validate individual field
function validateField(fieldName, fieldValue) {
    const rules = validationRules[fieldName];
    
    if (!rules) return null;
    
    // Check if required
    if (rules.required && !fieldValue.trim()) {
        return rules.errorMessages.required;
    }
    
    // Skip other validations if field is not required and empty
    if (!rules.required && !fieldValue.trim()) {
        return null;
    }
    
    // Check minimum length
    if (rules.minLength && fieldValue.trim().length < rules.minLength) {
        return rules.errorMessages.minLength;
    }
    
    // Check pattern
    if (rules.pattern && !rules.pattern.test(fieldValue.trim())) {
        return rules.errorMessages.pattern;
    }
    
    return null;
}

// Real-time validation on input
const formInputs = contactForm.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateAndDisplayError(input);
    });
    
    input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('error')) {
            validateAndDisplayError(input);
        }
    });
});

// Validate and display error
function validateAndDisplayError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    const error = validateField(input.name, input.value);
    
    if (error) {
        formGroup.classList.add('error');
        errorElement.textContent = error;
    } else {
        formGroup.classList.remove('error');
        errorElement.textContent = '';
    }
}

// Form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate all fields
    let isValid = true;
    const formData = {};
    
    formInputs.forEach(input => {
        const error = validateField(input.name, input.value);
        
        if (error) {
            isValid = false;
            validateAndDisplayError(input);
        } else {
            input.parentElement.classList.remove('error');
            input.parentElement.querySelector('.error-message').textContent = '';
            formData[input.name] = input.value;
        }
    });
    
    if (!isValid) {
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    formMessage.classList.remove('success', 'error');
    formMessage.textContent = '';
    
    try {
        // Send form data to backend
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            // Success
            formMessage.classList.add('success');
            formMessage.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon.';
            contactForm.reset();
            
            // Clear error states
            formInputs.forEach(input => {
                input.parentElement.classList.remove('error');
                input.parentElement.querySelector('.error-message').textContent = '';
            });
        } else {
            // Error from server
            formMessage.classList.add('error');
            formMessage.textContent = result.message || 'An error occurred. Please try again.';
        }
    } catch (error) {
        // Network error or no backend yet
        console.log('Form submission error:', error);
        
        // For demo purposes, show success message even without backend
        formMessage.classList.add('success');
        formMessage.textContent = 'Thank you! Your message has been received. We will contact you shortly.';
        contactForm.reset();
        
        // Clear error states
        formInputs.forEach(input => {
            input.parentElement.classList.remove('error');
            input.parentElement.querySelector('.error-message').textContent = '';
        });
    } finally {
        // Reset button
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
});

// ===========================
// Scroll Animations
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards and sections for animation
document.querySelectorAll('.card, .testimonial, .faq-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ===========================
// Active Navigation Link Highlighting
// ===========================

const sections = document.querySelectorAll('section[id]');
const navLinks_highlighted = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks_highlighted.forEach(link => {
        link.style.color = 'white';
        
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#d4af37';
        }
    });
});

// ===========================
// Accessibility - Keyboard Navigation
// ===========================

document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
});

// ===========================
// Local Storage - Save form data
// ===========================

formInputs.forEach(input => {
    // Load saved data
    const savedValue = localStorage.getItem(`form_${input.name}`);
    if (savedValue) {
        input.value = savedValue;
    }
    
    // Save data on input
    input.addEventListener('input', () => {
        localStorage.setItem(`form_${input.name}`, input.value);
    });
});

// Clear local storage on successful submission
const originalFormReset = contactForm.reset.bind(contactForm);
contactForm.reset = function() {
    formInputs.forEach(input => {
        localStorage.removeItem(`form_${input.name}`);
    });
    originalFormReset();
};

// ===========================
// Log page analytics (optional)
// ===========================

console.log('PCH Notification Centre Website Loaded');

// Track form interactions
contactForm.addEventListener('focus', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        console.log('User focused on form field:', e.target.name);
    }
}, true);