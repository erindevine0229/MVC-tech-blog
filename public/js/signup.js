const handleSignup = async (event) => {
    event.preventDefault();

    const username = document.getElementById('signup-username');
    const password = document.getElementById('signup-password');

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });

        if(response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText)
        }
    }
};

document.querySelector('.user-signup-form').addEventListener('submit', handleSignup);