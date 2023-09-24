import { DataTypes } from 'sequelize';
import sequelize from './connection';

const BookModel = sequelize.define('bookModel', {
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

export default BookModel;
