import { DataTypes } from 'sequelize';
import sequelize from './connection';
import Customer from './customerModel'

const Book = sequelize.define('book', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(50),
        unique: true,
    },
    isbn: {
        type: DataTypes.STRING(55),
        unique: true,
        allowNull: false,
    },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Customer, // Reference the Managers model
            key: 'id', // Reference the ID column in Managers
        },
    }
}, {
    freezeTableName: true,
    timestamps: false,
});

Customer.hasMany(Book, {
    foreignKey: 'customerId',
})

export default Book;
