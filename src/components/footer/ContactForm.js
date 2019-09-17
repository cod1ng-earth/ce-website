import React, { useState } from "react"

import { Button, Form, FormField, TextArea } from "grommet"

export default () => {
  const [submitted, setSubmitted] = useState(false)
  const [message, setMessage] = React.useState(``)

  const formSubmitted = evt => {
    setSubmitted(true)
  }

  return (
    <Form>
      <FormField name="email" type="email" placeholder="Your@emailaddre.ss" />
      <TextArea
        focusIndicator={true}
        resize="vertical"
        placeholder="your message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      {!submitted && <Button type="submit" primary label="Submit" />}
    </Form>
  )
}
