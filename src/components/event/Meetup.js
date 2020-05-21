import React, { useEffect, useState } from 'react'
import {
  Anchor,
  Box,
  Button,
  Heading,
  Paragraph,
  RadioButton,
  Text,
  Image,
} from 'grommet'
import { Checkmark, Github } from 'grommet-icons'
import { useAuth0 } from '../auth/react-auth0-spa'
import CrowdcastEmbed from './CrowdCastEmbed'
import YoutubeEmbed from './YoutubeEmbed'
import ReactMarkdown from '../ReactMarkdown'
import TimezonePicker from './TimezonePicker'
import Talk from './Talk'
import AttendButton from './AttendButton'

const UpcomingMeetup = ({ meetup }) => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0()
  const [attending, setAttending] = useState(false)
  const [embed, setEmbed] = useState('cc')
  const [timeZone, setTimeZone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
  const userLocale = Intl.DateTimeFormat().resolvedOptions().locale

  useEffect(() => {
    const attending = JSON.parse(localStorage.getItem('attending') || '{}')
    if (attending[meetup.id]) {
      setAttending(true)
    }
  }, [])
  const meetupUTCTime = new Date(meetup.time)
  const upcoming = meetupUTCTime.getTime() > new Date().getTime()

  return (
    <Box pad="none" margin="none">
      <Box pad={{ vertical: 'medium' }}>
        <Box direction="row-responsive" justify="between" align="center">
          <Heading level={3} color="brand">
            {meetup.name}
          </Heading>
          {upcoming && (
            <TimezonePicker
              meetupUTCTime={meetupUTCTime}
              tzUpdated={setTimeZone}
            />
          )}
        </Box>

        <Paragraph fill>
          {!upcoming && meetup.keyImage && (
            <Box height={{ max: 'large' }}>
              <Image src={meetup.keyImage.url} fill />
            </Box>
          )}
          <ReactMarkdown>{meetup.description}</ReactMarkdown>
        </Paragraph>

        {upcoming && (
          <>
            <Paragraph fill>
              To become part of the meetup, ask questions, chat with us and be
              able to bookmark parts of the sessions, select{' '}
              <Anchor onClick={() => setEmbed('cc')}>CrowdCast</Anchor> as
              streaming option (and please signup for it). If you prefer to lean
              back and watch, tune into the{' '}
              <Anchor onClick={() => setEmbed('yt')}>Youtube channel</Anchor>
            </Paragraph>

            <Box direction="row" margin={{ vertical: 'medium' }} gap="medium">
              <Text>Stream: </Text>
              <RadioButton
                checked={embed === 'yt'}
                label="Youtube"
                onChange={() => setEmbed('yt')}
              />
              <RadioButton
                checked={embed === 'cc'}
                label="CrowdCast"
                onChange={() => setEmbed('cc')}
              />
            </Box>

            {embed === 'yt' ? (
              <YoutubeEmbed url={meetup.recording} />
            ) : (
              <CrowdcastEmbed url={meetup.onlineUrl} />
            )}
          </>
        )}

        {meetup.talks.length === 0 ? (
          upcoming && (
            <Paragraph fill> Sessions will be announced shortly</Paragraph>
          )
        ) : (
          <Box background="dark-1" pad="medium">
            {meetup.talks.map(talk => {
              const speaker = talk.speaker[0]

              return (
                <Talk
                  key={talk.id}
                  name={speaker.name}
                  company={{
                    url: speaker.companyUrl,
                    name: speaker.company,
                  }}
                  link={speaker.twitter}
                  image={speaker.avatar?.url}
                  origin={speaker.location}
                  title={talk.title}
                  time={{ time: talk.time, userLocale, timeZone }}
                  abstract={talk.description}
                  recording={talk.recording}
                  slides={talk.slides}
                />
              )
            })}
          </Box>
        )}

        <Paragraph fill>
          All contributions follow our golden "*1 line of code*" rule, so demos
          and live code will be abound. You don't have to register to get into
          our stream but if you do, we send you updates (and nothing else) like
          the final YouTube URL of the stream before the event.
        </Paragraph>
      </Box>

      {upcoming &&
        (attending ? (
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
          <AttendButton
            user={user}
            setAttending={setAttending}
            meetupId={meetup.id}
          />
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
        ))}
      {!upcoming && meetup.recording && <YoutubeEmbed url={meetup.recording} />}
    </Box>
  )
}
export default UpcomingMeetup
