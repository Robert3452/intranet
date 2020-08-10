import User from '../models/User';
import passport from 'passport';
import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import config from '../config';

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}

const jwtStrategy = new Strategy(opts, async (payload, done) => {
    try {
        const user = await User.find({ _id: payload.id });
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    } catch (error) {
        console.log(error)
    }
})

passport.use(jwtStrategy);