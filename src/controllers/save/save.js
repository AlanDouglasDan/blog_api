import { Article, User  } from '../../models';
import { addItem, getAllItems, getItem, updateItem, deleteItem } from '../../db/db_queries';
import { Response, logger } from '../../helpers';

const saveArticle = async (req, res) => {
    const userLoggedIn = req.userLoggedIn;
    const user_id = userLoggedIn._id;
    const { type, id } = req.body;
    try {
        const details = {
            Collection: User,
            find: { _id: user_id },
        };
        const foundUser = await getItem(details);
        const list = foundUser.savedItems;

        const article_details = {
            Collection: Article,
            find: { _id: id },
        }

        let foundArticle;
        try{
            foundArticle = await getItem(article_details);
        }
        catch(err){
            return res.status(401).json(new Response('Invalid article or the article does not exist', err));
        }
        
        if(type === 'save'){
            if(list.includes(id))
                return res.status(409).json(new Response('Article already added to bookmarks'));
            else{
                list.push(id);
                details.update = { 
                    savedItems: list 
                };
                const saved = await updateItem(details);
                return res.status(200).json(new Response('Article saved successfully', saved));
            }
        }
        else if(type === 'unsave'){
            if(!list.includes(id))
                return res.status(409).json(new Response('Article is not among bookmarks'));
            else{
                const _list = list.filter(item => {
                    return item != id;
                });
                details.update = { savedItems: _list };
                const unsave = await updateItem(details);
                return res.status(200).json(new Response('Article unsaved successfully', unsave));
            }
        }
        else
            return res.status(403).json(new Response('Invalid type specified'));
    } 
    catch (err) {
        logger.error(err);
        return res.status(500).json(new Response('An error occured while trying to save article', err));
    }
}

export { saveArticle };