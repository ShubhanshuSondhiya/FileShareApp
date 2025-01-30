import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

export async function sendEmail(mailOptions) {
  try {
    transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
}
