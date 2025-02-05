import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { User } from "../models/user.model.js";

const getStats = (async (req, res) => {
  // These all 2nd query will run only after the completion of the first query and same for the third which will slower down the process. So intead of this we can use Promise.all

  // const songs = await Song.countDocuments();
  // const albums = await Album.countDocuments();
  // const users = await User.countDocuments();

  const [songs, albums, users, artists] = await Promise.all([
    Song.countDocuments(),
    Album.countDocuments(),
    User.countDocuments(),

    // To get the count of unique artists only
    (await Song.distinct('artist')).length
  ]);

  return res
  .status(200)
  .json(
    new ApiResponse(
      200, {
        songs,
        albums,
        users,
        artists
      },
      'Statistics fetched successfully'
    )
  )
});

export { getStats }