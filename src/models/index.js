import mongoose from 'mongoose';
import userSchema from './users';
import articleSchema from './articles';

const User = mongoose.model("Users", userSchema);
const Article = mongoose.model("Articles", articleSchema);

export {
    User,
    Article,
}