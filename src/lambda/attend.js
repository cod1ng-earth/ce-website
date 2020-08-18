require('dotenv').config()

const fetch = require('node-fetch').default
const nodemailer = require('nodemailer')

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace)
}

async function fetchMeetupData(meetupId) {
  const body = {
    query: `query MyQuery($id: ID) {
        meetup(where: {id: $id}) {
          name
          time
          onlineUrl
          password
        }
      }
      `,
    variables: { id: meetupId },
  }
  const res = await fetch(process.env.GRAPHCMS_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  })
  const meetupData = await res.json()
  return meetupData.data
}

async function fetchUserData(authorizationToken) {
  const res = await fetch(process.env.AUTH0_USERINFO, {
    method: 'GET',
    headers: {
      Authorization: authorizationToken,
    },
  })
  //todo: check user id?
  if (res.status === 401) {
    console.error('user cant be authorized')
    return false
  }
  const userData = await res.json()
  return userData
}

function makeDates(time) {
  const fmtOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }
  const locales = [
    { name: 'UTC', locale: 'en-UK', tz: 'UTC' },
    { name: 'CET', locale: 'de-DE', tz: 'Europe/Berlin' },
    { name: 'WET', locale: 'pt', tz: 'Europe/Lisbon' },
    { name: 'ET', locale: 'us', tz: 'America/New_York' },
    { name: 'PT', locale: 'us', tz: 'America/Los_Angeles' },
  ]
  return locales.map(l => {
    const fmt = { ...fmtOptions, timeZone: l.tz }
    return { name: l.name, time: time.toLocaleString(l.locale, fmt) }
  })
}

async function sendMail(content, subject, mailAddress) {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SERVER,
    port: process.env.MAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  })
  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: mailAddress,
    subject,
    html: content,
  }
  return transporter.sendMail(mailOptions)
}

async function notifySlack(userData, meetup) {
  const body = JSON.stringify({
    text: `${userData.email} <${userData.name}> (${userData.nickname}) registered for ${meetup.name}`,
  })
  const res = await fetch(process.env.SLACK_ATTEND_HOOK, {
    method: 'POST',
    body: body,
    headers: { 'Content-Type': 'application/json' },
  })
  return await res.text()
}

export async function handler(event, context) {
  try {
    const { meetup, email } = JSON.parse(event.body)

    const userData = await fetchUserData(event.headers['authorization'])
    if (!userData) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          errorMessage:
            'Your authorization seems to be broken. Please login again.',
        }),
      }
    }
    userData.email = email

    console.debug(userData)
    const { meetup: meetupData } = await fetchMeetupData(meetup)
    console.debug(meetupData)
    const times = makeDates(new Date(meetupData.time))

    let mailContent = replaceAll(
      MAIL_TEMPLATE,
      '###USER_NAME###',
      userData.name
    )
    mailContent = replaceAll(mailContent, '###MEETUP_NAME###', meetupData.name)
    mailContent = replaceAll(
      mailContent,
      '###MEETUP_LINK###',
      meetupData.onlineUrl
    )
    mailContent = replaceAll(
      mailContent,
      '###MEETUP_PASSWORD###',
      meetupData.password
    )

    for (const t of times) {
      mailContent = replaceAll(
        mailContent,
        `###MEETUP_TIME_${t.name}###`,
        t.time
      )
    }
    const meetupDate = new Date(meetupData.time).toLocaleString('en-UK')
    const subject = `You're in, yay: ${meetupData.name} (${meetupDate})`

    const mailInfo = await sendMail(mailContent, subject, userData.email)

    console.debug('Message sent', mailInfo)

    notifySlack(userData, meetupData)

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `signed up: ${mailInfo.messageId}`,
      }),
    }
  } catch (e) {
    console.error('some error', e)
    return {
      statusCode: 500,
      body: JSON.stringify({
        errorMessage: e.message,
      }),
    }
  }
}

