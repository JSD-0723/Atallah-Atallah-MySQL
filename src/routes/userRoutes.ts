// customerRoutes.js
import express from 'express';
import { isCustomer, isAdmin } from '../middleware/authMiddleware';
import passport from 'passport';
import {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
} from '../controllers/userController';

const router = express.Router();

router.get('/', /* passport.authenticate('jwt', { session: false }), isCustomer,*/ getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
