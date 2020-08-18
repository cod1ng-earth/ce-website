import React, { useState } from 'react'

import { Paragraph, Anchor, Box, Text, RadioButton } from 'grommet'
import YoutubeEmbed from './YoutubeEmbed'
import CrowdcastEmbed from './CrowdCastEmbed'

const rxTests = {
  '.zoom.us': 'zoom',
  '.crowdcast': 'cc',
  '.youtube': 'yt',
}
export function guessService(url) {
  const svc = Object.keys(rxTests).find(k => new RegExp(k).test(url))
  return svc ? rxTests[svc] : null
}

export default function MediaEmbed({ meetup }) {
  const [embed, setEmbed] = useState('cc')

  return (
    <>
      <Box>
        <Paragraph fill>
          To become part of the meetup, ask questions, chat with us and be able
          to bookmark parts of the sessions, select{' '}
          <Anchor onClick={() => setEmbed('cc')}>CrowdCast</Anchor> as streaming
          option (and please signup for it). If you prefer to lean back and
          watch, tune into the{' '}
          <Anchor onClick={() => setEmbed('yt')}>Youtube channel</Anchor>
        </Paragraph>
      </Box>
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
      <Box height={{ min: '400px' }}>
        {embed === 'yt' ? (
          <YoutubeEmbed url={meetup.recording} />
        ) : (
          <CrowdcastEmbed url={meetup.onlineUrl} />
        )}
      </Box>
    </>
  )
}
