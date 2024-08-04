const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// This route will return the homepage which will include all the current blog Posts
router.get('/', (req,res) => {
    Post.findAll({
        attributes: ['id', 'post_title', 'post_content', 'created_on'],

        order: [[ 'created_at', 'DESC']],

        include: [
            {
                model: User,
                attributes: ['username']
            },

            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_on'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]

})

.then(dbPostData => {
    const allPosts = [];
    for (let i = 0; i < dbPostData.length; i++) {
        Allposts.push(dbPostData[i].get({ plain: true }));
}

res.render('homepage', {
    allPosts, 
    loggedIn: req.session.loggedIn
    });
})

.catch(err => {
    console.log(err);
        res.status(500).json(err);
    });
});


// This route will return only one post when selected based on id of that particular post

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },

        attributes: ['id', 'post_content', 'post_title', 'created_on'],

        include: [
            {
                model: User,
                attributes: ['username'],
                include: {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_on'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                
                }
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: "Unable to locate a post with specified id"});
            return;
        }

        const selectedPostData = dbPostData.get({ plain: true });

        res.render('blogpost', {
            selectedPostData,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err, "An error occurred when trying to load blog post.");
        res.status(500).json(err);
        });

});


// Renders the login handlebars page

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    } else {
        res.render('login')
    }
});


// Renders the signup handlebars page

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    } else {
        res.render('signup');
    }
});



module.exports = router;