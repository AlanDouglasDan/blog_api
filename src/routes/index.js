import Router from "express";
import jsonwebtoken from "jsonwebtoken";
import jwt from "express-jwt";
import authRoutes from "./auth-routes";

const router = Router();

const key = process.env.JWT_SECRET || "mySecret";

router.get('/', (req, res) => {
    res.status(200).send('Blog api');
    // const token = jsonwebtoken.sign({user: 'Alan Douglas'}, key);

    // res.cookie('token', token, { httpOnly: true });

    // const tok = req.cookies.token;
    // res.status(202).json({tok});
})

router.use("/auth", authRoutes);

export default router;