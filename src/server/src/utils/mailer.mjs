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
      <p>This code is valid for <b>60 seconds</b>.</p>
      <p>If you did not request a password reset, please ignore this email.</p>
    `,
  });
};

const sendVerificationEmail = async (toEmail, token) => {
  const verifyLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;


  await transporter.sendMail({
    from: `"AmeThyst Library" <${process.env.MAIL_USER}>`,
    to: toEmail,
    subject: 'Verify your AmeThyst Library account',
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 480px; margin: auto; padding: 32px; border: 1px solid #E5E7EB; border-radius: 12px;">
        <h2 style="color: #0B1C30; margin-bottom: 8px;">Welcome to AmeThyst Library!</h2>
        <p style="color: #45474C; margin-bottom: 24px;">
          Thanks for signing up. Please verify your email address to activate your account.
          This link will expire in <b>5 minutes</b>.
        </p>
        <p>
          <a href="${verifyLink}" style="display: inline-block; padding: 12px 32px; background-color: #0A3240; color: #fff; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
            Verify Email
          </a>
        </p>
        <p style="color: #A1A3A7; font-size: 12px; margin-top: 24px;">
          If you didn't create an account, you can safely ignore this email.
        </p>
      </div>
    `,
  });
};

export { sendOTPEmail, sendVerificationEmail };

