var nodemailer = require('nodemailer');
var gmailNode = require('gmail-node');
var clientsecret = require('./client-secret.json');

gmailNode.init(clientsecret, './token.json', function(err,data){
if (err) {
  console.log(err);
}
else {
  console.log(data);
}
});

var emailMessage = {
  to: 'danjonesretired@gmail.com, cbjpotter@gmail.com',
  subject: 'test subject',
  message: 'test email'
}

gmailNode.send(emailMessage, function(err,data){
  if (err) {
    console.log(err);
  }
  else {
    console.log(data);
  }
});
// var transporter = nodemailer.createTransport({
//   sendMail: true,
//   // host: smtp@gmail.com,
//   port:33060,
//   secure: true,
//   auth: {
//     user: "samuelriley1393@gmail.com",
//     pass: 'i<3raichu88'
//   }
// });
// var mailOptions = {
//   from:'"Sambo" <samuelriley1393@gmail.com',
//   //
//
// to:'cbjpotter@gmail.com, samuelriley1393@gmail.com, danjonesretired@gmail.com',
// subject: 'Hi, from nodemailer',
// text: 'Hello world?'
// };
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     return console.log(error);
//   }
//   console.log("Message sent", info.messageId);
// });
