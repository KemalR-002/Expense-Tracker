//Script for registering account, save user data locally
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById
        ('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        // Saving user data in local storage (for demo purposes only)
        localStorage.setItem('registeredUsername', username);
        localStorage.setItem('registeredEmail', email);
        localStorage.setItem('registeredPassword', password);

        alert('Registration successful! You can now log in.');
        // Redirect to login page
        window.location.href = 'login-page.html';
    });
}

//Script for logging in, check user data locally
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {                                      
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        // User authentication, check account from local storage (for demo purposes only)
        const registeredUsername = localStorage.getItem('registeredUsername');
        const registeredPassword = localStorage.getItem('registeredPassword');
        if (username === registeredUsername && password === registeredPassword) {
            alert('Login successful! Welcome back, ' + username + '!');
            // Redirect to dashboard page
            window.location.href = 'index.html';
        } else {
            alert('Invalid username or password!');
        }                                           
    });
}

//Script for changing welcome text on dashboard
const welcomeText = document.getElementById('welcomeText');
if (welcomeText) {
    const registeredUsername = localStorage.getItem('registeredUsername');
    if (registeredUsername) {
        welcomeText.textContent = 'Welcome back, ' + registeredUsername + '!';
    }  
}