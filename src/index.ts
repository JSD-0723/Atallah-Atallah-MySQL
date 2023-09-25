import express, { Request, Response } from 'express';
// Auth
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv'; // Use 'dotenv' instead of 'require'
import passport from 'passport';
import './auth/passport'; // Import and execute your passport configuration

dotenv.config(); // Call 'config()' method from 'dotenv'

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('dev'));
app.use(helmet()); // Call 'helmet' as a function to enable the middleware
app.use(cors());

// Routes
import books from './routes/bookRoutes';
import customers from './routes/customerRoutes';
import register from './api/register';
import login from './api/login';

// Middleware routes
app.use(register);
app.use(login);
app.use('/api/books', passport.authenticate('jwt', { session: false }), books);
app.use('/api/customers', customers);

app.use((err: any, req: Request, res: Response, next: any) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});
