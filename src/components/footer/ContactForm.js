import React, { useState } from "react"
import styled from "styled-components"
import { Fade } from "react-reveal"
import { Button, Form, FormField, TextArea, Paragraph } from "grommet"

const HiddenField = styled.div`
  display: none;
  height: 0;
`

export default () => {
  const [submitted, setSubmitted] = useState(false)
  const [message, setMessage] = useState(``)

  const formSubmitted = async evt => {
    const action = evt.target.action
    const body = JSON.stringify({
      ...evt.value,
      message,
    })

    try {
      const response = await fetch(action, { method: `POST`, body })
      console.log(response)
    } catch (e) {
      console.error(e)
    }

    setSubmitted(true)
  }

  return submitted ? (
    <Fade bottom distance="40px" duration={2000}>
      <Paragraph
        color="turqoise"
        textAlign="center"
        style={{ fontWeight: `bolder` }}
      >
        We received your messsage. <br /> Please standby.
      </Paragraph>
    </Fade>
  ) : (
    <Form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="important-note-field"
      onSubmit={formSubmitted}
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
