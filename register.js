document.addEventListener('DOMContentLoaded', () => {
    const confirmRegisterBtn = document.getElementById('confirm-register-btn');

    async function createUser() {
        const formData = new FormData(document.getElementById('registration-form'));
        const data = Object.fromEntries(formData);
        if (data.password !== data.confirmpassword) {
            alert('Passwords are different!');
        } else {
            delete data.confirmpassword;
            const response = await fetch(
                'http://127.0.0.1:5000/api/user/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                },
            );
            if (!response.ok) {
                alert('Register failed!');
            } else {
                window.location.href = 'user_info.html';
            }
        }
    }

    confirmRegisterBtn.addEventListener('click', createUser);
});
