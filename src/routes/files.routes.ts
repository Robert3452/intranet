import { Router } from 'express';
import passport from 'passport';

const jwt = passport.authenticate('jwt', { session: false });
const router = Router();


router.get('/special', jwt, (req, res) => {
    res.send("hola")
})

export default router;