const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const loan = sequelize.define("loan", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    id_books: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },   
    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },  
    date_loan: {
        type: Sequelize.DATE,
        allowNull: false,
    },    
    date_ToDev: {
        type: Sequelize.DATE,
        allowNull: false,
    }, 
    date_devolution: {
        type: Sequelize.DATE,
        allowNull: true,
    },    
}); 

module.exports = loan;