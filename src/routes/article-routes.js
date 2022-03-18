import Router from 'express';

import articlesController from '../controllers/articles';
import { auth } from '../middlewares';

const router = Router();

router.get('/all', auth.isLoggedIn, articlesController.getAllArticles);

router.post('/add', auth.isLoggedIn, articlesController.createArticle);

export default router;