import express from 'express';
import { getAdminJob, getAllJobs, getJobById, postJob } from '../controls/JobControls.js';
import isAuthentic from '../middleware/authentication.js';

const router = express.Router();

router.route("/postjob").post(isAuthentic,postJob);
router.route("/get").get(isAuthentic,getAllJobs);
router.route("/get/:id").get(isAuthentic,getJobById);
router.route("/getAdminJob").get(isAuthentic,getAdminJob);

export default router;