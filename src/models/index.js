import mongoose from 'mongoose';
import userSchema from './users';
import articlesSchema from './articles';
import followersSchema from './followers';
import commentsSchema from './comments';

const User = mongoose.model("Users", userSchema);
const Article = mongoose.model("Articles", articlesSchema);
const Follower = mongoose.model("Followers", followersSchema);
const Comment = mongoose.model("Comment", commentsSchema);

export {
    User,
    Article,
    Follower,
    Comment,
}