const dotenv = require('dotenv');
const { Sequelize, DataTypes } = require('sequelize');

dotenv.config({ path: './config.env' });

//Establish db connection

const db = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB,
  logging: false,
});

module.exports = { db, DataTypes };
