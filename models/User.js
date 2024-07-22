const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

const { Model, DataTypes } = require('sequelize');


class User extends Model {

};


User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1],
            }
        },
    },

     {
            hooks {},
            sequelize,
        }
);



module.exports = User;

