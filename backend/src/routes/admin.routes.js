import { Router } from "express";
import { protect, getAdmin } from '../middlewares/auth.middleware';
import { addSong, createAlbum, deleteAlbum, deleteSong } from "../controlllers/admin.controller";

const router = Router();

router.use(protect, getAdmin);

router.route('/songs/add').post(addSong);
router.route('/songs/delete/:id').delete(deleteSong);

router.route('/albums/create').post(createAlbum);
router.route('/albums/delete/:id').delete(deleteAlbum);


export default router;