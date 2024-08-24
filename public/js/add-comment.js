async function handleAddComment(event) {
    event.preventDefault();

    const commentContent = document.getElementById('new-comment-content').value.trim();

    const newCommentId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (commentContent) {
        const response = await fetch('api/comments', {
            method: "POST",
            body: JSON.stringify({
                newCommentId,
                commentContent
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.getElementById('add-comment-form').addEventListener('submit', handleAddComment);