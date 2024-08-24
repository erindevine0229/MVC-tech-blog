async function handleNewPostForm(event) {
    event.preventDefault();

    const postTitle = document.getElementById('add-post-title').value;
    const postContent = document.getElementById('add-post-content').value;

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            postTitle,
            postContent
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.getElementById('add-post-form').addEventListener('submit', handleNewPostForm);