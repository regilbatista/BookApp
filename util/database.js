const  Sequelize  = require('sequelize');

const sequelize = new Sequelize("books", "root", "1234", 
{dialect: "mysql", 
host: "localhost", 
port: 3306});

module.exports = sequelize;