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
                "item": "https://harmonyca25.github.io/harmony-ca-redo/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Insurance Services",
                "item": "https://harmonyca25.github.io/harmony-ca-redo/#services"
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
    }, 300);
    
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
    
    // Modal functionality
    window.openContactModal = function() {
        const modal = document.getElementById('contactModal');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Accessibility improvements
        modal.setAttribute('aria-hidden', 'false');
        
        // Set focus to the modal close button
        setTimeout(() => {
            document.querySelector('.modal-close').focus();
        }, 100);
    };
    
    window.closeContactModal = function() {
        const modal = document.getElementById('contactModal');
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Allow scrolling again
        
        // Accessibility improvements
        modal.setAttribute('aria-hidden', 'true');
    };
    
    // Close the modal when clicking outside of it
    window.onclick = function(event) {
        const modal = document.getElementById('contactModal');
        if (event.target == modal) {
            closeContactModal();
        }
    };
    
    // Keyboard accessibility - close on escape key
    document.addEventListener('keydown', function(event) {
        const modal = document.getElementById('contactModal');
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            closeContactModal();
        }
    });
    
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
        });
    }
    
    if (navClose && nav) {
        navClose.addEventListener('click', function() {
            nav.classList.remove('active');
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
    
    // Generate service cards
    generateServiceCards();
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

// Decorator for logging icon updates
function logIconUpdate(target, name, descriptor) {
    const original = descriptor.value;
    
    descriptor.value = function(...args) {
        const result = original.apply(this, args);
        console.log('✅ Card icons successfully updated');
        return result;
    };
    
    return descriptor;
}

// Card data for Ontario insurance services
const cardData = [
    {
        title: "Life Insurance",
        text: "Protect your family's financial future with term, whole life, and universal life insurance policies tailored to Ontario residents. Get coverage that provides long-term security and peace of mind.",
        image: "https://github.com/harmonyca25/rekha-harmony-plan-ca/blob/main/assets/lifeinsurance.jpg?raw=true",
        icon: "fas fa-heart" // Font Awesome icon
    },
    {
        title: "Health Insurance",
        text: "Supplement OHIP with extended health insurance that covers prescription drugs, dental care, vision care, and more. Protect yourself from unexpected medical expenses not covered by provincial healthcare.",
        image: "https://github.com/harmonyca25/rekha-harmony-plan-ca/blob/main/assets/healthinsurance.jpg?raw=true",
        icon: "fas fa-medkit" // Font Awesome icon
    },
    {
        title: "Critical Illness Insurance",
        text: "Receive a tax-free lump sum payment upon diagnosis of covered critical illnesses like cancer, stroke, or heart attack. Use the funds for treatment, recovery, or maintaining your lifestyle during difficult times.",
        image: "https://github.com/harmonyca25/rekha-harmony-plan-ca/blob/main/assets/critical.jpg?raw=true",
        icon: "fas fa-heartbeat" // Font Awesome icon
    },
    {
        title: "Travel Insurance",
        text: "Travel with confidence knowing you're covered for medical emergencies, trip cancellations, and lost baggage. Essential protection for Ontarians traveling outside the province or internationally.",
        image: "https://github.com/harmonyca25/rekha-harmony-plan-ca/blob/main/assets/travelinsurance.jpg?raw=true",
        icon: "fas fa-plane" // Font Awesome icon
    },
    {
        title: "Retirement Planning",
        text: "Secure your future with comprehensive retirement planning, including RRSP options, pension planning, and investment strategies designed to provide income security during your retirement years.",
        image: "https://github.com/harmonyca25/rekha-harmony-plan-ca/blob/main/assets/retirement.jpg?raw=true",
        icon: "fas fa-piggy-bank" // Font Awesome icon
    },
    {
        title: "Tax-Free Savings (TFSA)",
        text: "Maximize your savings potential with TFSA plans that offer tax-free growth and flexible withdrawal options. An essential component of financial planning for Ontario residents.",
        image: "https://github.com/harmonyca25/rekha-harmony-plan-ca/blob/main/assets/tfsa.jpg?raw=true",
        icon: "fas fa-dollar-sign" // Font Awesome icon
    },
    {
        title: "Disability Insurance",
        text: "Protect your income if you're unable to work due to illness or injury. Disability insurance provides financial stability when you need it most, with plans specifically designed for Ontario professionals.",
        image: "https://github.com/harmonyca25/rekha-harmony-plan-ca/blob/main/assets/disabilty.jpg?raw=true",
        icon: "fas fa-wheelchair" // Font Awesome icon
    },
    {
        title: "Education Plan (RESP)",
        text: "Invest in your children's future with Registered Education Savings Plans (RESPs). Take advantage of government grants and tax-deferred growth to build an education fund that will help your children pursue their academic goals.",
        image: "https://github.com/harmonyca25/rekha-harmony-plan-ca/blob/main/assets/resp.jpg?raw=true",
        icon: "fas fa-graduation-cap" // Font Awesome icon
    }
];

// Since decorators aren't widely supported in browsers yet, we'll implement the logger manually
// Function to generate service cards
function generateServiceCards() {
    const grid = document.getElementById("cardGrid");
    
    // If the grid doesn't exist yet, return (page might still be loading)
    if (!grid) return;
    
    // Clear existing content
    grid.innerHTML = '';
    
    // Generate cards
    cardData.forEach((data, index) => {
        const card = document.createElement("div");
        card.className = "art-deco-card fade-in";
        card.setAttribute('data-index', index);
        card.innerHTML = `
            <div class="card-overlay" style="background-image: url('${data.image}?auto=format&fit=crop&w=400&q=80');"></div>
            <div class="card-icon">
                <i class="${data.icon}"></i>
            </div>
            <div class="card-content">
                <h2>${data.title}</h2>
                <p>${data.text}</p>
            </div>
            <div class="interest-button">
                <div class="circle-button" style="background-image: url('${data.image}?auto=format&fit=crop&w=400&q=80');"></div>
                <p>Yes, I am interested in this plan</p>
            </div>
        `;
        
        // Add event listener to the circle button
        card.querySelector('.circle-button').addEventListener('click', () => {
            // Clear first, then set
            localStorage.removeItem('selectedInsuranceService');
            
            // Store the selected service data
            localStorage.setItem('selectedInsuranceService', JSON.stringify({
                title: data.title,
                text: data.text,
                timestamp: new Date().getTime() // Add timestamp to ensure freshness
            }));
            
            console.log('Selected service:', data.title);
            
            // Show a toast notification indicating the service was selected
            showToast(`Selected plan: ${data.title}`, 3000);
            
            // Open the contact modal
            if (typeof openContactModal === 'function') {
                openContactModal();
            }
        });
        
        grid.appendChild(card);
    });
    
    // Log successful icon updates
    console.log('✅ Card icons successfully updated');
    
    // Ensure icons are visible
    ensureIconsAreVisible();
}

// Function to ensure icons are visible
function ensureIconsAreVisible() {
    // Make sure Font Awesome is loaded
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fontAwesomeLink = document.createElement('link');
        fontAwesomeLink.rel = 'stylesheet';
        fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
        document.head.appendChild(fontAwesomeLink);
        console.log('✅ Font Awesome CSS loaded dynamically');
    }
    
    // Add some basic CSS to ensure icons are properly sized and visible
    const iconStyle = document.createElement('style');
    iconStyle.textContent = `
        .card-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            width: 48px;
            height: 48px;
            margin: 0 auto 15px;
            color: #fff;
            background: rgba(44, 62, 80, 0.8);
            border-radius: 50%;
            z-index: 2;
            position: relative;
        }
    `;
    document.head.appendChild(iconStyle);
}

// Listen for messages from the iframe
window.addEventListener('message', function(event) {
    // Handle form events from iframe
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
        
        // If the message indicates form was updated
        if (event.data.type === 'formUpdated' && event.data.success) {
            showToast(event.data.message || 'Form updated successfully', 3000);
        }
    }
    
    // Handle iframe loaded notification
    if (event.data === 'iframeLoaded') {
        // Send selected service data to iframe if it exists
        const serviceData = localStorage.getItem('selectedInsuranceService');
        
        if (serviceData) {
            try {
                // Parse the data
                const data = JSON.parse(serviceData);
                
                // Send it to the iframe
                const iframe = document.querySelector('.modal-iframe');
                if (iframe && iframe.contentWindow) {
                    iframe.contentWindow.postMessage({
                        type: 'serviceSelected',
                        data: data
                    }, '*');
                    
                    // Show toast notification
                    showToast(`Form updated with: ${data.title}`, 3000);
                }
            } catch (error) {
                console.error('Error processing service data:', error);
                showToast('Error updating form with selected plan', 3000);
            }
        }
    }
});
//updated on april 19, 2025 fixed the form updating issue in form iframe using claude sonnet3.7
