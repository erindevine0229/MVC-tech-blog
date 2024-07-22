const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Post extends Model {};

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        {
            post_title: DataTypes.STRING,
            allowNull: false,
        },

        {
            post_content: DataTypes.STRING,
            allowNull: false,
        },
    },
);


module.exports = Post;