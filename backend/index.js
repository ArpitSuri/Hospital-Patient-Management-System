import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";
import dbConnection from './config/dbConnection.js';
import departmentRouter from './routes/departmentRouter.js';
import doctorRouter from './routes/doctorRouter.js';
import appointmentRouter from './routes/appointmentRoutes.js';
import authRouter from './routes/authRouter.js';
import patientRouter from './routes/patientRouter.js';

const app = express();
dotenv.config();


app.use(cors()); // Enable CORS for all routes
app.use(express.json());// Parse JSON bodies
app.use(express.urlencoded({ extended: true }));// Parse URL-encoded bodies

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/patientUploads", express.static(path.join(__dirname, "patientUploads")));




dbConnection();
app.get('/', (req, res) => {
    res.send('Hospital Management System Running !');
});

app.use('/api/departments', departmentRouter);
app.use('/api/doctors', doctorRouter);
app.use('/api/appointments', appointmentRouter);
app.use('/api/auth', authRouter);
app.use('/api/patients', patientRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    });