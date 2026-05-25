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

        const endpoint = isLogin ? '/auth/login' : '/auth/register';
        const payload = isLogin ? { email, password } : { email, password, role };

        try {
            submitBtn.textContent = 'Please wait...';
            submitBtn.disabled = true;

            // Connect to actual backend API
            const data = await window.apiFetch(endpoint, {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            console.log("Auth success:", data);
            
            // Redirect based on the authenticated user's role
            const userRole = data.role || role;
            
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
