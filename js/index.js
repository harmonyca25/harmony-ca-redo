// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add structured data dynamically
    const breadcrumbsSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://anandvip.github.io/rekha-2-canada/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Insurance Services",
                "item": "https://anandvip.github.io/rekha-2-canada/#services"
            }
        ]
    };
    
    const breadcrumbsScript = document.createElement('script');
    breadcrumbsScript.type = 'application/ld+json';
    breadcrumbsScript.text = JSON.stringify(breadcrumbsSchema);
    document.head.appendChild(breadcrumbsScript);
    
    // Initialize animations with a slight delay
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(element => {
            element.classList.add('active');
        });



// Modal functionality is already defined inline in the HTML for immediate availability
// These functions are here as a reference and for consistency

/* 
function openContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Accessibility improvements
    modal.setAttribute('aria-hidden', 'false');
    
    // Set focus to the modal close button
    setTimeout(() => {
        document.querySelector('.modal-close').focus();
    }, 100);
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Allow scrolling again
    
    // Accessibility improvements
    modal.setAttribute('aria-hidden', 'true');
}
*/
        // Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }, 500);
    }
});

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target == modal) {
        closeContactModal();
    }
}

// Keyboard accessibility - close on escape key
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('contactModal');
    if (event.key === 'Escape' && modal.classList.contains('show')) {
        closeContactModal();
    }
});

// Show toast notification
function showToast(message, duration = 5000) {
    const toast = document.getElementById('toastNotification');
    document.getElementById('toastMessage').textContent = message;
    
    toast.style.visibility = 'visible';
    toast.style.opacity = '1';
    
    // Hide toast after specified duration
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            toast.style.visibility = 'hidden';
        }, 300);
    }, duration);
}

// Listen for messages from the iframe
window.addEventListener('message', function(event) {
    // Make sure the message is from our form page
    if (event.data && event.data.type) {
        // If the message indicates form submission success
        if (event.data.type === 'formSubmitted') {
            console.log('Form submitted successfully');
            // You can add additional actions here when the form is submitted
        }
        
        // If the message indicates to close the modal
        if (event.data.type === 'closeModal') {
            closeContactModal();
        }
        
        // If the message includes a toast notification
        if (event.data.type === 'showToast' && event.data.message) {
            showToast(event.data.message);
        }
    }
});
    }, 300);
    
    // Scroll animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check
    checkFade();
    
    // Add scroll event listener
    window.addEventListener('scroll', checkFade);
    
    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    }
    
    window.addEventListener('scroll', toggleBackToTop);
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Header scroll effect
    const header = document.getElementById('header');
    
    function headerScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', headerScroll);
    
    // Mobile navigation
const navToggle = document.querySelector('.nav-toggle');
const navClose = document.querySelector('.nav-close');
const nav = document.querySelector('nav');

if (navToggle && nav) {
    navToggle.addEventListener('click', function() {
        nav.classList.add('active');
        // No need to manually set display for nav-close
        // It will become visible due to the CSS rule:
        // nav.active .nav-close { display: block; }
    });
}

if (navClose && nav) {
    navClose.addEventListener('click', function() {
        nav.classList.remove('active');
        // No need to manually hide it, as removing 'active' class
        // will make it disappear due to CSS
    });
}

// Close mobile nav when clicking a link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            nav.classList.remove('active');
        }
    });
});
    
    // Privacy policy toggle
    const privacyLink = document.getElementById('privacy-link');
    const privacySection = document.getElementById('privacy-policy-section');
    
    if (privacyLink && privacySection) {
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            privacySection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
