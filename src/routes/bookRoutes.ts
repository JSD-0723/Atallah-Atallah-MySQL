// bookRoutes.js

import express from 'express';
import { isAdmin, isCustomer } from '../middleware/authMiddleware';
import { getBooks, getBook, createBook, updateBook, deleteBook } from '../controllers/bookController';

const router = express.Router();

router.get('/', isCustomer, getBooks);
router.get('/', isCustomer, getBook);
router.post('/', isAdmin, createBook);
router.put('/:id', isAdmin, updateBook);
router.delete('/:id', isAdmin, deleteBook);

export default router;
