import { Heading, Box, Text, Paragraph, Button } from 'grommet'
import { ScheduleNew, Checkmark } from 'grommet-icons'
import React, { useState, useEffect } from 'react'

import { FullWidth } from './TwoCols'
import Image from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'
import { useAuth0 } from './auth/react-auth0-spa'
import { theme } from './theme'
const colors = theme.global.colors

export default function() {
  const { isAuthenticated, user } = useAuth0()
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

  async function attend() {
    const body = {
      name: user.name,
      email: user.email,
      ref: user.nickname,
      meetup: 'global_1',
    }
    const result = await fetch('/.netlify/lambda/attend', {
      method: 'POST',
      body,
    })
    console.log(result)
    const attending = JSON.parse(localStorage.getItem('attending') || '{}')
    attending['global_1'] = true
    localStorage.setItem('attending', JSON.stringify(attending))
    setAttending(true)
  }

  useEffect(() => {
    const attending = JSON.parse(localStorage.getItem('attending') || '{}')
    if (attending['global_1']) {
      setAttending(true)
    }
  }, [])

  return (
    <FullWidth background="very-dark">
      <Heading level={2} color="turqoise">
        <ScheduleNew
          size="large"
          color="turqoise"
          style={{ verticalAlign: 'sub' }}
        />{' '}
        upcoming meetups
      </Heading>
      <Box pad={{ vertical: 'medium' }}>
        <Box direction="row-responsive" justify="between" align="center">
          <Heading level={3} color="brand">
            coding earth global meetup #1
          </Heading>
          <Text size="medium">2020, Apr 21st 7PM CEST</Text>
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
            will have three sessions, two of which are already can announce.
          </Paragraph>

          <Text>
            Filipe Barroso (Lisbon) will give an intro to Google's Flutter SDK,
          </Text>

          <Text>
            Phillip Kessels (Porto) will give a talk on the Web Audio API.
          </Text>

          <Paragraph fill>
            All contributions follow our golden "*1 line of code*" rule, so
            demos and live code will be abound.
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
      ) : (
        <Button
          onClick={() => attend()}
          color={colors['meetup-red']}
          primary
          size="large"
          alignSelf="center"
          label="Attend"
          disabled={!isAuthenticated}
        />
      )}
    </FullWidth>
  )
}
