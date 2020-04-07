import emailValidator from 'email-validator'
import {
  Anchor,
  Box,
  Button,
  CheckBox,
  FormField,
  Paragraph,
  Text,
  TextInput,
} from 'grommet'
import { Mail } from 'grommet-icons'
import React, { useEffect, useState } from 'react'

export function MailchimpSignup(props) {
  const [email, setEmail] = useState('')
  const [emailChecked, setEmailChecked] = useState(false)
  const [submittable, setSubmittable] = useState(false)

  useEffect(() => {
    setSubmittable(emailValidator.validate(email) && emailChecked)
  }, [email, emailChecked])

  return (
    <form
      action="https://turbinekreuzberg.us11.list-manage.com/subscribe/post?u=05926695701a0c84bb46a9565&amp;id=43afc41a19"
      method="post"
      style={{ position: 'relative' }}
    >
      <FormField label="email">
        <TextInput
          type="email"
          value={email}
          name="EMAIL"
          className="email"
          id="mce-EMAIL"
          placeholder="email address"
          required
          onChange={evt => setEmail(evt.target.value)}
        />
      </FormField>

      <Box direction="row">
        <Text>
          Please select all the ways you would like to hear from coding earth:
        </Text>
        <CheckBox
          checked={emailChecked}
          label="Email"
          id="gdpr_26026"
          name="gdpr[26026]"
          value="Y"
          toggle
          onChange={evt => setEmailChecked(evt.target.checked)}
        />
      </Box>
      <Paragraph fill size="small">
        You can unsubscribe at any time by clicking the link in the footer of
        our emails. For information about our privacy practices, please visit
        our website.
      </Paragraph>
      <Paragraph fill size="small">
        We use Mailchimp as our marketing platform. By clicking below to
        subscribe, you acknowledge that your information will be transferred to
        Mailchimp for processing.{' '}
        <Anchor href="https://mailchimp.com/legal/" target="_blank">
          Learn more about Mailchimp's privacy practices here.
        </Anchor>
      </Paragraph>

      <div
        style={{
          position: 'absolute',
          left: '-5000px',
        }}
        ariaHidden="true"
      >
        <input
          type="text"
          name="b_05926695701a0c84bb46a9565_43afc41a19"
          tabIndex="-1"
        />
      </div>

      <Button
        icon={<Mail />}
        type="submit"
        name="subscribe"
        label="Subscribe"
        value="Subscribe"
        primary
        color="brand"
        disabled={!submittable}
      />
    </form>
  )
}
