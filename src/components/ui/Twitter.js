import React from 'react'

import { Box, Grid, ResponsiveContext } from 'grommet'
import { Tweet } from 'react-twitter-widgets'

export default ({ tweetId }) => (
  <Box pad="small" elevation={1} background="brand">
    <Tweet tweetId={tweetId} options={{ theme: 'dark' }} />
  </Box>
)
