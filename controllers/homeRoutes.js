const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// This route will return the homepage which will include all the current blog Posts
router.get('/', (req,res) => {
    Post.findAll({
        attributes: [
            'id',
            'post_title',
            'post_content',
            'created_on',
        ],

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


// This route will return only one post when 
