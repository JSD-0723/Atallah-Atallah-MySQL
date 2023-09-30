// import { Request, Response, NextFunction } from 'express';
// import passport from 'passport';
// import { User } from '../models/userModel';
// import { createCustomError } from '../errors/custome-error';

// const authenticate = (req: Request & { user?: User }, res: Response, next: NextFunction) => {
//     passport.authenticate('jwt', { session: false }, (err: Error, user: User) => {
//         const id = Number(req.params.id);

//         if (req.user && req.user.id === id) {
//             req.user = user;
//             return next();
//         }
//         return next(createCustomError('Unauthorized', 401))
//     })(req, res, next);
// };

// export default authenticate