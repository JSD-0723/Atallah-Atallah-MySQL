// customerRoutes.js
import express from 'express';
import { isCustomer, isAdmin } from '../middleware/authMiddleware';
import passport from 'passport';
import { getCustomers, createCustomer, getCustomer, updateCustomer, deleteCustomer } from '../controllers/customerController';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), isCustomer, getCustomers);
router.post('/', isCustomer, createCustomer);
router.get('/:id', isCustomer, getCustomer);
router.put('/:id', isCustomer, updateCustomer);
router.delete('/:id', isCustomer, deleteCustomer);

export default router;
