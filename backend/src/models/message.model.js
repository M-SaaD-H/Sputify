import mongoose, { Schema } from "mongoose";

const messageSchama = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    reciever: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    }
  }, { timestamps: true }
);

export const Message = mongoose.model('Message', messageSchama);