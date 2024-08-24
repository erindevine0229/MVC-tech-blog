const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Route to rdisplay all posts from the logged in user based on their user id

router.get('/', withAuth, async (req, res) => {

    Post.findAll({

        where: {
            user_id: req.session.user_id
        },

        attributes: ['id', 'post_content', 'post_title'],

        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]

    })
    .then(dbPostData => {
        const allUserPosts = [];
        for (let i = 0; i < dbPostData.length; i++) {
            allUserPosts.push(dbPostData[i].get({ plain: true }));
    }

    res.render('dashboard', {
        allUserPosts, 
        loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
            res.status(500).json(err);
        })
});


module.exports = router;