import nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import { confirmationEmail } from "./templates/confirmation";

export interface MailProperties {
  to: any;
  eventName: any;
  organizerName: any;
  eventDescription: any;
  eventLocation: any;
  eventDate: any;
  eventTime: any;
  subject: any;
}

export async function sendMail({
  to,
  organizerName,
  eventName,
  eventDescription,
  eventLocation,
  eventDate,
  eventTime,
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
    // console.log(testResult);
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
        eventDate,
        eventTime,
        subject,
      }),
    });
    // console.log(sendResult);
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
    eventDate: mailProperties.eventDate,
    eventTime: mailProperties.eventTime,
  });

  return htmlBody;
}
