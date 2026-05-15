document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('auth-form');
    const toggleLink = document.getElementById('toggle-link');
    const formTitle = document.getElementById('form-title');
    const roleGroup = document.getElementById('role-group');
    const toggleText = document.getElementById('toggle-text');
    const submitBtn = document.getElementById('submit-btn');
    const errorMessage = document.getElementById('error-message');
    
    let isLogin = true;

    if (!authForm) return;

    toggleLink.addEventListener('click', () => {
        isLogin = !isLogin;
        
        if (isLogin) {
            formTitle.textContent = 'Welcome Back';
            document.getElementById('role-label').textContent = 'Login As';
            toggleText.textContent = "Don't have an account? ";
            toggleLink.textContent = 'Register here';
            submitBtn.textContent = 'Login';
        } else {
            formTitle.textContent = 'Create an Account';
            document.getElementById('role-label').textContent = 'Register As';
            toggleText.textContent = "Already have an account? ";
            toggleLink.textContent = 'Login here';
            submitBtn.textContent = 'Register';
        }
        errorMessage.style.display = 'none';
    });

    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
        const payload = isLogin ? { email, password } : { email, password, role };

        try {
            submitBtn.textContent = 'Please wait...';
            submitBtn.disabled = true;

            // Adjust URL for local testing without server, or connect to actual backend
            // const response = await fetch(`http://localhost:5000${endpoint}`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(payload)
            // });

            // const data = await response.json();

            // if (!response.ok) {
            //     throw new Error(data.message || 'Authentication failed');
            // }

            // Mock successful login for frontend demonstration
            console.log("Mocking successful auth request:", payload);
            
            // Redirect based on selected role
            const userRole = role;
            
            if (userRole === 'admin') {
                window.location.href = 'tpo-dashboard.html';
            } else if (userRole === 'student') {
                window.location.href = 'student-dashboard.html';
            } else {
                window.location.href = 'company-dashboard.html';
            }

        } catch (error) {
            errorMessage.textContent = error.message;
            errorMessage.style.display = 'block';
        } finally {
            submitBtn.textContent = isLogin ? 'Login' : 'Register';
            submitBtn.disabled = false;
        }
    });
});
