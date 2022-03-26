import { Schema } from 'mongoose';

const commentsSchema = new Schema({
    commenter: { 
        type: Schema.Types.ObjectId,
        ref: "User", 
        immutable: true, 
        required: true 
    },
    article: { 
        type: Schema.Types.ObjectId,
        ref: "Article", 
        immutable: true, 
        required: true 
    },
    comment: String,
}, { timestamps: true });

export default commentsSchema;
