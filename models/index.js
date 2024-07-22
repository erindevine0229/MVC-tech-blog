// Require in the various Models for reference
const User = require('./User.js');
const Post = require('./Post.js');
const Comment = require('./Comment.js');


// Create associations where each user can have many post and many comments but each post has only one user (author). Each post can have many comments and each comment can belong to only one main post (main)
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});


// Export the model relationships 
module.exports = { User, Post, Comment };