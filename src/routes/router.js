import {Router } from "express";

import jobController from "../controllers/jobController.js";

const router = Router();

router.get("/",jobController.getAll);
router.get("/fetch",jobController.fetchJobs);


export default router;