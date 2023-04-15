async function getUserInfo() {
    const response = await fetch('http://127.0.0.1:5000/api/user/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem('Authorization'),
        },
    });
    if (!response.ok) {
        if (response.status === 401) {
            // alert('Error!')
            window.location.href = 'login.html';
        }
    }
    const json = await response.json();
    console.log(json);

    const html = `<div class="column">
                    <img class="profile-pic" src="banner.jpg" alt="Фото">
                </div>
                <div class="column">
                    <h2>${json.user.username}</h2>
                    <p>User info
                    </p>
                </div>
                <div class="column">
                    <ul>
                    <h2>Статистика</h2>
                    <li>Дата реєстрації: 15-03-2023</li>
                    <li>Кількість нотаток: ${json.user.notes_count}</li>
                    </ul>
                </div>`;

    const USER_INFO = document.getElementById('user-info');
    USER_INFO.innerHTML = html;
}

getUserInfo();
