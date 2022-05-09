const axios = require("axios");
const NodeMailer = require('nodemailer')
 
// メール送信関数
function sendMail (smtpData, mailData) {
 
  // SMTPサーバの情報をまとめる
  const transporter = NodeMailer.createTransport(smtpData)
 
  // メール送信
  transporter.sendMail(mailData, function (error, info) {
    if (error) {
      // エラー処理
      console.log(error)
    } else {
      // 送信時処理
      console.log('Email sent: ' + info.response)
    }
  })
}
 
 
// メイン処理
function main() {
  // SMTP情報を格納（Gmailの場合）
  const smtpData = {
    host: 'goat-white-0f95da46fac3796a.znlc.jp', // Gmailのサーバ
    port: '465',            // Gmailの場合　SSL: 465 / TLS: 587
    secure: true,           // true = SSL
    auth: {
      user: 'cloto@icraft.jp',  // メールアドレス（自身のアドレスを指定）
      pass: process.env.MAIL_PASSWORD            // パスワード（自身のパスワードを指定）
    }
  }
 
  Promise.all([axios.default.get("http://ic-mailaccounts.icraft.local:3000/api/mailing_list/refresh"),
  axios.default.get("http://ic-mailaccounts.icraft.local:3000/api/mail_accounts/refresh")]).then((res)=> {
        // 送信内容を作成
  const mailData = {
    from: '"テストユーザ" <' + smtpData.auth.user + '>', // 送信元名
    to: 'kajiwara.k@icraft.jp', // 送信先
    subject: 'crone ic-mailaccounts', // 件名
    text: `${JSON.stringify(res[0].data)}\n${JSON.stringify(res[1].data)}`,                              // 通常のメール本文
    html: `
    <div>
        <h5>http://ic-mailaccounts.icraft.local:3000/api/mailing_list/refresh</h5>
        <p>${JSON.stringify(res[0].data)}</p>
    </div>
    <div>
        <h5>http://ic-mailaccounts.icraft.local:3000/api/mail_accounts/refresh</h5>
        <p>${JSON.stringify(res[1].data)}</p>
    </div>
    `,                       // HTMLメール
  }
    sendMail(smtpData, mailData)
  })
}
 
// 実行
main()