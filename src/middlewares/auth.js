import jwt from 'jsonwebtoken';
import { getItem } from '../db/db_queries';
import { Response, logger } from '../helpers';
import { User } from '../models';

const isLoggedIn = async (req, res, next) => {
    const key = process.env.JWT_SECRET || 'mysecret';

    try {
        const { authorization } = req.headers;
        if (!authorization) throw new Error('No authorization header');
    
        const tokenBearer = authorization.split(' ')[1];
        const decoded = jwt.verify(tokenBearer, key);
    
        if (decoded) {
            const details = {
                Collection: User,
                find: { _id: decoded._id }
            }

            const ie = await getItem(details);
            if(!ie){
                return res.status(401).json(new Response('This user does not exist'));
            }
            
            req.userLoggedIn = decoded;
            next();
        }
    } catch (err) {
        logger.error(`An error occured while trying to login at isLoggedIn. ${err}`);
        res.status(403).json(new Response(err.message || 'authentication failed'));
    }
}

export default { isLoggedIn };