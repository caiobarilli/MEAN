import nodemailer from 'nodemailer';
import handlebars from 'nodemailer-express-handlebars';

/**
 * Exaple of usage:
  app.get('/', (req, res) => {
    transport().sendMail(
      mailOptions(
        {
          to: 'example@mail.com',
          subject: 'Example subject'
        },
        {
          template: 'home',
          context: {
            title: 'Title:',
            content: 'Example content'
          }
        }
      ),
      (error, info) => {
        if (error) {
          return res.status(500).send(error.toString());
        }
        res.status(200).send('Email has been sent: ' + info.response);
      }
    );
  });
*/

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  template?: string;
  context?: EmailContext;
}

interface defaultMailOptions {
  to: string;
  subject: string;
}

interface EmailContext {
  [key: string]: unknown;
}

interface hbsOptions {
  template?: string;
  context?: EmailContext;
}

/**
 * Define handlebars options
 */
export const handlebarsOptions = {
  viewEngine: {
    extName: '.handlebars',
    partialsDir: './src/views/partials',
    layoutsDir: './src/views/layouts',
    defaultLayout: false
  },
  viewPath: './src/views',
  extName: '.handlebars'
};

/**
 * Define nodemailer transport
 * @returns Transport
 */
export const transport = () => {
  return nodemailer
    .createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: `${process.env.SMTP_USER || ''}`,
        pass: `${process.env.SMTP_PASSWORD || ''}`
      }
    })
    .use('compile', handlebars(handlebarsOptions));
};

/**
 * Define mail options
 * @param {defaultMailOptions} param0
 * @param {hbsOptions} param1
 * @returns {EmailOptions}
 */
export const mailOptions = (
  { to, subject }: defaultMailOptions,
  { template, context }: hbsOptions = {}
): EmailOptions => {
  return {
    from: `${process.env.SMTP_FROM || 'email@email.com'}`,
    to,
    subject,
    template,
    context
  };
};
