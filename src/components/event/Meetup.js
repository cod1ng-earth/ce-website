import { Box, Image, Paragraph, Text, Anchor } from 'grommet'
import React from 'react'
import ReactMarkdown from '../ReactMarkdown'
import MediaEmbed, { guessService } from './MediaChooser'
import Talk from './Talk'

const Meetup = ({ meetup, meetupUTCTime, timeZone }) => {
  const userLocale = Intl.DateTimeFormat().resolvedOptions().locale
  const upcoming = meetupUTCTime.getTime() > new Date().getTime()

  const guessedService = guessService(meetup.onlineUrl)
  return (
    <Box>
      {meetup.keyImage && (!upcoming || 'zoom' === guessedService) && (
        <img
          src={meetup.keyImage.url}
          style={{ width: '100%', height: 'auto' }}
        />
      )}
      <Box>
        <ReactMarkdown>{meetup.description}</ReactMarkdown>
      </Box>

      {upcoming && (
        <Box direction="column">
          {'cc' == guessedService ? (
            <MediaEmbed meetup={meetup} />
          ) : (
            <Text>
              Our <Anchor href={meetup.onlineUrl}>Zoom meeting</Anchor> is{' '}
              <strong>password protected</strong>. To join, authenticate against
              your Github account and hit the attend button on the info box.{' '}
            </Text>
          )}
        </Box>
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
