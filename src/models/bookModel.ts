import { DataTypes, Model } from 'sequelize';
import sequelize from './connection';
import { User } from './userModel';

class Book extends Model {
    declare id: number;
    public name!: string;
    public isbn!: string;
    public userId!: number | null;
}

Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
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
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: User,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'Book',
        freezeTableName: true,
        timestamps: false,
    }
);

User.hasMany(Book, {
    foreignKey: 'userId',
    as: 'books',
});

Book.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

export default Book;