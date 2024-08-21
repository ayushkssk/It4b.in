// Signup Logic
document.getElementById('signupForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const emailID = document.getElementById('emailID').value;
    const password = document.getElementById('password').value;

    // Storing user data in localStorage
    const userDetails = {
        firstName,
        lastName,
        mobileNumber,
        emailID,
        password
    };
    localStorage.setItem('userDetails', JSON.stringify(userDetails));

    // Alert and redirect to login page
    alert('Signup successful! You can now login.');
    window.location.href = 'login.html';
});



// Other existing JavaScript logic...


// Login Logic
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    const errorMessage = document.getElementById('errorMessage');

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
        sessionStorage.setItem('loggedIn', true);
        alert('Login successful!');
        window.location.href = 'dashboard.html';
    } else {
        // Show error message
        errorMessage.textContent = 'Wrong user ID or password. Please try again.';
    }
});

// Handle Google Login
function handleCredentialResponse(response) {
    // Decode the JWT token
    const userObject = jwt_decode(response.credential);

    // Assuming you want to store the user's email as the username
    const email = userObject.email;

    // You can also store the name or other details as needed
    const name = userObject.name;

    // Store the user info in localStorage or sessionStorage
    localStorage.setItem('username', email);
    sessionStorage.setItem('loggedIn', true);

    alert('Login with Google successful!');
    window.location.href = 'dashboard.html';
}

// Dashboard Logic
if (window.location.pathname.includes('dashboard.html')) {
    if (!sessionStorage.getItem('loggedIn')) {
        alert('You must be logged in to view this page');
        window.location.href = 'login.html';
    }
}

// Logout Logic
document.getElementById('logout')?.addEventListener('click', function () {
    sessionStorage.removeItem('loggedIn');
    alert('Logged out successfully');
    window.location.href = 'login.html';
});

// Export Credentials to Excel Logic
document.getElementById('export')?.addEventListener('click', function () {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    if (username && password) {
        // Data to be exported
        const data = [
            ['Username', 'Password'],
            [username, password]
        ];

        // Create a new workbook and worksheet
        const worksheet = XLSX.utils.aoa_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Credentials');

        // Generate and download the Excel file
        XLSX.writeFile(workbook, 'user_credentials.xlsx');
    } else {
        alert('No credentials found to export.');
    }
});