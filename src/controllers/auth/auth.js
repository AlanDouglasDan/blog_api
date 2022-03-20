import { Response, logger, decode } from '../../helpers';
import { User, Follower } from '../../models';
import { addItem, getAllItems, getItem } from '../../db/db_queries';
import utilities from '../../utilities';

const register = async (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body;

    if (!firstName || !lastName || !phone || !email || !password) {
        return res.status(403).json(new Response("Empty fields"));
    }
    else if (password.length < 6) {
        return res.status(403).json(new Response("Password too short"));
    }

    try {
        const details = {
            Collection: User,
            find: { email }
        }
        const user = await getItem(details);
        if(user){
            return res.status(409).json(new Response('user already exists'));
        }

        details.data = req.body;
        const result = await addItem(details);

        const follower_details = {
            Collection: Follower,
            data: {
                user: result._id,
                followers: [],
                followings: []
            }
        }
        const add = await addItem(follower_details);

        res.status(200).json(new Response('account successfully created', result));
    } catch (err) {
        logger.error(err);
        res.status(500).json(new Response('An error occueed while creating account', err));
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password){
        return res.status(403).json(new Response('empty fields'));
    }

    try{
        const details = {
            Collection: User,
            find: { $or: [ {email: username}, {phone: username} ] },
            // find: { email: username }
        };

        const foundUser = await getItem(details);

        if(!foundUser){
            return res.status(404).json(new Response('This user does not exist'));
        }

        if(!foundUser.validPassword(password, foundUser.password)){
            return res.status(401).json(new Response('Incorrect password'));
        }

        const token = utilities.generateLoginToken(foundUser, null);

        res
		.status(202)
		.cookie('auth_token', token, {
			sameSite: 'strict',
			path: '/',
            httpOnly: true,
		}).json(new Response('login successful', token));
    }
    catch(err){
        logger.error(err);
        res.status(500).json(new Response('An error occueed while creating account', err));
    }    
};

export { register, login };