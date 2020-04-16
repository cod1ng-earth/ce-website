import emailValidator from 'email-validator'
import { graphql, useStaticQuery } from 'gatsby'
import { default as Img } from 'gatsby-image'
import { Box, Button, Heading, Paragraph, Text, TextInput } from 'grommet'
import { Checkmark, Github } from 'grommet-icons'
import React, { useEffect, useState } from 'react'
import { useAuth0 } from './auth/react-auth0-spa'
import Talk from './Talk'
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
          <Img
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
            will have three sessions:
          </Paragraph>

          <Box background="dark-1" pad="medium">
            <Talk
              name="Filipe Barroso"
              company={{
                url: 'https://www.gdglisbon.xyz/',
                name: 'GDG Lisbon',
              }}
              link="https://twitter.com/ABarroso"
              image="//pbs.twimg.com/profile_images/973591262686302209/luVnG3Bn_400x400.jpg"
              origin="Lisbon"
              title="What is Flutter and why should you care about it?"
            >
              The Flutter SDK by Google is the new Open Source UI SDK to create
              native applications with one codebase. At the end of the talk, you
              will understand the decisions behind Flutter, why it is so
              different from other mobile development tools and platforms, and
              why are so many developers already addicted to it.
            </Talk>

            <Talk
              name="Brooklyn Zelenka"
              company={{
                url: 'https://fission.codes/',
                name: 'fission.codes',
              }}
              link="https://twitter.com/expede"
              image="//pbs.twimg.com/profile_images/1176524572423639042/hT2G40Gd_400x400.jpg"
              origin="Vancouver"
              title="how you can authenticate users safely without a backend?"
            >
              Web apps are too complex - what if we got rid of the back end? It
              turns out that we can push most things into the browser. In this
              talk, Brooklyn will talk about doing secure auth without requiring
              an auth server, plus a bit about the broader project of making the
              browser all you need.
            </Talk>

            <Talk
              name="Jesse Martin"
              company={{
                url: 'https://graphcms.com/',
                name: 'GraphCMS',
              }}
              link="https://twitter.com/motleydev"
              image="//pbs.twimg.com/profile_images/1204366626738622466/ufPGhfrp_400x400.jpg"
              origin="Constance"
              title="All About Headless with the New GraphCMS"
            >
              join us for an entertaining talk about the benefits of a headless
              CMS, see a demo of the new GraphCMS and learn a few new features
              about GraphQL along the way!
            </Talk>
          </Box>

          <Paragraph fill>
            All contributions follow our golden "*1 line of code*" rule, so
            demos and live code will be abound. You don't have to register to
            get into our stream but if you do, we send you updates (and nothing
            else) like the final YouTube URL of the stream before the event.
          </Paragraph>
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
