import { Heading, Box, Text, Paragraph } from 'grommet'
import { ScheduleNew } from 'grommet-icons'
import React from 'react'
import { HoverBox } from '../components/MeetupPreview'
import ce_meetup from '../images/coding_earth_meetup.png'
import { FullWidth } from './TwoCols'
import Image from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'

export default function() {
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
      <HoverBox upcoming pad={{ vertical: 'medium', horizontal: 'small' }}>
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
      </HoverBox>
    </FullWidth>
  )
}
