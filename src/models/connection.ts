import { Sequelize, DataTypes, Model } from 'sequelize';
import process from 'process';

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];

let sequelize: Sequelize;

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable]!, config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        dialect: config.dialect,
    });
}

sequelize
    .sync({ force: false })
    .then(() => {
        sequelize.authenticate()
            .then(() => {
                console.log('Database connection has been established successfully.');
            })
            .catch((error: any) => {
                console.error('Unable to authenticate with the database:', error);
            });
    })
    .catch((error: any) => {
        console.error('Unable to synchronize the database:', error);
    });

export default sequelize
