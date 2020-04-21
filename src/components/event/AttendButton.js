import emailValidator from 'email-validator'
import { Box, Button, Text, TextInput } from 'grommet'
import React, { useEffect, useState } from 'react'
import { theme } from '../theme'
const colors = theme.global.colors

export default function AttendButton({ user }) {
  const [email, setEmail] = useState(user.email)
  const [submittable, setSubmittable] = useState(false)

  useEffect(() => {
    setSubmittable(emailValidator.validate(email))
  }, [email])

  async function attend(email, setAttending) {
    try {
      const body = JSON.stringify({
        name: user.name,
        email,
        nickname: user.nickname,
        meetup: 'global_1',
      })

      const result = await fetch('/.netlify/functions/attend', {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
      })

      const attending = JSON.parse(localStorage.getItem('attending') || '{}')
      attending['global_1'] = true
      localStorage.setItem('attending', JSON.stringify(attending))
      setAttending(true)
    } catch (e) {
      alert('uhoh, something went wrong')
    }
  }

  return (
    <Box
      direction="row"
      width="large"
      alignSelf="center"
      align="center"
      gap="small"
    >
      <Text>Notify</Text>
      <TextInput
        placeholder="your@email-addre.ss"
        value={email}
        onChange={event => setEmail(event.target.value)}
      />
      <Text>and</Text>
      <Button
        onClick={() => attend(email)}
        color={colors['meetup-red']}
        primary
        disabled={!submittable}
        alignSelf="center"
        label="Attend"
      />
    </Box>
  )
}
