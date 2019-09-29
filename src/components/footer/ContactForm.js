import React, { useState } from "react"
import styled from "styled-components"

import { Button, Form, FormField, TextArea, Paragraph } from "grommet"

const HiddenField = styled.input`
  display: "none";
  height: 0;
`

export default () => {
  const [submitted, setSubmitted] = useState(false)
  const [message, setMessage] = useState(``)

  return submitted ? (
    <Paragraph> Thank you</Paragraph>
  ) : (
    <Form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="important-note-field"
    >
      <FormField name="email" type="email" placeholder="Your@emailaddre.ss" />
      <HiddenField>
        <label>
          Another field for you to fill: <input name="important-note-field" />
        </label>
      </HiddenField>

      <TextArea
        name="message"
        focusIndicator={true}
        resize="vertical"
        placeholder="your message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <Button
        type="submit"
        color="brand"
        fill
        primary
        label="Submit"
        margin={{ top: `medium` }}
      />
    </Form>
  )
}
