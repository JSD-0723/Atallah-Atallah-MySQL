import express from 'express';
const router = express.Router();

const {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
} = require('../controllers/bookController')

router.get('/', getBooks)
router.get('/:id', getBook)
router.post('/', createBook)
router.put('/:id', updateBook)
router.delete('/:id', deleteBook)

export default router