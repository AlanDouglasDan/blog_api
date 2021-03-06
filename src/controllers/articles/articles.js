import { Article, User } from '../../models';
import { addItem, getAllItems, getItem, updateItem, deleteItem } from '../../db/db_queries';
import { Response, logger } from '../../helpers';

const createArticle = async (req, res) => {
    const { title, body } = req.body;
    const userLoggedIn = req.userLoggedIn;
    const _id = userLoggedIn._id;

    if(!title || !body){
        return res.status(403).json(new Response('Empty fields'));
    }
    
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
    try{
        const userLoggedIn = req.userLoggedIn;
        const details = {
            Collection: Article,
            sort: { createdAt: -1 },
        }
        const articles = await getAllItems(details);
        const list = [];

        for(let article of articles){
            const { author, title, body, createdAt } = article;

            const user_details = {
                Collection: User,
                find: { _id: author },
            }
            const foundUser = await getItem(user_details);
            const name = `${foundUser.firstName} ${foundUser.lastName}`;
            const payload = {
                'name': name,
                'title': title,
                'body': body,
                'date': createdAt
            };
            list.push(payload);
        }
        res.status(200).json(new Response('articles successfully retrieved', list));
    }
    catch(err){
        logger.error(err);
        res.status(500).json(new Response('An error occured fetching the articles', err));
    }
}

const getSpecificArticle = async (req, res) => {
    try {
        const { userLoggedIn } = req;
        const { id } = req.params;

        const details = {
            Collection: Article,
            find: { _id: id },
        }
        const article = await getItem(details);
        const { author, title, body, createdAt } = article;
        const user_details = {
            Collection: User,
            find: { _id: author },
        }
        const foundUser = await getItem(user_details);
        const name = `${foundUser.firstName} ${foundUser.lastName}`;
        const payload = {
            'name': name,
            'title': title,
            'body': body,
            'date': createdAt
        };
        return res.status(200).json(new Response('Article retrieved successfully', payload));
    } catch (err) {
        logger.error(err);
        return res.status(500).json(new Response('An error occured', err));
    }
}

const updateArticle = async (req, res) => {
    const user_id = req.userLoggedIn._id;
    const article_id = req.params.id;
    const { title, body } = req.body;
    
    if(!title || !body){
        return res.status(403).json(new Response('Empty fields'));
    }

    try {
        const article_details = {
            Collection: Article,
            find: { _id: article_id },
        }

        let article;
        try{
            article = await getItem(article_details);
        }
        catch (err){
            return res.status(401).json(new Response('Invalid article'));
        }

        if(!article){
            return res.status(403).json(new Response('Article does nott exist'));
        }
        
        if(user_id != article.author){
            return res.status(401).json(new Response('You are not authorized to edit this article'));
        }

        article_details.update = {
            title,
            body            
        };
        const update = await updateItem(article_details);

        return res.status(201).json(new Response('article successfully updated', update));
    } catch (err) {
        logger.error(err);
        res.status(500).json(new Response('An error occured while trying to update this article', err));
    }
}

const deleteArticle = async (req, res) => {
    const user_id = req.userLoggedIn._id;
    const article_id = req.params.id;

    try {
        const article_details = {
            Collection: Article,
            find: { _id: article_id },
        }

        let article;
        try{
            article = await getItem(article_details);
        }
        catch (err){
            return res.status(401).json(new Response('Invalid article'));
        }

        if(!article){
            return res.status(403).json(new Response('Article does nott exist'));
        }
        
        if(user_id != article.author){
            return res.status(401).json(new Response('You are not authorized to edit this article'));
        }

        const deleted = await deleteItem(article_details);

        return res.status(202).json(new Response('Article deleted successfully', deleted));
    } catch (err) {
        logger.error(err);
        res.status(500).json(new Response('An error occured while trying to delete this article', err));
    }
}

export { createArticle, getAllArticles, updateArticle, deleteArticle, getSpecificArticle };