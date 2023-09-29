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
import users from './routes/userRoutes';
import register from './api/register';
import login from './api/login';
import notFound from './middleware/not-Found';
import errorHandler from './middleware/error-Handler';

// Middleware routes
app.use(register);
app.use(login);
app.use('/api/books', /*passport.authenticate('jwt', { session: false }),*/ books);
app.use('/api/users', users);
app.use(notFound)
app.use(errorHandler)

// app.use((err: any, req: Request, res: Response, next: any) => {
//     console.error(err.stack);
//     res.status(500).send('Something went wrong!');
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});
