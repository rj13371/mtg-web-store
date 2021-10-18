const nodemailer = require("nodemailer");

const { MAIL_USERNAME, MAIL_PASSWORD, OAUTH_CLIENTID, OAUTH_CLIENT_SECRET,OAUTH_REFRESH_TOKEN } = require('../config')

const sendEmail = async (action,email, subject, text, uniqueString ) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      auth: {
        type: 'OAuth2',
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
        clientId: OAUTH_CLIENTID,
        clientSecret: OAUTH_CLIENT_SECRET,
        refreshToken: OAUTH_REFRESH_TOKEN
      }

    });

    if (action == 'createUser'){

        await transporter.sendMail({
            from: MAIL_USERNAME,
            to: email,
            subject: subject,
            html: `Press <a href=http://localhost:5000/users/verify/${uniqueString}> here </a> to verify your email at Bastion Games. Thank you`,
          });
          console.log("email sent sucessfully");

    }

    else if (action == 'resetPassword'){

    await transporter.sendMail({
      from: MAIL_USERNAME,
      to: email,
      subject: subject,
      html: `Press <a href=${text}> here </a> to reset your Bastion Games Account. Thank you`,
    });
    }

    else if (action == 'resetPasswordConfirmation'){

        await transporter.sendMail({
          from: MAIL_USERNAME,
          to: email,
          subject: subject,
          html: `Hello ${text}, Password successfully reset! `,
        });
        }


    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

module.exports = sendEmail;