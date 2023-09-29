import { Request, Response } from 'express';
import { User } from '../models/userModel';
import Book from '../models/bookModel';
import asyncWrqper from '../middleware/async';
import { createCustomError } from '../errors/custome-error';

// Get all users from the database
const getUsers = asyncWrqper(async (req: Request, res: Response) => {
    const users = await User.findAll();
    console.log("Users Are Fetched");
    res.status(200).json({ success: true, data: users });
});

// Get a single user by ID from the database
const getUser = asyncWrqper(async (req: Request, res: Response, next: any) => {
    const id = Number(req.params.id);
    const user = await User.findByPk(id);
    console.log("User: ", user?.firstName);
    if (!user) {
        return next(createCustomError(`No user with id: ${id} is found`, 404))
    }
    res.status(200).json({ success: true, data: user });
});

// Create a new user in the database
const createUser = asyncWrqper(async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    const user = await User.create({ firstName, lastName, email, password });
    console.log('Created users: ', user?.firstName);
    res.status(201).json({ success: true, data: user });
});

// Update a user by ID in the database
const updateUser = asyncWrqper(async (req: Request, res: Response, next: any) => {
    const id = Number(req.params.id);
    const { firstName, lastName, email, password, role } = req.body;
    const [updatedRowCount] = await User.update({ firstName, lastName, email, password, role }, { where: { id } });
    console.log('Updated Row Count: ', updatedRowCount);
    if (updatedRowCount === 0) {
        return next(createCustomError(`No user with id: ${id} is found`, 404))
    }
    const updatedUser = await User.findByPk(id);
    console.log('Updated users: ', updatedUser?.firstName);
    res.status(200).json({ success: true, data: updatedUser });
});

// Delete a user by ID from the database
const deleteUser = asyncWrqper(async (req: Request, res: Response, next: any) => {
    const id = Number(req.params.id);
    const deletedRowCount = await User.destroy({ where: { id } });
    if (deletedRowCount === 0) {
        return next(createCustomError(`No user with id: ${id} is found`, 404))
    }
    console.log('Deleted User : ', deletedRowCount);
    res.status(200).json({ success: true, msg: 'User deleted successfully' });
});

// Get all books rented by a user from the database
const getRentedBooksByUser = asyncWrqper(async (req: Request, res: Response, next: any) => {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
        return next(createCustomError(`No user with id: ${userId} is found`, 404))
    }

    // const books = await user.getBooks();
    const books = await Book.findAll({ where: { userId, rented: true } });
    return res.json({ userId, books });
});


export {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getRentedBooksByUser
};
