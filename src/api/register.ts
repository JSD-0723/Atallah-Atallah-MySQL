import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
const router = express.Router();

import User from '../models/customerModel';

router.post('/api/register', async (req: Request, res: Response) => {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password || !role) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const alreadyExistsUser = await User.findOne({ where: { email } }).catch((err: Error) => {
        console.log('Error:', err);
    });

    if (alreadyExistsUser) {
        return res.json({ message: 'User with email already exists!' });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ fullName, email, password /* : hashedPassword */, role });
    const savedUser = await newUser.save().catch((err: Error) => {
        console.log('Error: ', err)
        res.json({ error: "Can't register user at the moment" })
    })

    if (savedUser) {
        res.json({ message: 'Thanks for registering' })
    }
});

export default router;
