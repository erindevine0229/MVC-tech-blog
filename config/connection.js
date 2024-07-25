const Sequelize = require('sequelize');
require ('dotenv').config();

let sequelize;

sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'postgres',
        port: 3456,
      }
);




module.exports = sequelize;
