import { DataTypes, Model } from 'sequelize';
import sequelize from './connection';
import { User } from './userModel';

class Book extends Model {
    declare id: number;
    declare name: string;
    declare isbn: string;
    declare userId: number | null;
    declare rented: boolean;
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
        rented: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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

// User.hasMany(Book, {
//     foreignKey: 'userId',
//     as: 'book',
// });

// Book.belongsTo(User, {
//     foreignKey: 'userId',
//     as: 'user',
// });

// Hook
// User.beforeDestroy(async (user, options) => {
//     console.log('Before destroy hook triggered for user ID:', user.id);
//     try {
//         const books = await Book.findAll({
//             where: {
//                 userId: user.id,
//             },
//         });
//         console.log('Found books:', books);

//         await Promise.all(books.map(book => {
//             console.log('Updating book:', book.id);
//             return book.update({ rented: false, userId: null });
//         }));
//     } catch (error) {
//         console.error('Error updating rented status:', error);
//         throw error;
//     }
// });


export default Book;