import Router from 'express';

import commentsController from '../controllers/comments';
import { auth } from '../middlewares';

const router = Router();

// add a comment
router.post('/add', auth.isLoggedIn, commentsController.addComment);

// edit a comment
router.patch('/edit/:comment_id', auth.isLoggedIn, commentsController.editComment);

// delete a comment;
router.delete('/delete/:comment_id', auth.isLoggedIn, commentsController.deleteComment);

// view all comments;
router.get('/fetch/:article_id', auth.isLoggedIn, commentsController.getComments);

export default router;