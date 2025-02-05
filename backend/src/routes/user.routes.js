import { Router } from "express";
import { getAllUsers, getCurrentUser } from "../controlllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(protect);

router.route('/get-current-user').get(getCurrentUser);
router.route('/get-all-users').get(getAllUsers);


export default router;