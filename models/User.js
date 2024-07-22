const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

const { Model, DataTypes } = require('sequelize');


class User extends Model {

};


User.init(
    {
        id: {},
        username: {},
        password: {},
        },
        {
            hooks {},
            sequelize,
        }
);



module.exports = User;

