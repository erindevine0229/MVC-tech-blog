const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

try {
  sequelize = process.env.DB_URL 
    ? new Sequelize(process.env.DB_URL, { dialect: 'postgres' }) 
    : new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
          host: 'localhost',
          dialect: 'postgres',
        }
      );

  console.log("DB Connected ....");
} catch (error) {
  console.log("Err: ", error);
}

module.exports = sequelize;
