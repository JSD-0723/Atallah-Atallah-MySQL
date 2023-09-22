import { DataTypes, Model, Sequelize } from 'sequelize';
const sequelize = require('../database/connection')

const BooksModel = sequelize.define('booksModel', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING(50),
}, {
    freezeTableName: true,
    timestamps: false,
});

module.exports = BooksModel;
