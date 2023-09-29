// bookRoutes.js

import express from 'express';
import { isAdmin, isCustomer } from '../middleware/authMiddleware';
import { getBooks, getBook, createBook, updateBook, deleteBook } from '../controllers/bookController';

const router = express.Router();

router.get('/', getBooks);
router.get('/', getBook);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;
