import { DataTypes } from 'sequelize';
import sequelize from './connection';

const userModel = sequelize.define('user', {
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
    password: {
        type: DataTypes.STRING(50),
        allowNull: false,
    }
}, {
    freezeTableName: true,
    timestamps: false,
});

export default userModel;
