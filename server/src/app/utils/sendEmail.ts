import nodemailer from "nodemailer";
import config from "../config/config";

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: config.email_id, 
    pass: config.email_password,
  },
});


export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
      to: options.to,
      subject: options.subject,
      text: options.text, 
      html: options.html, 
    });

  } catch (error) {
    throw new Error("Failed to send email");
  }
};
