import { createTransport } from "nodemailer";
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
    
    await trasport.verify();
    await trasport.sendMail({
      from: `ADOPTME <${GOOGLE_EMAIL}>`,
      to: data.to,
      subject: `USER ${data.first_name.toUpperCase()} REGISTERED!`,
      html: `
        <h1 style="color: red">WELCOME TO GREEN GROCERIES!</h1>
        <p>VERIFY CODE: ${data.code}</p>
      `,
    });
  } catch (error) {
    throw error;
  }
}

export default sendEmail;