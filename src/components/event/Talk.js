import React from 'react'
import { Box, Avatar, Text, Anchor } from 'grommet'
import ReactMarkdown from '../ReactMarkdown'
import YoutubeEmbed from './YoutubeEmbed'

export default ({
  name,
  link,
  image,
  origin,
  title,
  abstract,
  company,
  children,
  time,
  recording,
  slides,
}) => (
  <Box margin={{ vertical: 'large' }}>
    <Box direction="row-responsive" align="center" justify="between">
      <Box direction="row" align="center" gap="small">
        {image && <Avatar src={image} size="large" />}
        <Box direction="column">
          <Text weight="bold" size="large" margin={{ bottom: 'small' }}>
            {title}
          </Text>
          <Text size="medium">
            <Anchor href={link} target="_blank" rel="noopener">
              {name}
            </Anchor>{' '}
            {origin && <>({origin})</>}
          </Text>
          {company.name && (
            <Anchor
              size="medium"
              href={company.url}
              target="_blank"
              rel="noopener"
            >
              {company.name}
            </Anchor>
          )}
        </Box>
      </Box>
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
    <Box>
      <ReactMarkdown>{abstract || children}</ReactMarkdown>
      {recording && <YoutubeEmbed url={recording} />}
    </Box>
  </Box>
)
