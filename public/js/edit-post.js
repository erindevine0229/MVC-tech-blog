async function handleEditPostForm(event) {
    event.preventDefault();

    const postTitle = document.getElementById('edit-post-title').value;
    const postContent = document.getElementById('edit-post-content').value;
    
    const editPostId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${editPostId}`, {
        method: "POST",
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

document.getElementById('edit-post-form').addEventListener('submit', handleEditPostForm);