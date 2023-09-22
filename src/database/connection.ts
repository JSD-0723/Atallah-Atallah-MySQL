import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('booksdb2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    // operatorAliases: false
});

module.exports = sequelize;
