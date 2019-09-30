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

const ThankYou = () => (
  <Fade bottom distance="40px" duration={2000}>
    <Paragraph
      color="turqoise"
      textAlign="center"
      style={{ fontWeight: `bolder` }}
    >
      We received your message. <br /> Please standby.
    </Paragraph>
  </Fade>
)

const TheForm = ({ submitForm }) => {
  const [body, setBody] = useState({
    message: ``,
    email: ``,
  })

  const disabled = body.message.length < 5 || body.email.length < 5

  return (
    <Form
      name={NETLIFY_FORM_NAME}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="important-note-field"
      onSubmit={() => submitForm(body)}
    >
      <FormField
        aria-label="your email address"
        name="email"
        type="email"
        placeholder="Your@emailaddre.ss"
        onChange={e => setBody({ ...body, email: e.target.value })}
      />
      <HiddenField>
        <label>
          Another field for you to fill:{` `}
          <input
            aria-label="dont fill this field if youre not a machine"
            name="important-note-field"
          />
        </label>
        <input
          type="hidden"
          name="form-name"
          aria-label="a technical field thats filled automatically"
          value={NETLIFY_FORM_NAME}
        />
      </HiddenField>

      <TextArea
        name="message"
        focusIndicator={true}
        resize="vertical"
        ariaLabel="your message for us"
        placeholder="your message"
        value={body.message}
        onChange={e => setBody({ ...body, message: e.target.value })}
      />
      <Button
        type="submit"
        color="brand"
        disabled={disabled}
        primarymessage
        fill="horizontal"
        label="Submit"
        margin={{ top: `medium` }}
      />
    </Form>
  )
}

export default () => {
  const [submitted, setSubmitted] = useState(false)

  const submitForm = async body => {
    try {
      const response = await postSubmission(NETLIFY_FORM_NAME, body)
    } catch (e) {
      console.error(e)
    }
    setSubmitted(true)
  }

  return submitted ? <ThankYou /> : <TheForm submitForm={submitForm} />
}
