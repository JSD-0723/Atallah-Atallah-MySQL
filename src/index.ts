import { error } from 'console';
import express, { Request, Response } from 'express';
const sequelize = require('./database/connection');

const app = express()
const books = require('./routes/bookRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/books', books);

app.use((err: any, req: Request, res: Response, next: any) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

sequelize
    .sync({ force: false }) // Set force to false to prevent dropping tables
    .then(() => {
        sequelize.authenticate()
            .then(() => {
                console.log('Database connection has been established successfully.');

                app.listen(5000, () => {
                    console.log('Server is listening on port 5000...');
                });
            })
            .catch((error: any) => {
                console.error('Unable to authenticate with the database:', error);
            });
    })
    .catch((error: any) => {
        console.error('Unable to synchronize the database:', error);
    });


// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Database connection has been established successfully.');

//         await sequelize.sync();

//         app.listen(5000, () => {
//             console.log('Server is listening on port 5000...');
//         });
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// })();