const MAIL_TEMPLATE = `<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title>Coding Earth Meetup</title><!--[if !mso]><!-- --><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }
body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
p { display:block;margin:13px 0; }</style><!--[if mso]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG/>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]--><!--[if lte mso 11]>
<style type="text/css">
.mj-outlook-group-fix { width:100% !important; }
</style>
<![endif]--><style type="text/css">@media only screen and (min-width:480px) {
.mj-column-per-100 { width:100% !important; max-width: 100%; }
.mj-column-per-50 { width:50% !important; max-width: 50%; }
}</style><style type="text/css">@media only screen and (max-width:480px) {
table.mj-full-width-mobile { width: 100% !important; }
td.mj-full-width-mobile { width: auto !important; }
}</style></head><body style="background-color:#333333;"><div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">Coding Earth Meetup</div><div style="background-color:#333333;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#222222;background-color:#222222;width:100%;"><tbody><tr><td><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:150px;"><img alt="" height="auto" src="data:image/png;base64,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" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="150"></td></tr></tbody></table></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;padding-top:0;word-break:break-word;"><div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:13px;font-weight:bold;letter-spacing:1px;line-height:20px;text-align:center;text-transform:uppercase;color:#E06C00;">###MEETUP_NAME###</div></td></tr></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="body-section-outlook" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div class="body-section" style="-webkit-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15); -moz-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15); box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15); margin: 0px auto; max-width: 600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0;padding-top:0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;padding-left:15px;padding-right:15px;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:570px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:20px;font-weight:bold;line-height:24px;text-align:left;color:#212b35;">Confirming your attendance</div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;line-height:24px;text-align:left;color:#637381;">Hi ###USER_NAME###,</div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;line-height:24px;text-align:left;color:#637381;">This is for letting you know that you've registered for <b>###MEETUP_NAME###</b> successfully. We're happy to have you aboard this time :)</div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;line-height:24px;text-align:left;color:#637381;">Here's your join link and a password to get into the session. Please make sure to <b>not</b> share it with anyone you don't trust to prevent Zoom bombers.</div></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;line-height:24px;text-align:center;color:#637381;">Link: <a href="###MEETUP_LINK###" class="text-link" style="color: #E06C00;">###MEETUP_LINK###</a></div></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;line-height:24px;text-align:center;color:#637381;">Password: ###MEETUP_PASSWORD###</div></td></tr></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table></td></tr><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;padding-left:15px;padding-right:15px;padding-top:0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:570px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tr><td style="font-size:0px;padding:10px 25px;word-break:break-word;"><p style="border-top:solid 1px #DFE3E8;font-size:1px;margin:0px auto;width:100%;"></p><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #DFE3E8;font-size:1px;margin:0px auto;width:520px;" role="presentation" width="520px" ><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table><![endif]--></td></tr></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table></td></tr><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:0 15px 0 15px;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:570px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;line-height:24px;text-align:left;color:#637381;">We're looking forward meeting you.</div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;line-height:24px;text-align:left;color:#637381;">Stefan, Joao, Lars &amp; Thomas</div></td></tr></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table></td></tr><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;padding-left:15px;padding-right:15px;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:570px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tr><td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:0;word-break:break-word;"><div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:24px;text-align:left;text-transform:uppercase;color:#212b35;">###MEETUP_NAME###</div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;padding-top:0;word-break:break-word;"><div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:14px;font-weight:400;line-height:24px;text-align:left;color:#637381;">UTC (London): ###MEETUP_TIME_UTC###<br>CET (Berlin): ###MEETUP_TIME_CET###<br>WET (Lisbon): ###MEETUP_TIME_WET###<br>ET (New York): ###MEETUP_TIME_ET###<br>PT (Los Angeles): ###MEETUP_TIME_PT###<br></div></td></tr></table></div><!--[if mso | IE]></td><td class="" style="vertical-align:top;width:285px;" ><![endif]--><div class="mj-column-per-50 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"><tbody><tr><td style="vertical-align:top;padding:0;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"><tr><td align="center" style="font-size:0px;padding:0;word-break:break-word;"><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" ><tr><td><![endif]--><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;"><tr><td style="padding:4px;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#9E66D4;border-radius:3px;width:30px;"><tr><td style="font-size:0;height:30px;vertical-align:middle;width:30px;"><a href="http://github.com/cod1ng-earth/" target="_blank"><img height="30" src="https://www.mailjet.com/images/theme/v1/icons/ico-social/github.png" style="border-radius:3px;display:block;" width="30"></a></td></tr></table></td></tr></table><!--[if mso | IE]></td><td><![endif]--><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;"><tr><td style="padding:4px;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#9E66D4;border-radius:3px;width:30px;"><tr><td style="font-size:0;height:30px;vertical-align:middle;width:30px;"><a href="https://twitter.com/coding_earth" target="_blank"><img height="30" src="https://www.mailjet.com/images/theme/v1/icons/ico-social/twitter.png" style="border-radius:3px;display:block;" width="30"></a></td></tr></table></td></tr></table><!--[if mso | IE]></td></tr></table><![endif]--></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:12px;font-weight:400;line-height:16px;text-align:center;color:#8040BF;">You are receiving this email because you signed up for this event at https://coding.earth (If you think you got this email in error, let us know: <a href="https://coding.earth/imprint" style="color: #FF9900;">https://coding.earth/imprint</a>).</div></td></tr></table></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div></body></html>`
