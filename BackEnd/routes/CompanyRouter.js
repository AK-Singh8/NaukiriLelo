import express from 'express';
import { getCompany, getCompanyId, registerCompany, updateCompany } from '../controls/CompanyControls.js';
import isAuthentic from '../middleware/authentication.js';
import { singleUpload } from '../middleware/multer.js';

const router = express.Router();

router.route("/register").post(isAuthentic,registerCompany);
router.route("/get").get(isAuthentic,getCompany);
router.route("/get/:id").get(isAuthentic,getCompanyId);
router.route("/update/:id").put(isAuthentic,singleUpload,updateCompany);

export default router;