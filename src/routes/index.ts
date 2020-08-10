import { Router } from 'express';
import profile from './profile.routes';
import files from './files.routes';

const router = Router();
router.get('/', (req, res) => {
    res.send("<h1>Hola</h1>")
})
router.use('/profile', profile);
router.use('/files', files);

export default router;


