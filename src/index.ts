import express, { Request, Response } from 'express';

const app = express()
import books from './routes/bookRoutes';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/books', books);

app.use((err: any, req: Request, res: Response, next: any) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
})
