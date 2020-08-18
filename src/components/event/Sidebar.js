import { Box, Button, Text, Anchor } from 'grommet'
import { Checkmark, Github, Group, Video } from 'grommet-icons'
import React, { useEffect } from 'react'
import { useAuth0 } from '../auth/react-auth0-spa'
import AttendButton from './AttendButton'
import TimezonePicker from './TimezonePicker'
import { guessService } from './MediaChooser'
import { Zoom } from '../icons/Zoom'

const Sidebar = ({ setTimeZone, attending, setAttending, meetup }) => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0()
  useEffect(() => {
    const attending = JSON.parse(localStorage.getItem('attending') || '{}')
    if (attending[meetup.id]) {
      setAttending(true)
    }
  }, [])

  const meetupUTCTime = new Date(meetup.time)
  const upcoming = meetupUTCTime.getTime() > new Date().getTime()

  const guessedService = guessService(meetup.onlineUrl)

  return (
    <Box direction="column" gap="medium">
      <TimezonePicker meetupUTCTime={meetupUTCTime} tzUpdated={setTimeZone} />

      {meetup.onlineUrl && (
        <Box direction="row" align="center" gap="small">
          {'zoom' === guessedService ? (
            <Zoom color="plain" />
          ) : (
            <Group color="grey-400" />
          )}
          <Text>
            <Anchor href={meetup.onlineUrl} target="_blank">
              {'zoom' === guessedService ? 'Zoom' : 'Cast'}
            </Anchor>
          </Text>
        </Box>
      )}

      {meetup.recording && (
        <Box direction="row" align="center" gap="small">
          <Video color="grey-400" size="medium" />
          <Anchor href={meetup.recording} target="_blank">
            Stream
          </Anchor>
        </Box>
      )}

      <Box>
        {upcoming &&
          (attending ? (
            <Button
              color="status-ok"
              alignSelf="center"
              primary
              active={false}
              icon={<Checkmark color="green" />}
              disabled={!isAuthenticated}
              label="you are registered for this meetup"
            />
          ) : user ? (
            <AttendButton
              user={user}
              setAttending={setAttending}
              meetupId={meetup.id}
            />
          ) : (
            <Box align="center" direction="row" gap="small">
              <Button
                label="log in"
                primary
                size="small"
                icon={<Github />}
                onClick={() => loginWithRedirect()}
                color="black"
              />
              <Text size="small"> to signup for this event</Text>
            </Box>
          ))}
      </Box>
    </Box>
  )
}

export default Sidebar
