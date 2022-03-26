import Router from 'express';

import commentsController from '../controllers/comments';
import { auth } from '../middlewares';

const router = Router();

// add a comment
router.post('/add', auth.isLoggedIn, commentsController.addComment);

// edit a comment
router.patch('/edit', auth.isLoggedIn, commentsController.editComment);

export default router;