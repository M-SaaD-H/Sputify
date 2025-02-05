import { Router } from "express";
import { getStats } from "../controlllers/stats.controller.js";
import { getAdmin, protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/get-stats').get(protect, getAdmin, getStats);


export default router;