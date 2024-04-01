import nodemailer from "nodemailer";

export interface MailProperties {
  to: string;
  name: string;
  subject: string;
  body: string;
}

export async function sendMail({ to, name, subject, body }: MailProperties) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.log(error);
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
    console.log(sendResult);
  } catch (error) {}
}

export const sendConfirmationEmail = async (mailProperties: MailProperties) => {
  await sendMail(mailProperties);
};
