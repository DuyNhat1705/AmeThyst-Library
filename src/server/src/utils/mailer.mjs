import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendOTPEmail = async (toEmail, otp) => {
  await transporter.sendMail({
    from: `"AmeThyst Library" <${process.env.MAIL_USER}>`,
    to: toEmail,
    subject: 'Your OTP Code for Password Reset',
    html: `
      <h2>Hello!</h2>
      <p>Your OTP code is:</p>
      <h1 style="color: #7c3aed; letter-spacing: 8px;">${otp}</h1>
      <p>This code is valid for <b>5 minutes</b>.</p>
      <p>If you did not request a password reset, please ignore this email.</p>
    `,
  });
};

export { sendOTPEmail };
