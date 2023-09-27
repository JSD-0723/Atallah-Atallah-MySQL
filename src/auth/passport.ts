import passport from 'passport';
import passportJWT, { StrategyOptions } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import User from '../models/customerModel';
const config = require('../../config/config.json');

const ExtractJWT = ExtractJwt;
const StrategyJWT = passportJWT.Strategy;

const jwtOptions: StrategyOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.development.jwt_secret
};

passport.use(new StrategyJWT(jwtOptions, async (jwtPayload, done) => {
    try {
        const user: any = await User.findOne({ where: { id: jwtPayload.id } });
        if (user) {
            return done(null, { ...jwtPayload, role: user.role });
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
}));

export default passport;
