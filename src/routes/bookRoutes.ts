// bookRoutes.js

import express from 'express';
import { isAdmin, isCustomer } from '../middleware/authMiddleware';
import { getBooks, getBook, createBook, updateBook, deleteBook, rentBook } from '../controllers/bookController';

const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBook);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);
router.post('/rent/:bookId/:userId', rentBook);

export default router;
