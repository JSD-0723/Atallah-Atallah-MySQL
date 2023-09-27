// authMiddleware.js
import { Request, Response, NextFunction } from 'express';

interface User {
    role: string;
}

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    // Check if the user has the 'admin' role.
    if ((req.user as User) && (req.user as User).role === 'admin') {
        return next();
    }
    return res.status(403).json({ message: 'Access denied. You are not an admin.' });
}

const isCustomer = (req: Request, res: Response, next: NextFunction) => {
    // Check if the user has the 'customer' role.
    if ((req.user as User) && (req.user as User).role === 'customer') {
        return next();
    }
    return res.status(403).json({ message: 'Access denied. You are not a customer.' });
};

export { isAdmin, isCustomer };

// // Define an interface for the User model
// interface User {
//     id: number;
//     fullName: string;
//     email: string;
//     password: string;
//     role: 'admin' | 'customer'; // Assuming 'role' can only be 'admin' or 'customer'
// }

// // In your authMiddleware.js file
// import { Request, Response } from 'express';

// const isAdmin = (req: Request, res: Response, next: any) => {
//     // Check if the user has the 'admin' role.
//     const user = req.user as User; // Type assertion to tell TypeScript that req.user is a User
//     if (user && user.role === 'admin') {
//         return next();
//     }
//     return res.status(403).json({ message: 'Access denied. You are not an admin.' });
// }

// const isCustomer = (req: Request, res: Response, next: any) => {
//     // Check if the user has the 'customer' role.
//     const user = req.user as User; // Type assertion to tell TypeScript that req.user is a User
//     if (user && user.role === 'customer') {
//         return next();
//     }
//     return res.status(403).json({ message: 'Access denied. You are not a customer.' });
// };

// export { isAdmin, isCustomer };

