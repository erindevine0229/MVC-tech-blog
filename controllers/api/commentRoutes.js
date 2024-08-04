const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a new comment

router.post('/', withAuth, (req, res) => {
    if(req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err, "An error occurred when trying to add comment.")
            res.status(500).json(err);
        });
    }
});


// Route to delete an existing comment from post

router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if(!dbCommentData) {
            res.status(404).json({ message: "Unable to locate comment with this id" });
            return;
        } else {
            res.json(dbCommentData);
        }
    })
    .catch(err => {
        console.log(err, "An error occurred when trying to delete this comment.");
        res.status(500).json(err);
    });
});

module.exports = router;