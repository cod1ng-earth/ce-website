import React from 'react'
import { Box, Text, Anchor } from 'grommet'
import { SectionButton } from '../SectionButton'
import { Previous, Schedule, Clock, Group, Video } from 'grommet-icons'
import { LocalDate, LocalTime } from '../Time'
import { guessService } from './MediaChooser'
import { Zoom } from '../icons/Zoom'

const Header = ({ meetup, timeZone }) => {
  const guessedService = guessService(meetup.onlineUrl)

  return (
    <Box direction="row-responsive" fill="horizontal" justify="between">
      <Box alignSelf="start">
        <SectionButton to="/sofar" label="all meetups" Icon={Previous} />
      </Box>
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
          {'zoom' === guessedService ? (
            <Zoom color="plain" size="medium" />
          ) : (
            <Group color="grey-400" size="medium" />
          )}

          <Anchor href={meetup.onlineUrl} target="_blank">
            <Text weight="bold">
              {'zoom' === guessService(meetup.onlineUrl) ? 'Zoom' : 'Cast'}
            </Text>
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
}

export default Header
