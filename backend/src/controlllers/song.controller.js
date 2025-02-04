import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Song } from "../models/song.model.js";

const getAllSongs = asyncHandler(async (req, res) => {
  const songs = await Song.find().sort({ createdAt: -1 }); // to get all songs in ascending order of creation date

  return res
  .status(200)
  .json(
    new ApiResponse(200, songs, 'All Songs fetched successfully')
  )
});

const getSongById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const song = await Song.findById(id);

  if(!song) {
    throw new ApiError(404, 'Song not found');
  }

  return res
  .status(200)
  .json(
    new ApiResponse(200, song, 'Song fetched successfully')
  )
});

const getRandomSongs = asyncHandler(async (req, res) => {
  // fetch 6 random songs

  const songs = await Song.aggregate([
    {
      $sample: { size: 6 }
    },
    {
      $project: {
        _id: 0,
        name: 1,
        artist: 1,
        image: 1,
        song: 1
      }
    }
  ]);

  return res
  .status(200)
  .json(
    new ApiResponse(200, songs, 'Random Songs fetched successfully')
  )
});

export {
  getAllSongs,
  getSongById,
  getRandomSongs
}