import React from 'react'
import { Box, Avatar, Text, Anchor } from 'grommet'
import ReactMarkdown from '../ReactMarkdown'
import YoutubeEmbed from './YoutubeEmbed'

const Speaker = ({ speaker }) => {
  const { name, location, company, companyUrl, avatar } = speaker

  const link = speaker.twitter ?? speaker.github ?? speaker.linkedin
  return (
    <Box direction="row" align="center" gap="small">
      {avatar && <Avatar src={avatar.url} size="large" />}
      <Box direction="column">
        <Text size="large">
          <Anchor
            href={link}
            target="_blank"
            rel="noopener"
            style={{ fontWeight: 'bold' }}
          >
            {name}
          </Anchor>{' '}
        </Text>

        <Text>
          {location && (
            <span style={{ marginRight: '.5rem' }}>({location})</span>
          )}
          {companyUrl ? (
            <Anchor
              size="medium"
              href={companyUrl}
              target="_blank"
              rel="noopener"
            >
              {company}
            </Anchor>
          ) : (
            company
          )}
        </Text>
      </Box>
    </Box>
  )
}

export default ({ speaker, title, abstract, time, recording, children }) => (
  <Box margin={{ top: 'large' }}>
    <Box
      direction="row"
      align="center"
      justify="between"
      margin={{ bottom: 'small' }}
    >
      <Text weight="bold" size="xlarge">
        {title}
      </Text>
      {time && (
        <Box
          background="grey-800"
          pad="small"
          round
          width={{ min: '100px' }}
          align="center"
        >
          <Text size="small">
            {new Date(time.time).toLocaleTimeString(time.locale, {
              timeZone: time.timeZone,
              hour: 'numeric',
              minute: 'numeric',
            })}
          </Text>
        </Box>
      )}
    </Box>
    <Box direction="row-responsive" align="center" justify="between">
      <Box direction="column" gap="small">
        {speaker.map(_speaker => (
          <Speaker key={_speaker.id} speaker={_speaker} />
        ))}
      </Box>
    </Box>
    <Box>
      <ReactMarkdown>{abstract || children}</ReactMarkdown>
    </Box>
    {recording && (
      <Box>
        <YoutubeEmbed url={recording} />
      </Box>
    )}
  </Box>
)
