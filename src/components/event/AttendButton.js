import emailValidator from 'email-validator'
import { Box, Button, TextInput } from 'grommet'
import React, { useEffect, useState } from 'react'
import { useAuth0 } from '../auth/react-auth0-spa'

export default function AttendButton({ meetupId, user, setAttending }) {
  const [email, setEmail] = useState(user.email)
  const [submittable, setSubmittable] = useState(false)
  const { getTokenSilently } = useAuth0()

  useEffect(() => {
    setSubmittable(emailValidator.validate(email))
  }, [email])

  async function attend(email) {
    try {
      if (!emailValidator.validate(email))
        return alert('You must enter a valid email address')

      const silentToken = await getTokenSilently()
      const body = JSON.stringify({
        name: user.name,
        email,
        nickname: user.nickname,
        meetup: meetupId,
      })

      const result = await fetch('/.netlify/functions/attend', {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${silentToken}`,
        },
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
