import { Router } from "express";
import { getCurrentUser } from "../controlllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(protect);

router.route('/get-current-user').get(getCurrentUser);


export default router;