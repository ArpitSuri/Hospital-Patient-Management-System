import express from 'express';
import { createDepartment, deleteDepartment, getDepartments, updateDepartment } from '../controller/departmentController.js';
import upload from '../multer.js';

const router = express.Router();

router.get('/', getDepartments);
router.delete('/:id', deleteDepartment);
router.post("/", upload.single('image'), createDepartment);
router.put("/:id", upload.single('image'), updateDepartment);

export default router;