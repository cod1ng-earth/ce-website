require('dotenv').config()

const fetch = require('node-fetch').default

exports.handler = async function(event, context) {
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

  try {
    const res = await fetch(process.env.SLACK_ATTEND_HOOK, {
      method: 'POST',
      body: body,
      headers: { 'Content-Type': 'application/json' },
    })
    const text = await res.text()
    return {
      statusCode: 200,
      body: JSON.stringify({ status: text }),
    }
  } catch (foo) {
    console.error(foo)
    return {
      statusCode: 500,
      body: JSON.stringify({ status: foo }),
    }
  }
}
