const Sequelize = require('sequelize');

const sequelize = new Sequelize("books", "root", "1234", {
  dialect: "mysql",
  host: "db", // This should match the service name in docker-compose
  port: 3306,
  retry: {
    max: 5, // Maximum number of reconnect attempts
    timeout: 10000, // Retry timeout in milliseconds
  },
});

module.exports = sequelize;
