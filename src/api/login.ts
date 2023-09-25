import express, { Request, Response } from 'express';
import User from '../models/customerModel'; // Import your Sequelize model
import jwt from 'jsonwebtoken';

// For JWT
import process from 'process';
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];

type UserInstance = {
    id: number;
    fullName: string;
    email: string;
    password: string;
};

const router = express.Router();

router.post('/api/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userEmail = await User.findOne({ where: { email } }).catch((err: Error) => {
        console.log('Error: ', err);
    });

    if (!userEmail) {
        return res.json({ message: 'Email or password does not match!' });
    }

    // Cast userEmail to any first, and then to UserInstance
    const user = userEmail as any as UserInstance;

    if (user.password !== password) {
        return res.json({ message: 'Email or password does not match!' });
    }

    const jwToken = jwt.sign({ id: user.id, email: user.email }, config.jwt_secret)

    res.json({ message: 'Welcome Back!', toke: jwToken })
});
export default router;
