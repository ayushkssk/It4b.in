// Define default credentials for demo purposes
const defaultUserID = "ayushkssk";
const defaultPassword = "ayush";

// Signup Validation and Logic
document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    const userID = document.getElementById('userID').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const mobileNumber = document.getElementById('mobileNumber').value.trim();
    const emailID = document.getElementById('emailID').value.trim();
    const password = document.getElementById('password').value.trim();

    // Simple validation for email and mobile number
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^[0-9]{10}$/;

    let isValid = true;

    if (!userID) {
        isValid = false;
        alert("User ID is required.");
    }

    if (!firstName) {
        isValid = false;
        alert("First Name is required.");
    }

    if (!lastName) {
        isValid = false;
        alert("Last Name is required.");
    }

    if (!emailPattern.test(emailID)) {
        isValid = false;
        alert('Please enter a valid email address.');
    }

    if (!mobilePattern.test(mobileNumber)) {
        isValid = false;
        alert('Please enter a valid 10-digit mobile number.');
    }

    if (!password) {
        isValid = false;
        alert("Password is required.");
    }

    // If the form is valid, store the details and show the popup
    if (isValid) {
        // Storing user data in localStorage
        const userDetails = {
            userID,
            firstName,
            lastName,
            mobileNumber,
            emailID,
            password
        };
        localStorage.setItem('userDetails', JSON.stringify(userDetails));

        // Show success popup
        const signupSuccessPopup = document.getElementById('signupSuccessPopup');
        signupSuccessPopup.classList.remove('hidden');
    }
});

// Show/Hide Password Logic
document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
});

document.getElementById('toggleLoginPassword').addEventListener('click', function () {
    const passwordField = document.getElementById('loginPassword');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
});

// Close Popup and Redirect to Login Page
document.getElementById('loginButton').addEventListener('click', function () {
    window.location.href = 'login.html';
});

document.getElementById('closePopupButton').addEventListener('click', function () {
    const signupSuccessPopup = document.getElementById('signupSuccessPopup');
    signupSuccessPopup.classList.add('hidden');
});

// Login Logic with Credential Verification and Redirect to Dashboard
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    const enteredUserID = document.getElementById('loginUserID').value.trim();
    const enteredPassword = document.getElementById('loginPassword').value.trim();

    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));

    // Check if entered credentials match the default or stored credentials
    if (
        (storedUserDetails && storedUserDetails.userID === enteredUserID && storedUserDetails.password === enteredPassword) ||
        (enteredUserID === defaultUserID && enteredPassword === defaultPassword)
    ) {
        const fullName = storedUserDetails
            ? `${storedUserDetails.firstName} ${storedUserDetails.lastName}`
            : "Demo User";

        sessionStorage.setItem('loggedIn', true);
        sessionStorage.setItem('userFullName', fullName);
        alert(`Welcome, ${fullName} 😊❤️`);
        window.location.href = 'dashboard.html'; // Redirect to the dashboard
    } else {
        alert('Incorrect User ID or password. Please try again.');
    }
});