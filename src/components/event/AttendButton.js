import emailValidator from 'email-validator'
import { Box, Button, TextInput } from 'grommet'
import React, { useEffect, useState } from 'react'

export default function AttendButton({ meetupId, user, setAttending }) {
  const [email, setEmail] = useState(user.email)
  const [submittable, setSubmittable] = useState(false)

  useEffect(() => {
    setSubmittable(emailValidator.validate(email))
  }, [email])

  async function attend(email) {
    try {
      const body = JSON.stringify({
        name: user.name,
        email,
        nickname: user.nickname,
        meetup: meetupId,
      })

      const result = await fetch('/.netlify/functions/attend', {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
      })

      const attending = JSON.parse(localStorage.getItem('attending') || '{}')
      attending[meetupId] = true
      localStorage.setItem('attending', JSON.stringify(attending))
      setAttending(true)
    } catch (e) {
      //alert('uhoh, something went wrong')
    }
  }

  return (
    <Box direction="row" gap="small">
      <TextInput
        placeholder="your@email-addre.ss"
        value={email}
        size="small"
        onChange={event => setEmail(event.target.value)}
      />
      <Button
        onClick={() => attend(email)}
        primary
        color="orange-400"
        disabled={!submittable}
        alignSelf="center"
        label="Attend"
        size="medium"
      />
    </Box>
  )
}
