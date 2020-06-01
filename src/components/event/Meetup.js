import { Anchor, Box, Image, Paragraph, RadioButton, Text } from 'grommet'
import React, { useState } from 'react'
import ReactMarkdown from '../ReactMarkdown'
import CrowdcastEmbed from './CrowdCastEmbed'
import Talk from './Talk'
import YoutubeEmbed from './YoutubeEmbed'

const Meetup = ({ meetup, meetupUTCTime, timeZone }) => {
  const [embed, setEmbed] = useState('cc')

  const userLocale = Intl.DateTimeFormat().resolvedOptions().locale
  const upcoming = meetupUTCTime.getTime() > new Date().getTime()

  return (
    <Box>
      <Paragraph fill margin="none">
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
        <Box>
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
        and live code will be abound. You don't have to register to get into our
        stream but if you do, we send you updates (and nothing else) like the
        final YouTube URL of the stream before the event.
      </Paragraph>
    </Box>
  )
}
export default Meetup
