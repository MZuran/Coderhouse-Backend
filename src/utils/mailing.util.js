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

    const resetLink = `http://localhost:${process.env.PORT}/users/verify?token=${data.code}`;
    
    await trasport.verify();
    await trasport.sendMail({
      from: `GREENGROCERIESMARKET <${GOOGLE_EMAIL}>`,
      to: data.to,
      subject: `USER ${data.name.toUpperCase()} REGISTERED!`,
      html: `
        <h1 style="color: red">WELCOME TO GREEN GROCERIES!</h1>
        <p>To finish the registration process please proceed to this link: ${resetLink}</p>
      `,
    });
  } catch (error) {
    throw error;
  }
}

export default sendEmail;