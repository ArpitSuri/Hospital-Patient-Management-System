import express from "express";


import upload from "../multer.js";
import { createDoctor, deleteDoctor, getAllDoctors, getDoctorsByDepartment, updateDoctor } from "../controller/doctorController.js";

const router = express.Router();

router.post("/", upload.single("profileImage"), createDoctor);
router.get("/", getAllDoctors);
router.delete("/:id", deleteDoctor);
router.put("/:id", upload.single("profileImage"), updateDoctor);
router.get("/department/:departmentId", getDoctorsByDepartment);

export default router;
