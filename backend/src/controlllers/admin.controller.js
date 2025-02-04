import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { Song } from '../models/song.model.js';
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { Album } from '../models/album.model.js';
import { User } from '../models/user.model.js';

const addSong = asyncHandler(async (req, res) => {
  const { name, artist, album } = req.body;
  const audioLocalPath = req.files?.audio?.[0]?.path;
  const imageLocalPath = req.files?.image?.[0]?.path;

  if(!name || !artist) {
    throw new ApiError(404, 'All fields are required');
  }

  if(!audioLocalPath) {
    throw new ApiError(404, 'Song not found');
  }

  const existingSong = await Song.findOne({ name });

  if(existingSong) {
    throw new ApiError(400, 'Song already exists');
  }

  const audio = await uploadOnCloudinary(audioLocalPath);
  const image = await uploadOnCloudinary(imageLocalPath);

  if(!audio) {
    throw new ApiError(500, 'Erorr in uploading song on cloudinary');
  }

  // Now create the Song

  const song = await Song.create({
    name,
    artist,
    image: image?.url || "",
    song: audio,
    duration: audio.duration,  // in seconds
    album
  });

  if(album) {
    const album = await Album.findByIdAndUpdate(
      album,
      {
        $push: { songs: song }
      }
    )
  }

  return res
  .status(200)
  .json(
    new ApiResponse(200, song, 'Song added successfully')
  )
});

const deleteSong = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if(!id) {
    throw new ApiError(404, 'Song id not found');
  }

  const song = await Song.findById(id);

  if(!song) {
    throw new ApiError(404, 'Song not found');
  }

  // remove the the song from the album if any

  const album = await Album.findByIdAndUpdate(
    song.album,
    {
      $pull: { songs: song }
    }
  );

  await song.deleteOne();

  return res
  .status(200)
  .json(
    new ApiResponse(200, {}, 'Song deleted successfully')
  )
});

const createAlbum = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const adminId = req.user;

  if(!adminId) {
    throw new ApiError(401, 'Unauthorized request');
  }

  if(!name) {
    throw new ApiError(404, 'All fields are required');
  }

  const admin = await User.findById(adminId);

  if(!admin) {
    throw new ApiError(404, 'User not found');
  }

  if(admin.role !== 'admin') {
    throw new ApiError(401, 'Only admins can create albums');
  }

  // Create the Album

  const album = await Album.create({
    name,
    owner: adminId,
  });

  if(!album) {
    throw new ApiError(500, 'Error occured while creating the album');
  }

  return res
  .status(200)
  .json(
    new ApiResponse(200, album, 'Album created successfully')
  )
});

const deleteAlbum = asyncHandler(async(req, res) => {
  const { id } = req.params;

  if(!id) {
    throw new ApiError(404, 'Album id not found');
  }

  const album = await Album.findById(id);

  if(!album) {
    throw new ApiError(404, 'Album not found');
  }

  // delete all the songs of the album
  await Song.deleteMany({ album } );

  // delete the album
  await album.deleteOne();

  return res
  .status(200)
  .json(
    new ApiResponse(200, {}, 'Album deleted successfully')
  )
});

export {
  addSong,
  deleteSong,
  createAlbum,
  deleteAlbum
}