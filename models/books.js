const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Pokemon = sequelize.define("books", {
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
    imagePath: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    datep: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}); 

module.exports = Pokemon;