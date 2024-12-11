import express from 'express';
import { login, logout, register, updateProfile } from '../controls/UserControls.js';
import isAuthentic from '../middleware/authentication.js';
import { singleUpload } from '../middleware/multer.js';

const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthentic,singleUpload,updateProfile);

export default router;