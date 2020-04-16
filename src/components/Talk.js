import React from 'react'
import { Box, Avatar, Text, Anchor, Paragraph } from 'grommet'

export default ({
  name,
  link,
  image,
  origin,
  title,
  abstract,
  company,
  children,
}) => (
  <>
    <Box direction="row" align="center" gap="small">
      <Avatar src={image} />
      <Text>
        <Anchor href={link} target="_blank" rel="noopener">
          {name}
        </Anchor>{' '}
        (
        <Anchor href={company.url} target="_blank" rel="noopener">
          {company.name}
        </Anchor>
        , {origin}) <br />
        <Text>{title}</Text>
      </Text>
    </Box>
    <Paragraph fill>{abstract || children}</Paragraph>
  </>
)
