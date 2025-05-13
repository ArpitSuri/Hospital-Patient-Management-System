// utils/sendEmail.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail", // or any SMTP provider
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = async (to, subject, html) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
    });
};

export default sendEmail;
