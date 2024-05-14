import {Router } from "express";

import jobController from "../controllers/jobController.js";

const router = Router();

router.get("/",jobController.getAll);

router.get("/fetch",jobController.fetchForm);
router.post("/fetch",jobController.fetch);


export default router;