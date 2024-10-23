const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const config = require('../config/config');
const logger = require('../config/logger');
const path = require('path');
const fs = require('fs');
const { BASE_URL, EMAIL_URL } = require('../utils/baseUrl');
const { send } = require('process');
const { requestToAddBoardMail } = require('../templates/requestToAddBoardMail.tempate');
const { shareBoardMail } = require('../templates/shareBoardMail.template');

const secureOption =
  config.env === 'production' ? true : config.EMAIL_SECURE === 'true';

const transport = nodemailer.createTransport({
  host: config.email.smtp.host,
  port: config.email.smtp.port,
  secure: secureOption,
  auth: {
    user: config.email.smtp.auth.user,
    pass: config.email.smtp.auth.pass,
  },
});

/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() =>
      logger.warn(
        'Unable to connect to email server. Make sure you have configured the SMTP options in .env'
      )
    );
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @param {string} html
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text, html) => {
  const msg = { from: config.email.from, to, subject, text, html };
  try {
    await transport.sendMail(msg);
    logger.info(`Email sent to ${to}`);
  } catch (error) {
    logger.error(`Error sending email to ${to}:`, error);
    throw error;
  }
};

/**
 * Compile Handlebars template
 * @param {string} templatePath
 * @param {Object} data
 * @returns {string}
 */
const compileTemplate = (templatePath, data) => {
  const source = fs.readFileSync(templatePath, 'utf8');
  const template = handlebars.compile(source);
  return template(data);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Set your new Atlassian password';
  const resetPasswordUrl = `${EMAIL_URL}/changePassword?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  const html = compileTemplate(
    path.join(__dirname, '../../views/emailTemplate.hbs'),
    { resetPasswordUrl }
  );
  await sendEmail(to, subject, text, html);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `${BASE_URL}/auth/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

const transporter = nodemailer.createTransport({
  host: config.shareBoardEmail.smtp.host,
  port: config.shareBoardEmail.smtp.port,
  secure: config.shareBoardEmail.smtp.port === 465,
  auth: {
    user: config.shareBoardEmail.smtp.auth.user,
    pass: config.shareBoardEmail.smtp.auth.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});


const shareBoardMails = async ({
  toEmails = [],
  fromEmail,
  subject,
  boardName,
  boardLink,
  note,
  hostName,
  toEmail,
  fromName,
  fromUserName,
  boardOwnerName,
}) => {
  const sendResults = [];

  const sendEmail = async (to, htmlContent) => {
    const mailOptions = { from: `${fromName || fromEmail}`, to, subject, html: htmlContent };
    try {
      await transporter.sendMail(mailOptions);
      sendResults.push({ to, status: 'sent' });
      console.log(`Email sent successfully to ${to}!`);
    } catch (error) {
      console.log(`Failed to send email to ${to}:`, error);
      sendResults.push({ to, status: 'failed' });
    }
  };

  if (fromName && fromUserName && boardOwnerName && toEmail) {
    const htmlContent = requestToAddBoardMail({ toEmail, fromEmail, boardName, fromUserName, boardLink, boardOwnerName });
    await sendEmail(toEmail, htmlContent);
  }

  const htmlContent = shareBoardMail({ boardName, boardLink, note, hostName });
  await Promise.all(toEmails.map(email => sendEmail(email, htmlContent)));

  return sendResults;
};



module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  shareBoardMails,
};
