import { Request, Response, NextFunction } from 'express';
import { User } from '../models/userModel';
import asyncWraper from '../middleware/async';
import { createCustomError } from '../errors/custome-error';

interface ExtendedRequest extends Request {
    user?: User;
}

// Get all users from the database
const getUsers = asyncWraper(async (req: Request, res: Response) => {
    const users = await User.findAll();
    console.log("Users Are Fetched");
    res.status(200).json({ success: true, data: users });
});

// Get a single user by ID from the database
const getUser = asyncWraper(async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);

    if (req.user && req.user.id === id) {
        const user = await User.findByPk(id);
        if (user) {
            return res.status(200).json({ success: true, data: user });
        } else {
            return next(createCustomError(`No user with id: ${id} is found`, 404));
        }
    } else {
        return next(createCustomError('Unauthorized', 401));
    }
});

// Create a new user in the database
// const createUser = asyncWraper(async (req: Request, res: Response) => {
//     const { firstName, lastName, email, password } = req.body;
//     const user = await User.create({ firstName, lastName, email, password });
//     console.log('Created users: ', user?.firstName);
//     res.status(201).json({ success: true, data: user });
// });

// Update a user by ID in the database
const updateUser = asyncWraper(async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);

    // Check if the user is updating their own profile
    if (req.user && req.user.id === id) {
        const { firstName, lastName, email, password, role } = req.body;
        const [updatedRowCount] = await User.update(
            { firstName, lastName, email, password, role },
            { where: { id } }
        );

        console.log('Updated Row Count: ', updatedRowCount);

        if (updatedRowCount === 0) {
            return next(createCustomError(`No user with id: ${id} is found`, 404));
        }

        const updatedUser = await User.findByPk(id);
        console.log('Updated users: ', updatedUser?.firstName);
        res.status(200).json({ success: true, data: updatedUser });
    } else {
        return next(createCustomError('Unauthorized', 401));
    }
});

// Delete a user by ID from the database
const deleteUser = asyncWraper(async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);

    // Check if the user is deleting their own profile
    if (req.user && req.user.id === id) {
        const deletedRowCount = await User.destroy({ where: { id } });

        if (deletedRowCount === 0) {
            return next(createCustomError(`No user with id: ${id} is found`, 404));
        }

        console.log('Deleted User : ', deletedRowCount);
        res.status(200).json({ success: true, msg: 'User deleted successfully' });
    } else {
        return next(createCustomError('Unauthorized', 401));
    }
});

// Get all books rented by a user from the database
const getRentedBooksByUser = asyncWraper(async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const userId = Number(req.params.id);

    // Check if the user is fetching their own rented books
    if (req.user && req.user.id === userId) {
        const user = await User.findByPk(userId);

        if (!user) {
            return next(createCustomError(`No user with id: ${userId} is found`, 404));
        }

        const books = await user.getBooks();
        return res.json({ userId, books });
    } else {
        return next(createCustomError('Unauthorized', 401));
    }
});



export {
    // createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getRentedBooksByUser
};
