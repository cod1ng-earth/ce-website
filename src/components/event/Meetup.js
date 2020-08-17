import { Box, Image, Paragraph, Text } from 'grommet'
import React from 'react'
import ReactMarkdown from '../ReactMarkdown'
import MediaEmbed, { guessService } from './MediaChooser'
import Talk from './Talk'

const Meetup = ({ meetup, meetupUTCTime, timeZone }) => {
  const userLocale = Intl.DateTimeFormat().resolvedOptions().locale
  const upcoming = meetupUTCTime.getTime() > new Date().getTime()

  return (
    <Box>
      {!upcoming && meetup.keyImage && (
        <Box height={{ max: 'large' }}>
          <Image src={meetup.keyImage.url} fill />
        </Box>
      )}
      <Paragraph fill margin="none">
        <ReactMarkdown>{meetup.description}</ReactMarkdown>
      </Paragraph>

      {upcoming && (
        <Box direction="column">
          {'cc' == guessService(meetup.onlineUrl) ? (
            <MediaEmbed meetup={meetup} />
          ) : (
            <Text>Zoom {meetup.onlineUrl}</Text>
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
