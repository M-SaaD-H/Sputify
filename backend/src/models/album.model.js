import mongoose, { Schema } from "mongoose";

const albumSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    owner: { // Albums created by a user will be available to all the users
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    songs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Song'
      }
    ]
  }, { timestamps: true }
);

export const Album = mongoose.model('Album', albumSchema);