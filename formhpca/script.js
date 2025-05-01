// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAprRe8E5qs8O3Zt2QOu7d-8eSvBW2AOeQ",
  authDomain: "harmonyca-561a6.firebaseapp.com",
  projectId: "harmonyca-561a6",
  storageBucket: "harmonyca-561a6.firebasestorage.app",
  messagingSenderId: "92847303206",
  appId: "1:92847303206:web:1d06690a77a2548b1054e7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const message = document.getElementById('message').value.trim();
  const consent = document.getElementById('consent').checked;

  // Validation
  if (!consent) {
    alert('Please check the consent box to proceed.');
    document.getElementById('consent').focus();
    return;
  }
  if (!name || !email || !phone || !message) {
    alert('Please fill in all fields.');
    return;
  }
  if (!validateEmail(email)) {
    alert('Please enter a valid email address.');
    document.getElementById('email').focus();
    return;
  }
  if (!validatePhone(phone)) {
    alert('Please enter a 10-digit phone number (e.g., 9051234567).');
    document.getElementById('phone').focus();
    return;
  }

  // Simple spam prevention (client-side rate limit)
  const lastSubmission = localStorage.getItem('lastSubmission');
  if (lastSubmission && (Date.now() - lastSubmission < 60000)) { // 1-minute cooldown
    alert('Please wait a moment before submitting another query.');
    return;
  }

  // Disable button
  const submitButton = this.querySelector('button');
  submitButton.disabled = true;
  submitButton.textContent = 'Submitting...';

  // Prepare data
  const data = {
    name: name,
    email: email,
    phone: phone,
    message: message,
    consent: true,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  };

  // Submit to Firestore
  db.collection('contactSubmissions').add(data)
    .then(() => {
      localStorage.setItem('lastSubmission', Date.now());
      showSuccessMessage(name);
      this.reset();
      submitButton.disabled = false;
      submitButton.textContent = 'Submit';
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
      submitButton.disabled = false;
      submitButton.textContent = 'Submit';
    });
});

// Helper Functions
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^[0-9]{10}$/;
  return re.test(phone);
}

function showSuccessMessage(name) {
  const successMessage = document.getElementById('successMessage');
  successMessage.textContent = `Thank you, ${name}! We have received your query and will get back to you within 72 hours.`;
  successMessage.style.display = 'block';
  const checkmark = document.getElementById('checkmark');
  checkmark.style.display = 'block';
  checkmark.classList.add('animate');
}
