import { createTransport } from "nodemailer";

import getBaseUrl from "./baseUrl.util.js";

import environment from "./env.util.js";
const { GOOGLE_EMAIL, GOOGLE_PASSWORD } = environment;

async function sendEmail(data) {
  try {
    const trasport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: GOOGLE_EMAIL, pass: GOOGLE_PASSWORD },
    });

    const resetLink = `${getBaseUrl()}/users/verify?token=${data.code}`;

    await trasport.verify();

    await trasport.sendMail({
      from: `GREENGROCERIESMARKET <${GOOGLE_EMAIL}>`,
      to: data.to,
      subject: `USER ${data.name.toUpperCase()} REGISTERED!`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h1 style="color: #28a745;">Welcome to Green Groceries!</h1>
          <p>Hello <strong>${data.name}</strong>,</p>
          <p>Thank you for registering with us. To complete your registration, please click the link below:</p>
          <p><a href="${resetLink}" style="color: #007bff; text-decoration: none;">Verify Your Email</a></p>
          <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
          <p style="word-break: break-all;"><a href="${resetLink}" style="color: #007bff;">${resetLink}</a></p>
          <br>
          <p>Best regards,</p>
          <p>The Green Groceries Team</p>
        </div>
      `,
    });
  } catch (error) {
    throw error;
  }
}

export default sendEmail;