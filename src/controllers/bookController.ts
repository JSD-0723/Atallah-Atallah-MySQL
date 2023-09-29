import { Request, Response, NextFunction } from 'express';
import Books from '../models/bookModel';
import asyncWrqper from '../middleware/async';
import { createCustomError } from '../errors/custome-error';

// Get all books from the database
const getBooks = asyncWrqper(async (req: Request, res: Response) => {
    const books = await Books.findAll();
    console.log('Books Are Fetched');
    res.status(200).json({ success: true, data: books });
});

// Get a single book by ID from the database
const getBook = asyncWrqper(async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const book = await Books.findByPk(id);
    console.log('Book:', book?.name);
    if (!book) {
        return next(createCustomError(`No book with id: ${id} is found`, 404))
    }
    res.status(200).json({ success: true, data: book });
});

// Create a new book in the database
const createBook = asyncWrqper(async (req: Request, res: Response) => {
    const { name, isbn, userId } = req.body;
    const book = await Books.create({ name, isbn, userId });
    console.log('Created Book:', book?.name);
    res.status(201).json({ success: true, data: book });
});

// Update a book by ID in the database
const updateBook = asyncWrqper(async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const { name, isbn, userId } = req.body;
    const [updatedRowCount] = await Books.update({ name, isbn, userId }, { where: { id } });
    console.log('Updated Row Count:', updatedRowCount);
    if (updatedRowCount === 0) {
        return next(createCustomError(`No book with id: ${id} is found`, 404))
    }
    const updatedBook = await Books.findByPk(id);
    console.log('Updated Book:', updatedBook?.name);

    res.status(200).json({ success: true, data: updatedBook });
});

// Delete a book by ID from the database
const deleteBook = asyncWrqper(async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const deletedRowCount = await Books.destroy({ where: { id } });
    if (deletedRowCount === 0) {
        return next(createCustomError(`No book with id: ${id} is found`, 404))
    }
    console.log('Deleted Book:', deletedRowCount);
    res.status(200).json({ success: true, msg: 'Book deleted successfully' });
});

const rentBook = asyncWrqper(async (req: Request, res: Response, next: NextFunction) => {
    const bookId = Number(req.params.bookId);
    const userId = Number(req.params.userId);

    const book = await Books.findByPk(bookId);
    console.log('Book:', book?.name);

    if (!book) {
        return next(createCustomError(`No book with id: ${bookId} is found`, 404))
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
});


export {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
    rentBook
};
