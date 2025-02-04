import { Router } from "express";
import { getAllSongs, getRandomSongs, getSongById } from "../controlllers/song.controller";

const router = Router();

router.route('/').get(getAllSongs);
router.route('/:id').get(getSongById);

router.route('/featured').get(getRandomSongs);
router.route('/made-for-you').get(getRandomSongs);
router.route('/trending').get(getRandomSongs);


export default router;