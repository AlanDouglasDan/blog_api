import jwt from 'jsonwebtoken';
import { Response, logger } from '../helpers';

const isLoggedIn = (req, res, next) => {
    const key = process.env.JWT_SECRET || 'mysecret';

    try {
        const authorization = req.cookies.token;
        if (!authorization) throw new Error('No authorization header');
    
        const tokenBearer = authorization.split(' ')[1];
        const decoded = jwt.verify(tokenBearer, key);
    
        if (decoded) {
            req.userLoggedIn = decoded;
            next();
        }
    } catch (err) {
        logger.error(`An error occured while trying to login at isLoggedIn. ${err}`);
        res.status(403).json(new Response(err.message || 'authentication failed'));
    }
}

export default { isLoggedIn };