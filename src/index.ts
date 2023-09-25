import express, { Request, Response } from 'express';

const app = express()

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
import books from './routes/bookRoutes';
import customers from './routes/customerRoutes';
import register from './api/register';
import login from './api/login';


// Middleware routes
app.use(register)
app.use(login)
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
