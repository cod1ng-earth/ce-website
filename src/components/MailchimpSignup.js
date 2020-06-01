import React, { useEffect, useState } from 'react'
import emailValidator from 'email-validator'
import styled from 'styled-components'
import { Anchor, Box, Button, Paragraph, TextInput } from 'grommet'
import { MailOption } from 'grommet-icons'
import { theme } from './theme'

/*const StyledButton = styled(Button)`
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  float: right;
`
*/

const PurpleInput = styled(TextInput)`
  background: ${theme.global.colors['purple-400']};
  border: 1px solid ${theme.global.colors['purple-400']};
  color: ${theme.global.colors['purple-700']};
  padding: 16px;
`

export function MailchimpSignup() {
  const [email, setEmail] = useState('')
  const [submittable, setSubmittable] = useState(false)

  useEffect(() => {
    setSubmittable(emailValidator.validate(email))
  }, [email])

  return (
    <form
      action="https://turbinekreuzberg.us11.list-manage.com/subscribe/post?u=05926695701a0c84bb46a9565&amp;id=43afc41a19"
      method="post"
    >
      <Box margin={{ top: 'medium' }}>
        <PurpleInput
          type="email"
          value={email}
          name="EMAIL"
          className="email"
          id="mce-EMAIL"
          placeholder="john.doe@coding.earth"
          required
          onChange={evt => setEmail(evt.target.value)}
        />

        <Paragraph fill color="purple-100" size="small">
          You can unsubscribe at any time by clicking the link in the footer of
          our emails. For information about our privacy practices, please visit
          our website.
        </Paragraph>
        <Paragraph fill color="purple-100" size="small">
          We use Mailchimp as our marketing platform. By clicking below to
          subscribe, you acknowledge that your information will be transferred
          to Mailchimp for processing.{' '}
          <Anchor href="https://mailchimp.com/legal/" target="_blank">
            Learn more about Mailchimp's privacy practices here.
          </Anchor>
        </Paragraph>

        <div
          style={{
            position: 'absolute',
            left: '-5000px',
          }}
          aria-hidden="true"
        >
          <input
            type="text"
            name="b_05926695701a0c84bb46a9565_43afc41a19"
            tabIndex="-1"
          />
        </div>
      </Box>
      <Box>
        <Button
          primary
          icon={<MailOption />}
          type="submit"
          name="subscribe"
          label="Subscribe"
          value="Subscribe"
          disabled={!submittable}
          alignSelf="end"
          color="purple-700"
        />
      </Box>
    </form>
  )
}
