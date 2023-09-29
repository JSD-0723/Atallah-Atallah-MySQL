// customerRoutes.js
import express from 'express';
import { isCustomer, isAdmin } from '../middleware/authMiddleware';
import passport from 'passport';
import {
    // createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getRentedBooksByUser
} from '../controllers/userController';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), isAdmin, getUsers);
router.get('/:id', passport.authenticate('jwt', { session: false }), getUser);
// router.post('/', createUser);
router.put('/:id', passport.authenticate('jwt', { session: false }), updateUser);
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteUser);
router.get('/rented/:id', passport.authenticate('jwt', { session: false }), isCustomer, getRentedBooksByUser)

export default router;
