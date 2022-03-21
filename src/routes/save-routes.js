import Router from 'express';

import saveController from '../controllers/save';
import { auth } from '../middlewares';

const router = Router();

// save or unsave article
router.post('/toggle', auth.isLoggedIn, saveController.saveArticle);

export default router;