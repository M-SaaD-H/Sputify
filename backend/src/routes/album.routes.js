import { Router } from "express";
import { getAlbumById, getAllAlbums } from "../controlllers/album.controller.js";

const router = Router();

router.route('/').get(getAllAlbums);
router.route('/:id').get(getAlbumById);


export default router;