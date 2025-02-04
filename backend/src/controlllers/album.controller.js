import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Album } from "../models/album.model.js";

const getAllAlbums = asyncHandler(async (req, res) => {
  const albums = await Album.find();

  return res
  .status(200)
  .json(
    new ApiResponse(200, albums, 'Albums fetched successfully')
  )
});

const getAlbumById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const album = await Album.findById(id).populate('songs');

  if(!album) {
    throw new ApiError(404, 'Album not found');
  }

  return res
  .status(200)
  .json(
    new ApiResponse(200, album, 'Album fetched successfully')
  )
});

export {
  getAllAlbums,
  getAlbumById
}