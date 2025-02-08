import { Router } from "express";
import { changePassword, login, logout, refreshAccessToken, register, updateAccountDetails } from "../controlllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/register').post(register);
router.route('/login').post(login);

router.route('/logout').delete(protect, logout);

router.route('/refresh-access-token').get(refreshAccessToken);
router.route('/change-password').patch(protect, changePassword);
router.route('/update-account-details').patch(protect, updateAccountDetails);


export default router;