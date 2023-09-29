import { DataTypes, Model } from 'sequelize';
import sequelize from './connection';

class User extends Model {
    declare id: number;
    declare firstName: string;
    declare lastName: string;
    declare email: string;
    declare password: string;
    declare role: 'admin' | 'customer';

    public getFullName(): string {
        return `${this.getDataValue('firstName')} ${this.getDataValue('lastName')}`;
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('admin', 'customer'),
        },
        fullName: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.getDataValue('firstName')} ${this.getDataValue('lastName')}`;
            },
        },
    },
    {
        sequelize,
        modelName: 'User',
        freezeTableName: true,
        timestamps: false,
    }
);

type UserAttributes = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'admin' | 'customer';
};

export { User, UserAttributes };




// Instance of User
// (async () => {
//     // Sync the model with the database
//     await User.sync();

//     // Create a new user
//     const newUser = await User.create({
//         firstName: 'John',
//         lastName: 'Doe',
//         email: 's@example.com',
//         password: 'password',
//         role: 'admin',
//     });

//     // Access the fullName getter
//     console.log(newUser.getFullName()); // Output: "John Doe"
// })();

// class User extends Model {
//     declare id: number;
//     public firstName!: string;
//     public lastName!: string;
//     public email!: string;
//     public password!: string;
//     public role!: 'admin' | 'customer';

//     public getFullName(): string {
//         return `${this.getDataValue('firstName')} ${this.getDataValue('lastName')}`;
//     }

//     toJSON(): any {
//         const json = super.toJSON();
//         json.fullName = this.getFullName();
//         return json;
//     }
// }
