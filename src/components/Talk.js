import React from 'react'
import { Box, Avatar, Text, Anchor } from 'grommet'
import ReactMarkdown from './event/ReactMarkdown'

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
}) => (
  <Box margin={{ bottom: 'medium' }}>
    <Box direction="row-responsive" align="center" justify="between">
      <Box direction="row" align="center" gap="small">
        {image && <Avatar src={image} />}
        <Text>
          <Anchor href={link} target="_blank" rel="noopener">
            {name}
          </Anchor>{' '}
          (
          {company.name && (
            <span>
              <Anchor href={company.url} target="_blank" rel="noopener">
                {company.name}
              </Anchor>
              ,{' '}
            </span>
          )}
          {origin}) <br />
          <Text>{title}</Text>
        </Text>
      </Box>
      {time && (
        <Box>
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
    </Box>
  </Box>
)
