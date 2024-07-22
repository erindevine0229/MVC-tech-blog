const Sequelize = require('sequelize');
require ('dotenv').config();

let sequelize;

sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB-isStrongPassword,
    {
        host: 'localhost',
        dialect: 'postgres',
        port: PORT,
      }
);




module.exports = sequelize;
