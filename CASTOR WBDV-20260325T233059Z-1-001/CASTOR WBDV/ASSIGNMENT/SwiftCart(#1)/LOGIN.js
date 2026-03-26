document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register-toggle');
    
    // Select login elements
    const loginEmail = document.getElementById('login-email');
    const loginPass = document.getElementById('login-pass');
    const loginBtn = document.getElementById('login-btn');

    // 1. Toggle between Sign In and Sign Up
    if (registerBtn) {
        registerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            container.classList.add("active");
        });
    }

    // 2. "Fill up first" Logic
    function validateLogin() {
        const emailValue = loginEmail.value.trim();
        const passValue = loginPass.value.trim();

        // Check if both fields are filled
        if (emailValue !== "" && passValue !== "") {
            loginBtn.disabled = false;
            loginBtn.style.opacity = "1";
            loginBtn.style.cursor = "pointer";
        } else {
            loginBtn.disabled = true;
            loginBtn.style.opacity = "0.5";
            loginBtn.style.cursor = "not-allowed";
        }
    }

    // Listen for every keystroke in both fields
    if (loginEmail && loginPass) {
        loginEmail.addEventListener('input', validateLogin);
        loginPass.addEventListener('input', validateLogin);
    }
});
