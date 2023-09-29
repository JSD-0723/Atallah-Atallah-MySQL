import { Request, Response } from 'express';
import { User } from '../models/userModel';
import Book from '../models/bookModel';

// Get all users from the database
const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        console.log("User: ", users);
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

// Get a single user by ID from the database
const getUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const user = await User.findByPk(id);
        console.log("User: ", user?.firstName);
        if (!user) {
            return res.status(404).json({ success: false, msg: `No user with id: ${id} is found` });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error('Error getting user by ID:', error);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

// Create a new user in the database
const createUser = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const user = await User.create({ firstName, lastName, email, password });
        console.log('Created users: ', user?.firstName);
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

// Update a user by ID in the database
const updateUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { firstName, lastName, email, password, role } = req.body;
    try {
        const [updatedRowCount] = await User.update({ firstName, lastName, email, password, role }, { where: { id } });
        console.log('Updated Row Count: ', updatedRowCount);
        if (updatedRowCount === 0) {
            return res.status(404).json({ success: false, msg: `No user with id: ${id} is found` });
        }
        const updatedUser = await User.findByPk(id);
        console.log('Updated users: ', updatedUser?.firstName);
        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        console.error('Error updating user by ID:', error);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

// Delete a user by ID from the database
const deleteUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const deletedRowCount = await User.destroy({ where: { id } });
        if (deletedRowCount === 0) {
            return res.status(404).json({ success: false, msg: `No user with id: ${id} is found` });
        }
        console.log('Deleted User : ', deletedRowCount);
        res.status(200).json({ success: true, msg: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user by ID:', error);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

// Get all books rented by a user from the database
const getRentedBooksByUser = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // const books = await user.getBooks();
        const books = await Book.findAll({ where: { userId, rented: true } });

        return res.json({ userId, books });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


export {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getRentedBooksByUser
};
