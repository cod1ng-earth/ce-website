import emailValidator from 'email-validator'
import { graphql, useStaticQuery } from 'gatsby'
import Image from 'gatsby-image'
import {
  Anchor,
  Box,
  Button,
  Heading,
  Paragraph,
  Text,
  TextInput,
} from 'grommet'
import { Checkmark, Github, UserNew } from 'grommet-icons'
import React, { useEffect, useState } from 'react'
import { useAuth0 } from './auth/react-auth0-spa'
import { theme } from './theme'
const colors = theme.global.colors

function SignupButton({ user, attend }) {
  const [email, setEmail] = useState(user.email)
  const [submittable, setSubmittable] = useState(false)

  useEffect(() => {
    setSubmittable(emailValidator.validate(email))
  }, [email])

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

export default function() {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0()
  const [attending, setAttending] = useState(false)

  const data = useStaticQuery(graphql`
    {
      image: imageSharp(
        resize: { originalName: { eq: "coding_earth_meetup.png" } }
      ) {
        fluid(maxWidth: 800, maxHeight: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  `)

  async function attend(email) {
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

  useEffect(() => {
    const attending = JSON.parse(localStorage.getItem('attending') || '{}')
    if (attending['global_1']) {
      setAttending(true)
    }
  }, [])

  return (
    <Box pad="none" margin="none">
      <Box pad={{ vertical: 'medium' }}>
        <Box direction="row-responsive" justify="between" align="center">
          <Heading level={3} color="brand">
            coding earth global meetup #1
          </Heading>
          <Text size="medium">Apr 21st 2020, 7PM CEST</Text>
        </Box>
        <Box>
          <Image
            objectFit="contain"
            objectPosition="0% 0%"
            durationFadeIn={5000}
            fluid={data.image.fluid}
          />
          <Paragraph fill>
            Our <b>first worldwide coding earth meetup</b> will take place on{' '}
            <b>Tuesday, April 21st, 2020</b>. And of course - no surprise here -
            we're going fully remote. We're hereby trying to bring together our
            local chapters (Stuttgart, Leipzig, Berlin &amp; Porto, Lisbon, Faro
            / Portugal) in one global community. Mark your calendars for the
            21st, grab a cold beverage that night and come join us! The meetup
            will have three sessions, one of which are already can announce:
          </Paragraph>

          <Text>
            <Anchor
              href="https://twitter.com/ABarroso"
              target="_blank"
              rel="noopener"
            >
              Filipe Barroso
            </Anchor>{' '}
            (Lisbon) will give an intro to Google's{' '}
            <Anchor href="https://flutter.dev/" target="_blank">
              Flutter
            </Anchor>{' '}
            SDK{' '}
          </Text>

          {/*<Text>
            <Anchor
              href="https://twitter.com/PhillipKessels"
              target="_blank"
              rel="noopener"
            >
              Phillip Kessels
            </Anchor>{' '}
            (Porto) will give a talk on the Web Audio API.
          </Text>*/}

          <Paragraph fill>
            All contributions follow our golden "*1 line of code*" rule, so
            demos and live code will be abound. You don't have to register to
            get into our stream but if you do, we send you updates (and nothing
            else) like the final YouTube URL of the stream before the event.
          </Paragraph>
          <Box direction="row" align="center" background="turqoise" gap="large">
            <Box pad="medium">
              <UserNew size="large" />
            </Box>
            <Box>
              <Paragraph fill>
                we're still looking for contributions, so don't be shy to share
                20 minutes of your lifetime and enlighten other developers
                around the world with the stuff you've recently been working on
                and what you're proud of having achieved during quarantine.
                Simply{' '}
                <Anchor href="mailto://info@coding-earth.com?subject=I want a talk slot at coding earth global meetup #1">
                  drop us a line
                </Anchor>{' '}
                and we'll promote you to the video stage :)
              </Paragraph>
            </Box>
          </Box>
        </Box>
      </Box>
      {attending ? (
        <Button
          color="status-ok"
          alignSelf="center"
          primary
          active={false}
          icon={<Checkmark />}
          disabled={!isAuthenticated}
          label="you are registered for this meetup"
        />
      ) : user ? (
        <SignupButton user={user} attend={attend} />
      ) : (
        <Text alignSelf="center" color="light-6">
          If you were{' '}
          <Button
            label="authenticated"
            icon={<Github />}
            onClick={() => loginWithRedirect()}
            color="dark-1"
          />{' '}
          you could signup for this event
        </Text>
      )}
    </Box>
  )
}
