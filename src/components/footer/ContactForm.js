import React, { useState } from "react"
import styled from "styled-components"
import { Fade } from "react-reveal"
import { Button, Form, FormField, TextArea, Paragraph } from "grommet"
import postSubmission from "../../lib/postSubmission"

const HiddenField = styled.div`
  display: none;
  height: 0;
`
const NETLIFY_FORM_NAME = `cearth-contact`

export default () => {
  const [submitted, setSubmitted] = useState(false)
  const [message, setMessage] = useState(``)

  const formSubmitted = async evt => {
    const action = evt.target.action
    const body = {
      ...evt.value,
      message,
    }

    try {
      const response = await postSubmission(NETLIFY_FORM_NAME, body)
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
      name={NETLIFY_FORM_NAME}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="important-note-field"
      onSubmit={formSubmitted}
    >
      <FormField name="email" type="email" placeholder="Your@emailaddre.ss" />
      <HiddenField>
        <label>
          Another field for you to fill: <input name="important-note-field" />
        </label>
        <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
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
