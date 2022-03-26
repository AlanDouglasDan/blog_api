import { Article, Comment, User  } from '../../models';
import { addItem, getItem, getAllItems, updateItem, deleteItem } from '../../db/db_queries';
import { Response, logger } from '../../helpers';

const addComment = async (req, res) => {
    try {
        const { id, comment } = req.body;
        const userLoggedIn = req.userLoggedIn;
        const user_id = userLoggedIn._id;
        
        const article_details = {
            Collection: Article,
            find: { _id: id },
        }
        try {
            const article = await getItem(article_details);
        } catch (err) {
            return res.status(404).json(new Response('The article does not exist', err));
        }

        const data = {
            'commenter': user_id,
            'article': id,
            'comment': comment
        }

        const comment_details = {
            Collection: Comment,
            data: data,
        }
        const newComment = await addItem(comment_details);

        return res.status(201).json(new Response(newComment));
    } catch (err) {
        logger.error(err);
        return res.status(500).json(new Response('An error occured', err));
    }
}

const editComment = async (req, res) => {
    try {
        const userLoggedIn = req.userLoggedIn;
        const { comment_id } = req.params;
        const { body } = req.body;
        
        const comment_details = {
            Collection: Comment,
            find: { _id: comment_id },
        }
        let foundComment;

        try {
            foundComment = await getItem(comment_details);
        } catch (err) {
            return res.status(500).json(new Response('invalid comment', err));
        }

        if (foundComment.commenter != userLoggedIn._id)
            return res.status(401).json(new Response('you are not authorized to edit this comment'));

        comment_details.update = { comment: body };
        const update = await updateItem(comment_details);

        return res.status(201).json(new Response('Comment successfully edited', update));
    } 
    catch (err) {
        logger.error(err);
        res.status(500).json(new Response('An error occured', err));
    }
}

const deleteComment = async (req, res) => {
    try {
        const userLoggedIn = req.userLoggedIn;
        const { comment_id } = req.params;

        const details = {
            Collection: Comment,
            find: { _id: comment_id },
        }
        const comment = await getItem(details);
        if(!comment)
            return res.status(404).json(new Response('The comment does not exist'));
        if(comment.commenter != userLoggedIn._id)
            return res.status(401).json(new Response('You are not authorized to delete this mail'));
            
        const deleted = await deleteItem(details);

        return res.status(200).json(new Response('Comment deleted successfully', deleted));
    } catch (err) {
        logger.error(err);
        res.status(500).json(new Response('An error occured', err));
    }
}

const getComments = async (req, res) => {
    try {
        const userLoggedIn = req.userLoggedIn;
        const { article_id } = req.params;
        const comment_details = {
            Collection: Comment,
            find: { article: article_id },
        }
        const comments = await getAllItems(comment_details);

        let list = [];
        for(let comment of comments){
            const user_id = comment.commenter;
            const user_details = {
                Collection: User,
                find: { _id: user_id },
            }
            const foundUser = await getItem(user_details);
            const name = `${foundUser.firstName} ${foundUser.lastName}`;
            const payload = {
                'name': name,
                'body': comment.comment,
                'date': comment.createdAt
            }
            list.push(payload);
        }

        return res.status(200).json(new Response('Successfully fetched all articles', list));
    } catch (err) {
        logger.error(err);
        return res.status(500).json(new Response('An error occured', err));
    }
}

export { addComment, editComment, deleteComment, getComments };