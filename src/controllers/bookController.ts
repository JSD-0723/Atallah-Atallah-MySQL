import { Request, Response } from 'express';
import Books from '../models/bookModel';

// Get all books from the database
const getBooks = async (req: Request, res: Response) => {
    try {
        const books = await Books.findAll();
        console.log('Books: ', books);
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
        const book = await Books.findByPk(id);
        console.log('Book:', book?.name);
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
    const { name, isbn, userId } = req.body;
    try {
        const book = await Books.create({ name, isbn, userId });
        console.log('Created Book:', book?.name);
        res.status(201).json({ success: true, data: book });
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

// Update a book by ID in the database
const updateBook = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name, isbn, userId } = req.body;
    try {
        const [updatedRowCount] = await Books.update({ name, isbn, userId }, { where: { id } });
        console.log('Updated Row Count:', updatedRowCount);
        if (updatedRowCount === 0) {
            return res.status(404).json({ success: false, msg: `No book with id: ${id} is found` });
        }
        const updatedBook = await Books.findByPk(id);
        console.log('Updated Book:', updatedBook?.name);

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
        const deletedRowCount = await Books.destroy({ where: { id } });
        if (deletedRowCount === 0) {
            return res.status(404).json({ success: false, msg: `No book with id: ${id} is found` });
        }
        console.log('Deleted Book:', deletedRowCount);
        res.status(200).json({ success: true, msg: 'Book deleted successfully' });
    } catch (error) {
        console.error('Error deleting book by ID:', error);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

const rentBook = async (req: Request, res: Response) => {
    try {
        const bookId = Number(req.params.bookId);
        const userId = Number(req.params.userId);

        const book = await Books.findByPk(bookId);
        console.log('Book:', book?.name);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (book.rented) {
            return res.status(400).json({ message: 'Book is already rented' });
        }

        // Update book details to mark it as rented
        await book.update({
            userId, // ID of the customer who is renting the book
            rented: true,
        });

        res.json({ message: 'Book rented successfully', book });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
    rentBook
};
