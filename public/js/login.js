const handleUserLogin = async (event) => {
    event.preventDefault();

    const username = document.getElementById('login-username');
    const password = document.getElementById('login-password');

    if (username && password) {
        const response = await fetch ('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.user-login-form').addEventListener('submit', handleUserLogin);