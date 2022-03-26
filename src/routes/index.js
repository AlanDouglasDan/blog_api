import Router from "express";
import authRoutes from "./auth-routes";
import articleRoutes from "./article-routes";
import followRoutes from "./follow-routes";
import saveRoutes from './save-routes';
import commentRoutes from './comment-routes';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).send('Blog api');
})

router.get('/logout', (req, res) => {
    res.clearCookie("token").status(202).json("cookie cleared");
})

router.use("/auth", authRoutes);
router.use("/api/article", articleRoutes);
router.use('/api/follow', followRoutes);
router.use('/api/bookmark', saveRoutes);
router.use('/api/comment', commentRoutes);

router.use((req, res, next) => {
    const error = new Error("No resource was found");
    error.status = 404;
    next(error);
});
  
// eslint-disable-next-line no-unused-vars
router.use((error, req, res, next) => {
    const { status } = error;
    res.status(status || 500).json(error);
});

export default router;