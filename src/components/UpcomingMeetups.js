import { graphql, useStaticQuery } from 'gatsby'
import {
  Anchor,
  Box,
  Button,
  Heading,
  Paragraph,
  RadioButton,
  Text,
} from 'grommet'
import { Checkmark, Github } from 'grommet-icons'
import React, { useEffect, useState } from 'react'
import { useAuth0 } from './auth/react-auth0-spa'
import CrowdcastEmbed from './event/CrowdCastEmbed'
import ReactMarkdown from './event/ReactMarkdown'
import TimezonePicker from './event/TimezonePicker'
import { YoutubeEmbed } from './event/YoutubeEmbed'
import Talk from './Talk'
import AttendButton from './event/AttendButton'

export default function UpcomingMeetup(props) {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0()
  const [attending, setAttending] = useState(false)
  const [embed, setEmbed] = useState('cc')
  const [timeZone, setTimeZone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
  const userLocale = Intl.DateTimeFormat().resolvedOptions().locale

  const data = useStaticQuery(graphql`
    {
      graphcms {
        meetups(where: { id: "cka2ooxts00ly0109uvysepfk" }) {
          id
          name
          time
          duration
          description
          onlineUrl
          recording
          keyImage {
            url
          }
          highlightImage {
            url
          }
          talks {
            id
            title
            description
            slides
            recording
            time
            speaker {
              name
              location
              company
              companyUrl
              twitter
              github
              linkedin
              avatar {
                url
              }
            }
          }
        }
      }
    }
  `)
  const meetup = data.graphcms.meetups[0]

  useEffect(() => {
    const attending = JSON.parse(
      localStorage.getItem(`attending[${meetup.id}]`) || '{}'
    )
    if (attending[meetup.id]) {
      setAttending(true)
    }
  }, [])

  return (
    <Box pad="none" margin="none">
      <Box pad={{ vertical: 'medium' }}>
        <Box direction="row-responsive" justify="between" align="center">
          <Heading level={3} color="brand">
            {meetup.name}
          </Heading>
          <TimezonePicker
            meetupUTCTime={new Date(meetup.time)}
            tzUpdated={setTimeZone}
          />
        </Box>
        <Paragraph fill>
          <ReactMarkdown>{meetup.description}</ReactMarkdown>
          To become part of the meetup, ask questions, chat with us and be able
          to bookmark parts of the sessions, select{' '}
          <Anchor onClick={() => setEmbed('cc')}>CrowdCast</Anchor> as streaming
          option (and please signup for it). If you prefer to lean back and
          watch, tune into the{' '}
          <Anchor onClick={() => setEmbed('yt')}>Youtube channel</Anchor>
        </Paragraph>
        <Box>
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

          {meetup.talks.length === 0 ? (
            <Paragraph fill> Sessions will be announced shortly</Paragraph>
          ) : (
            <Box background="dark-1" pad="medium">
              {meetup.talks.map(talk => {
                const speaker = talk.speaker[0]

                return (
                  <Talk
                    key={talk.id}
                    name={talk.name}
                    company={{
                      url: speaker.companyUrl,
                      name: speaker.company,
                    }}
                    link={speaker.twitter}
                    image={speaker.avatar.url}
                    origin={speaker.location}
                    title={talk.title}
                    time={{ time: talk.time, userLocale, timeZone }}
                  >
                    {talk.description}
                  </Talk>
                )
              })}
            </Box>
          )}

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
        <AttendButton user={user} setAttending={setAttending} />
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
