const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Type = sequelize.define("writers", {
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
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },   
}); 

module.exports = Type;