// bookRoutes.js

import express from 'express';
import { isAdmin, isCustomer } from '../middleware/authMiddleware';
import { getBooks, getBook, createBook, updateBook, deleteBook, rentBook } from '../controllers/bookController';
import passport from 'passport';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), getBooks);
router.get('/:id', passport.authenticate('jwt', { session: false }), getBook);
router.post('/', passport.authenticate('jwt', { session: false }), isAdmin, createBook);
router.put('/:id', passport.authenticate('jwt', { session: false }), isAdmin, updateBook);
router.delete('/:id', passport.authenticate('jwt', { session: false }), isAdmin, deleteBook);
router.post('/rent/:bookId/:userId', passport.authenticate('jwt', { session: false }), isCustomer, rentBook);

export default router;
