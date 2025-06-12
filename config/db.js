require('dotenv').config();
const { Sequelize } = require('sequelize');



const myDB = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false 
    }
);

myDB.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.error(' Database connection error:', err));


module.exports = myDB;
