import nodemailer, { SentMessageInfo } from 'nodemailer'
import handlebars from 'handlebars'
import fs from 'fs'
import path from 'path'
import config from '../config/environments/index'
import axios from 'axios'
// const OneSignal = require('onesignal-node');

// const client = new OneSignal.Client('f10f4fad-bb50-4e88-ad8f-813e89803883', 'NmFhNzRhNWQtZmZkYi00Y2Q0LTg5NmQtOTEyMTU5ZTBiYzY3');

export const sendEmail = async ({
  //*Depredaco
  template,
  to,
  title,
  content,
}: {
  template: string
  to: string
  title: string
  content: object
}) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, '../templates/', template), (err, data: Buffer) => {
      if (err) reject(err)
      const source = data.toString()
      const template_handlebars = handlebars.compile(source)
      const mailBody = template_handlebars(content)
      const transporter = nodemailer.createTransport({
        service: config.SEND_TRANSPORTER,
        auth: {
          user: config.SENDER,
          pass: config.SENDER_PASS,
        },
      })
      const mailOptions = {
        from: config.SENDER_ALIAS, // sender address
        to: to, // list of receivers
        subject: title, // Subject line
        text: mailBody, // plaintext body
        html: mailBody, // html body
      }
      transporter.sendMail(
        mailOptions,
        function (err: Error | null, info: SentMessageInfo) {
          if (err) reject(err)
          resolve(info)
        }
      )
    })
  })
}
export const sendMailAxios = async ({
  to,
  title,
  template,
}: {
  to: string
  title: string
  template: string
}) => {
  try {
    // const data: any = await fsasync.readFile(
    //   path.join(__dirname, '../templates/', template)
    // )
    // const template_handlebars: HandlebarsTemplateDelegate<any> = handlebars.compile(
    //   data.toString()
    // )

    // const mailBody = template_handlebars(content)

    return await axios({
      url: 'https://api.sendgrid.com/v3/mail/send',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.SENDGRID_KEY}`,
        'Content-Type': 'application/json',
      },
      data: {
        personalizations: [{ to: [{ email: to }] }],
        from: { email: config.SENDER_ALIAS },
        subject: title,
        content: [{ type: 'text/html', value: template }],
      },
    })
  } catch (err) {
    throw err
  }
}


 

// const notification = {
//     contents: {
//         'tr': 'Hey que tal ',
//         'en': 'xddddd',
//     },
//     // included_segments: ['Subscribed Users'], // toplu mesaj gönderme
//     include_player_ids: ['e773f64b-e2f5-4182-897f-1bbec619e8a9'] // kişiye özel mesaj gönderme
// };

// export async function SendNotificationForUsers(notification:any) {
//     try {

//         const response = await client.createNotification(notification);
//         console.log(response)
//         console.log(response.body.id);
//     } catch (e:any) {
//         if (e instanceof OneSignal.HTTPError) {
//             // When status code of HTTP response is not 2xx, HTTPError is thrown.
//             console.log(e.statusCode);
//             console.log(e.body);
//         }
//     }

// }
