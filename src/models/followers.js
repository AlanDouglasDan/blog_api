import { Schema } from "mongoose";

const followersSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followers: {
      type: Array,
    },
    followings: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

export default followersSchema;
