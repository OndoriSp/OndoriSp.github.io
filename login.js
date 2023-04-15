document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('confirm-login-btn');
    async function loginUser() {
        const formData = new FormData(document.getElementById('login-form'));
        const data = Object.fromEntries(formData);

        const response = await fetch(
            'http://127.0.0.1:5000/api/user/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            },
        );
        if (!response.ok) {
            alert('Login failed!');
        }
        const json = await response.json();
        console.log(json.token);
        sessionStorage.setItem('Authorization', `Bearer ${json.token}`);
        window.location.href = 'user_info.html';
    }
    loginButton.addEventListener('click', loginUser);
});
