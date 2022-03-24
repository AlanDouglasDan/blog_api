import Router from 'express';

import saveController from '../controllers/save';
import { auth } from '../middlewares';

const router = Router();

// save or unsave article
router.post('/toggle', auth.isLoggedIn, saveController.saveArticle);

// get all saved articles
router.get('/fetch', auth.isLoggedIn, saveController.getSavedArticles);

export default router;