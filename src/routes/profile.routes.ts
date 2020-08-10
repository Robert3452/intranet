import { Router } from 'express';
const router = Router();
import * as userCtrl from '../controllers/profile.controller';

router.post('/', userCtrl.signup);

router.post('/signin', userCtrl.signin);

export default router;