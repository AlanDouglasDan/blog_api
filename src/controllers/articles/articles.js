import { Article  } from '../../models';
import { addItem, getAllItems, getItem } from '../../db/db_queries';
import { Response, logger } from '../../helpers';

const createArticle = async (req, res) => {
    const { title, body } = req.body;
    const userLoggedIn = req.userLoggedIn;
    const _id = userLoggedIn._id;
    
    const data = {
        "author": _id,
        "title": title,
        "body": body
    };

    try {
        const details = {
            Collection: Article,
            data: data,
        }
        const newArticle = await addItem(details);

        return res.status(201).json(new Response('article successfully created', newArticle));
    } catch (err) {
        logger.error(err);
        res.status(500).json(new Response('an error occured', err));
    }
}

const getAllArticles = async (req, res) => {
    const userLoggedIn = req.userLoggedIn;
    res.status(200).json(new Response('article successfully created', userLoggedIn));
}

export { createArticle, getAllArticles };