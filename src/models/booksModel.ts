import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from './connection';

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

export default BooksModel;
