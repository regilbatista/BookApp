const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Region = sequelize.define("editorials", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },   
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
    },  
    country: {
        type: Sequelize.STRING,
        allowNull: false,
    },    
}); 

module.exports = Region;