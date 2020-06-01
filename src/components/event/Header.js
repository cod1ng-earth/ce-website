import React from 'react'
import { Box, Text, Anchor } from 'grommet'
import { SectionButton } from '../SectionButton'
import { Previous, Schedule, Clock, Group, Video } from 'grommet-icons'
import { LocalDate, LocalTime } from '../Time'

const Header = ({ meetup, timeZone }) => (
  <Box direction="row-responsive" fill="horizontal" justify="between">
    <SectionButton to="/sofar" label="all meetups" Icon={Previous} />
    <Box direction="row" align="center" gap="small" pad="small">
      <Schedule color="grey-400" size="medium" />
      <Text weight="bold">{LocalDate(meetup.time)}</Text>
    </Box>
    <Box direction="row" align="center" gap="small" pad="small">
      <Clock color="grey-400" size="medium" />
      <Text weight="bold">{LocalTime(meetup.time, timeZone)}</Text>
    </Box>
    {meetup.onlineUrl && (
      <Box direction="row" align="center" gap="small" pad="small">
        <Group color="grey-400" size="medium" />

        <Anchor href={meetup.onlineUrl} target="_blank">
          <Text weight="bold">Cast</Text>
        </Anchor>
      </Box>
    )}
    {meetup.recording && (
      <Box direction="row" align="center" gap="small" pad="small">
        <Video color="grey-400" size="medium" />
        <Anchor href={meetup.recording} target="_blank">
          <Text weight="bold">Stream</Text>
        </Anchor>
      </Box>
    )}
  </Box>
)

export default Header
