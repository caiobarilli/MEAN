import nodemailer from 'nodemailer';

/**
 * Define nodemailer transport
 * @returns Transport
 */
export const transport = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: `${process.env.SMTP_USER || ''}`,
      pass: `${process.env.SMTP_PASSWORD || ''}`
    }
  });
};

/**
 * Define mail options
 * @param to - Email address to send the email
 * @param subject - Email subject
 * @param text - Email text
 * @returns Mail options
 */
export const mailOptions = (to: string, subject: string, text: string) => {
  return {
    from: `${process.env.SMTP_FROM || 'email@email.com'}`,
    to,
    subject,
    text
  };
};
