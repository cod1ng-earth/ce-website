import React from 'react'
import { graphql, useStaticQuery, Link, navigateTo } from 'gatsby'
import Meetup from './event/Meetup'
import { Heading, Box, Image, Paragraph, Text, Anchor } from 'grommet'
import { LocalDate, LocalTime } from './Time'

import { ScheduleNew, Clock, Next } from 'grommet-icons'
import ReactMarkdown from './ReactMarkdown'
import { SectionButton } from './SectionButton'

const UpcomingMeetup = ({ meetup }) => {
  const userLocale = Intl.DateTimeFormat().resolvedOptions().locale

  return (
    <Box key={`meetup-${meetup.id}`} direction="row-responsive" align="center">
      <Box
        basis="1/2"
        height={{ min: 'medium' }}
        fill
        onClick={() => navigateTo(`meetup/${meetup.id}`)}
        background={{
          color: 'grey-600',
          image: `url(${meetup.highlightImage.url})`,
          size: 'cover',
        }}
      >
        {' '}
      </Box>

      <Box
        basis="1/2"
        pad="small"
        background="grey-800"
        direction="column"
        justify="between"
        height={{ min: 'medium' }}
      >
        <Box>
          <Heading level={2} margin={{ vertical: 'small', bottom: 'none' }}>
            {meetup.name}
          </Heading>
          <Paragraph fill>
            <ReactMarkdown>{meetup.description}</ReactMarkdown>
          </Paragraph>
        </Box>
        <Box direction="row" justify="between">
          <Box direction="row" gap="small">
            <Box gap="small" direction="row" align="center">
              <ScheduleNew color="brand" />
              <Text size="small" weight="bold">
                {LocalDate(meetup.time)}
              </Text>
            </Box>
            <Box gap="small" direction="row" align="center">
              <Clock color="brand" />
              <Text size="small" weight="bold">
                {LocalTime(meetup.time)}
              </Text>
            </Box>
          </Box>
          <Box>
            <SectionButton
              color="purple"
              to={`/meetup/${meetup.id}`}
              Icon={Next}
              label="attend"
              size="small"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default UpcomingMeetup

/*
<Heading level={2} color="turqoise">
          <ScheduleNew
            size="large"
            color="turqoise"
            style={{ verticalAlign: 'sub' }}
          />{' '}
          upcoming meetups
        </Heading>
      )}
      */
