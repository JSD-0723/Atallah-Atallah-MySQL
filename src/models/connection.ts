import { Sequelize, DataTypes, Model } from 'sequelize';
import process from 'process';

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];

let sequelize: Sequelize;


    sequelize = new Sequelize(config.database, config.username, config.password, config);

export default sequelize
