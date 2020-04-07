require('dotenv').config()

const fetch = require('node-fetch')

exports.handler = async function(event, context, lambdaCallback) {
  const _incoming = JSON.parse(event.body)

  const incoming = {
    name: _incoming.name,
    email: _incoming.email,
    ref: _incoming.nickname,
    meetup: _incoming.meetup,
  }

  const body = JSON.stringify({
    text: `${incoming.email} <${incoming.name}> (${incoming.ref}) registered for ${incoming.meetup}`,
  })

  const res = await fetch(process.env.SLACK_ATTEND_HOOK, {
    method: 'POST',
    body,
  })
  const result = await res.text()

  return lambdaCallback(null, {
    statusCode: 200,
    body: result,
  })
}
