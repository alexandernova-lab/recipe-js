const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const sendEmail = ({ view, data, from, to, subject }) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b0f9ea4c5905c8",
      pass: "5095a740ffe3ea",
    },
  });

  ejs.renderFile(
    path.join(__dirname, "../views", `${view}.ejs`),
    data,
    async (err, dataString) => {
      console.log(err);
      transport.sendMail(
        {
          from,
          to,
          subject,
          html: dataString,
        },
        (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log("Message sent: %s", info.messageId);
        },
      );
    },
  );
};

module.exports = sendEmail;
