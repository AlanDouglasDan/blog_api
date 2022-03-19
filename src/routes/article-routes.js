import Router from 'express';

import articlesController from '../controllers/articles';
import { auth } from '../middlewares';

const router = Router();

// get all articles
router.get('/all', auth.isLoggedIn, articlesController.getAllArticles);

// post an article
router.post('/add', auth.isLoggedIn, articlesController.createArticle);

export default router;