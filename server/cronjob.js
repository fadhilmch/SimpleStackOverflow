const cron = require('node-cron');
const nodemailer = require('nodemailer');
const kue = require ('kue')
const queue = kue.createQueue()


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      type: 'OAuth2',
      user: 'fadhilmch.sampah@gmail.com',
      clientId: '919548115379-9pj5b3poarqqu5kec2apjbdlma4aaric.apps.googleusercontent.com',
      clientSecret: 'KRsls8EjlpWdqL1zbw9Ri_uR',
      refreshToken: '1/XY1M6Np9OHaxqxPTogpn-xBHMzBu2xgOlS7vb-ppCvU',
      // accessToken: 'ya29.GlyJBYX_-e3HrBys4P2fOLtv0RwL5cJvBklKRlqIi7my_60_frs8EsnRt63ctqVN5kXH67GdDj59hMh0fMKdoz-1VYPASfWho4C27ZUYq813MR5rOfHDt4aTg6U6SA'
  }
})

console.log('starting cron job')

cron.schedule('* */5 * * * *', function() {
  console.log('delivering your mails...')

  queue.process('email', 10, function (job, done) {
    let payload = job.data

    const mailOptions = {
      from: "Tanya? Notification Service ✔ <fadhilmch.sampah@gmail.com>",
      to: payload.to, // list of receivers
      subject: payload.title, // Subject line
      html: `<p><strong>${payload.answeringName}</strong> has answered your question</p>
      <p><strong>${payload.answer}</strong></p>`// plain text body
    };

    transporter.sendMail(mailOptions, function(error, response){
      if(error){
        console.log('masuk error')
        console.log(error);
      }else{
        console.log('ga erorr')
        console.log("Message sent: " + response.message);
        console.log(response)
        done()
      }
    })
  })
})
