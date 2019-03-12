require('dotenv').config();
const nodemailer = require('nodemailer');

function send_mail(subject, email, message){

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD
        }
      });
      
      var mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: email,
        subject: subject,
        text: message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });


}

module.exports = send_mail;