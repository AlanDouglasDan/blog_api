import { Follower, User } from '../../models';
import { getAllItems, getItem, updateItem, deleteItem } from '../../db/db_queries';
import { Response, logger } from '../../helpers';

const followUser = async (req, res) => {
    const userLoggedIn = req.userLoggedIn;
    const { person } = req.body;
    const type = req.params.type;
    try {
        const details = {
            Collection: Follower,
            find: { user: userLoggedIn._id },
        } //add userLoggedIn._id to his followers
        const details2 = {
            Collection: Follower,
            find: { user: person },
        } //add person to my followings
        const list = await getItem(details);
        const list2 = await getItem(details2);
        let followings_list = list.followings;
        let follower_list = list2.followers;

        if(type === 'add'){
            if(follower_list.includes(userLoggedIn._id) && followings_list.includes(person)){
                return res.status(400).json(new Response('you already follow this user'));
            }
            follower_list.push(userLoggedIn._id);
            followings_list.push(person);
        }
        else if(type === 'remove'){
            if(!follower_list.includes(userLoggedIn._id) && !followings_list.includes(person)){
                return res.status(400).json(new Response('you do not even follow this user'));
            }
            follower_list = follower_list.filter((item) => {
                return item != userLoggedIn._id;
            });
            followings_list = followings_list.filter((item2) => {
                return item2 != person;
            });
        }

        details2.update = {
            followers: follower_list
        };
        details.update = {
            followings: followings_list
        };
        const update = await updateItem(details);
        const update2 = await updateItem(details2);

        return res.status(200).json(new Response('Request complete', update));
    } catch (err) {
        logger.error(err);
        return res.status(500).json(new Response('Unable to complete request', err));
    }
}

const listFollowers = async (req, res) => {
    const userLoggedIn = req.userLoggedIn;
    try {
        const details = {
            Collection: Follower,
            find: { user: userLoggedIn._id }
        }
        const list = await getItem(details);
        const follower_list = list.followers;
        const new_array = [];
        
        for(let i=0; i<follower_list.length; i++) {
            const user_details = {
                Collection: User,
                find: { _id: follower_list[i] }
            }
            const _person = await getItem(user_details);
            const to_push = {
                "firstName": _person.firstName,
                "lastName": _person.lastName
            }
            new_array.push(to_push);
        };

        const followings_list = list.followings;
        const new_array2 = [];
        
        for(let i=0; i<followings_list.length; i++) {
            const user_details2 = {
                Collection: User,
                find: { _id: followings_list[i] }
            }
            const _person2 = await getItem(user_details2);
            const to_push2 = {
                "firstName": _person2.firstName,
                "lastName": _person2.lastName
            }
            new_array2.push(to_push2);
        };

        const payload = {
            "follower_list": new_array,
            "no_of_followers": new_array.length,
            "followings_list": new_array2,
            "no_of_followings": new_array2.length
        };
        return res.status(200).json(new Response('Request complete', payload));
    } catch (err) {
        logger.error(err);
        return res.status(500).json(new Response('Unable to complete request', err));
    }
}

const checkFollowStatus = async (req, res) => {
    const userLoggedIn = req.userLoggedIn;
    const id = req.params.id;
    try {
        const details = {
            Collection: Follower,
            find: { user: id},
        }
        const list = await getItem(details);
        if(!list){
            return res.status(403).json(new Response('User does not exist'));
        }        
        const follower_list = list.followers;
        if(follower_list.includes(userLoggedIn._id)){
            return res.status(200).json(new Response('You follow this user'));
        }
        else{
            return res.status(202).json(new Response('You do not follow this user'));
        }
    } catch (err) {
        logger.error(err);
        return res.status(500).json(new Response('Unable to complete request', err));
    }
}

export { followUser, listFollowers, checkFollowStatus };