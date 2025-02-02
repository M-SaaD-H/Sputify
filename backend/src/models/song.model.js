import mongoose, { Schema } from "mongoose";

const songSchema = new Schema(
    {
			name: {
				type: String,
				required: true,
				trim: true
			},
			artist: {
				type: String,
				required: true,
				trim: true
			},
			image: {
				type: String,
				trim: true
			},
			song: {
				type: String,
				required: true,
				trim: true
			},
			duration: { // in seconds
				type: Number,
				required: true,
			},
			album: {
				type: Schema.Types.ObjectId,
				ref: 'Album'
			}
		}, { timestamps: true }
);

export const Song = mongoose.model("Song", songSchema);