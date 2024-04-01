import nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import { confirmationEmail } from "./templates/confirmation";
export interface MailProperties {
  to: string;
  eventName: string;
  organizerName: string;
  eventDescription: string;
  eventLocation: string;
  subject: string;
}

export async function sendMail({
  to,
  organizerName,
  eventName,
  eventDescription,
  eventLocation,
  subject,
}: MailProperties) {
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
      html: compileConfirmationEmail({
        to,
        organizerName,
        eventDescription,
        eventName,
        eventLocation,
        subject,
      }),
    });
    console.log(sendResult);
  } catch (error) {}
}

export const sendConfirmationEmail = async (mailProperties: MailProperties) => {
  await sendMail(mailProperties);
};

export function compileConfirmationEmail(mailProperties: MailProperties) {
  const template = handlebars.compile(confirmationEmail);
  const htmlBody = template({
    eventName: mailProperties.eventName,
    organizerName: mailProperties.organizerName,
    eventDescription: mailProperties.eventDescription,
    eventLocation: mailProperties.eventLocation,
  });

  return htmlBody;
}
