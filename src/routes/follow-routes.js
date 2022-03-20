import Router from 'express';

import followController from '../controllers/follow';
import { auth } from '../middlewares';

const router = Router();

// follow or unfollow user
router.post('/:type', auth.isLoggedIn, followController.followUser);

// get list of all followers or followings of a user
router.get('/all', auth.isLoggedIn, followController.listFollowers);

// check whether a user follows another user
router.get('/check/:id', auth.isLoggedIn, followController.checkFollowStatus);

export default router;