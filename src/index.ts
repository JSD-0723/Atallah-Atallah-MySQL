import express, { Request, Response } from 'express';

const app = express()

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
import books from './routes/bookRoutes';
import customers from './routes/customerRoutes';

// Middleware routes
app.use('/api/books', books);
app.use('/api/customers', customers);

app.use((err: any, req: Request, res: Response, next: any) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
})
