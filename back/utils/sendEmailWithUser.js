const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const sendEmailWithUser = async (
  subject,
  send_to,
  sent_from,
  reply_to,
  template,
  name,
  link
) => {
  // Create Email Transporter
  console.log("Creating Email Transporter calling");
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: "shivareddy1287@outlook.com",
      pass: "s@1122334455",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const handlearOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlearOptions));

  // Options f0r sending email
  const options = {
    from: sent_from,
    to: send_to,
    replyTo: reply_to,
    subject,
    template,
    context: {
      name,
      link,
    },
  };

  // Send Email
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmailWithUser;
