import express from "express";
import { getAdminStats } from "../controller/adminController.js";


const router = express.Router();

router.get("/stats", getAdminStats);

export default router;
