import { DataTypes } from 'sequelize';
import sequelize from './connection';

const userModel = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    fullName: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'customer'),
        // defaultValue: 'customer',
    },
}, {
    freezeTableName: true,
    timestamps: false,
});

export default userModel;
