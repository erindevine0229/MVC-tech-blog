const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// Route to create a new blog post
router.post('/', withAuth, async (req, res) => {
    Post.create({
        title: req.body.post_title,
        post_content: req.body.post_content,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err, "Unable to create new post.")
        res.json(500).json(err);
    });
});


// Route to edit an existing post

router.put('/:id', withAuth, (req, res) => {
    Post.update(req.body,
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: "Unable to locate post associated with this id" });
            return;
        } else {
            res.json(dbPostData);
        }
    })
    .catch(err => {
        console.log(err, "An error occurred when trying to update post.")
        res.json(500).json(err);
    });
});


// Route to delete an existing route

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: "Unable to locate post with specified id" })
            return;
        }
    })
    .catch(err => {
        console.log(err, "An error occurred when tryign to delete this post.");
        res.status(500).json(err);
    });
});