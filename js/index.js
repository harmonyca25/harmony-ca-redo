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
    
    // Add animation styles
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        @keyframes circle-stroke {
            100% { stroke-dashoffset: 0; }
        }
        @keyframes check-stroke {
            100% { stroke-dashoffset: 0; }
        }
        @keyframes scale {
            0%, 100% { transform: none; }
            50% { transform: scale3d(1.1, 1.1, 1); }
        }
        @keyframes fill {
            100% { box-shadow: inset 0px 0px 0px 3px #4BB543; }
        }
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(75, 181, 67, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(75, 181, 67, 0); }
            100% { box-shadow: 0 0 0 0 rgba(75, 181, 67, 0); }
        }
        .message-highlight {
            animation: pulse 1s;
            border: 2px solid #4BB543 !important;
            transition: all 0.3s ease;
        }
        .message-error {
            border: 2px solid #FF6347 !important;
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(animationStyles);
    
    // Initialize animations with a slight delay
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(element => {
            element.classList.add('active');
        });
    }, 300);
    
    // Generate service cards
    generateServiceCards();
    
    // Initialize Firebase
    initializeFirebase();
    
    // Setup form event handlers
    setupFormHandlers();
    
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
    setupModalHandlers();
});

// Modal handling functions
function setupModalHandlers() {
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
}

// Modal open function
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

// Modal close function
function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Allow scrolling again
    
    // Accessibility improvements
    modal.setAttribute('aria-hidden', 'true');
}

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

// Function to fill form with service data
function fillFormWithServiceData(title, text) {
    const messageField = document.getElementById('message');
    if (messageField) {
        // Set the value
        messageField.value = `I'm interested in: ${title}\n\n${text}\n\nPlease contact me about this service.`;
        
        // Highlight the field to show it was updated
        messageField.classList.remove('message-error');
        messageField.classList.add('message-highlight');
        
        // Focus on the field
        messageField.focus();
        
        // Show toast notification
        showToast(`Form updated with: ${title}`, 3000);
        
        console.log('Form pre-filled with:', title);
        return true;
    }
    return false;
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
            console.log('Selected service:', data.title);
            
            // Show a toast notification indicating the service was selected
            showToast(`Selected plan: ${data.title}`, 3000);
            
            // Open the contact modal first
            openContactModal();
            
            // Then fill the form with the service data (direct update without localStorage)
            setTimeout(() => {
                fillFormWithServiceData(data.title, data.text);
            }, 300); // Small delay to ensure modal is open
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

// Firebase Integration
let firebaseApp;
let db;

// Function to initialize Firebase
// Function to initialize Firebase
// Function to initialize Firebase
function initializeFirebase() {
    try {
        // Check if Firebase scripts are loaded
        if (!window.firebase) {
            // Dynamically load Firebase if not already loaded
            loadFirebaseScripts();
            return;
        }
        
        // Since firebaseConfig.js already initializes Firebase, we just need to get the app instance
        if (firebase.apps.length > 0) {
            // Firebase is already initialized by firebaseConfig.js
            firebaseApp = firebase.apps[0]; // Get the existing app
            db = firebaseApp.firestore();
            console.log('Firebase reference obtained successfully');
        } else {
            // If Firebase isn't initialized yet, try to load the config
            console.log('Firebase not initialized, attempting to load config...');
            
            // Try to find the config in the global scope
            if (typeof firebaseConfig !== 'undefined') {
                // Initialize Firebase with the config
                firebaseApp = firebase.initializeApp(firebaseConfig);
                db = firebaseApp.firestore();
                console.log('Firebase initialized with found config');
            } else {
                // If all else fails, load the config file dynamically
                const configScript = document.createElement('script');
                configScript.src = 'src/firebaseConfig.js'; // Note the capital C
                configScript.onload = function() {
                    // After loading, just get the app since the script initializes Firebase
                    if (firebase.apps.length > 0) {
                        firebaseApp = firebase.apps[0];
                        db = firebaseApp.firestore();
                        console.log('Firebase initialized by dynamically loaded config');
                    } else {
                        console.error('Firebase initialization failed even after loading config');
                        showToast('Unable to connect to our database. Please try again later.');
                    }
                };
                document.head.appendChild(configScript);
                return; // Exit and wait for the script to load
            }
        }
    } catch (error) {
        console.error('Error initializing Firebase:', error);
        showToast('Unable to connect to our database. Please try again later.');
    }
}

// Function to dynamically load Firebase scripts
function loadFirebaseScripts() {
    // Load Firebase App
    const firebaseAppScript = document.createElement('script');
    firebaseAppScript.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js';
    document.head.appendChild(firebaseAppScript);
    
    // Load Firestore
    const firestoreScript = document.createElement('script');
    firestoreScript.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js';
    
    // Initialize Firebase after scripts are loaded
    firestoreScript.onload = () => {
        initializeFirebase();
    };
    
    document.head.appendChild(firestoreScript);
}

// Function to set up form event handlers
function setupFormHandlers() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!db) {
            showToast('Database connection not established. Please refresh and try again.');
            return;
        }
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        const consent = document.getElementById('consent').checked;
        
        // Check for duplicate submission
        try {
            const querySnapshot = await db.collection('contactSubmissions')
                .where('email', '==', email)
                .get();
            
            if (!querySnapshot.empty) {
                // Get the most recent submission
                let lastSubmission = null;
                let latestDate = new Date(0); // Start with oldest possible date
                
                querySnapshot.forEach(doc => {
                    const data = doc.data();
                    const submissionDate = data.timestamp.toDate();
                    if (submissionDate > latestDate) {
                        latestDate = submissionDate;
                        lastSubmission = data;
                    }
                });
                
                // Format the date for display
                const formattedDate = latestDate.toLocaleDateString('en-US', {
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                
                showToast(`You've already submitted a message on ${formattedDate}. We'll get back to you soon.`);
                return;
            }
            
            // If no duplicate, proceed with submission
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            
            await db.collection('contactSubmissions').add({
                name,
                email,
                phone,
                message,
                consent,
                timestamp
            });
            
            // Show thank you message with the submitter's name
            document.getElementById('submitterName').textContent = name;
            document.getElementById('form-container').style.display = 'none';
            document.getElementById('thankYouMessage').style.display = 'block';
            
        } catch (error) {
            console.error('Error submitting form:', error);
            showToast('There was an error submitting your message. Please try again.');
        }
    });
}

// Function to reset the form for another submission
function resetForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) contactForm.reset();
    
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('thankYouMessage').style.display = 'none';
    
    // Remove any highlighting from the message field
    const messageField = document.getElementById('message');
    if (messageField) {
        messageField.classList.remove('message-highlight', 'message-error');
    }
}
