import { Router } from "express";
import { getAllSongs, getRandomSongs, getSongById } from "../controlllers/song.controller";

const router = Router();

router.route('/').get(getAllSongs);
router.route('/:id').get(getSongById);

router.route('/get-random-songs').get(getRandomSongs);


export default router;