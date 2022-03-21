import { Article, User  } from '../../models';
import { addItem, getAllItems, getItem, updateItem, deleteItem } from '../../db/db_queries';
import { Response, logger } from '../../helpers';

const saveArticle = async (req, res) => {
    const userLoggedIn = req.userLoggedIn;
    const user_id = userLoggedIn._id;
    const { type, id } = req.body;
    try {
        // const details = {
        //     Colletion: User,
        //     find: { _id: user_id }
        // };
        // const foundUser = await getItem(details);

        const details = {
            Collection: User,
            find: { _id: user_id },
        };
        const foundUser = await getItem(details);

        return res.status(200).json(new Response('Successful response', foundUser));
    } catch (err) {
        logger.error(err);
        return res.status(500).json(new Response('An error occured while trying to save article', err));
    }
}

export { saveArticle };