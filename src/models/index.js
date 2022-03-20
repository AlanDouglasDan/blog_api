import mongoose from 'mongoose';
import userSchema from './users';
import articlesSchema from './articles';
import followersSchema from './followers';

const User = mongoose.model("Users", userSchema);
const Article = mongoose.model("Articles", articlesSchema);
const Follower = mongoose.model("Followers", followersSchema);

export {
    User,
    Article,
    Follower,
}