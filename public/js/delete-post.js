async function handleDeletePost(event) {
    event.preventDefault();

    const deletedCommentId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${deletedCommentId}`, {
        method: "DELETE",
        body: JSON.stringify({
            post_id: deletedCommentId
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

document.getElementById('delete-post-button').addEventListener('click', handleDeletePost);