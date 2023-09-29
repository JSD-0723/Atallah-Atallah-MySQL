import express, { Request, Response } from 'express';
import {User, UserAttributes} from '../models/userModel'; // Import your Sequelize model
import jwt from 'jsonwebtoken';

// For JWT
import process from 'process';
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];

const router = express.Router();

router.post('/api/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        console.log('Received email:', email);
        console.log('Received password:', password);

        const userEmail = await User.findOne({ where: { email } });

        if (!userEmail) {
            return res.json({ message: 'Email or password does not match!' });
        }

        const user = userEmail as any as UserAttributes;

        if (user.password !== password) {
            return res.json({ message: 'Email or password does not match!' });
        }

        const jwToken = jwt.sign({ id: user.id, email: user.email }, config.jwt_secret);

        res.json({ message: `Welcome Back! ${user.firstName}`, token: jwToken });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;