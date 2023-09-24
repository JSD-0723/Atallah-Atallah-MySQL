import { Request, Response } from 'express';
import BooksModel from '../models/booksModel';
// Get all books from the database
const getBooks = async (req: Request, res: Response) => {
    try {
        const books = await BooksModel.findAll();
        res.status(200).json({ success: true, data: books });
    } catch (error) {
        console.error('Error getting books:', error);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

// Get a single book by ID from the database
const getBook = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const book = await BooksModel.findByPk(id);
        if (!book) {
            return res.status(404).json({ success: false, msg: `No book with id: ${id} is found` });
        }
        res.status(200).json({ success: true, data: book });
    } catch (error) {
        console.error('Error getting book by ID:', error);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

// Create a new book in the database
const createBook = async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
        const book = await BooksModel.create({ name });
        res.status(201).json({ success: true, data: book });
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

// Update a book by ID in the database
const updateBook = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name } = req.body;
    try {
        const [updatedRowCount] = await BooksModel.update({ name }, { where: { id } });
        if (updatedRowCount === 0) {
            return res.status(404).json({ success: false, msg: `No book with id: ${id} is found` });
        }
        const updatedBook = await BooksModel.findByPk(id);
        res.status(200).json({ success: true, data: updatedBook });
    } catch (error) {
        console.error('Error updating book by ID:', error);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

// Delete a book by ID from the database
const deleteBook = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const deletedRowCount = await BooksModel.destroy({ where: { id } });
        if (deletedRowCount === 0) {
            return res.status(404).json({ success: false, msg: `No book with id: ${id} is found` });
        }
        res.status(200).json({ success: true, msg: 'Book deleted successfully' });
    } catch (error) {
        console.error('Error deleting book by ID:', error);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

export {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
};
