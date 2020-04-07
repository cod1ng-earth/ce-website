import React from 'react'
import { Box } from 'grommet'

export const TwoCols = ({ children }) => (
  <Box direction="row-responsive" gap="small">
    {children}
  </Box>
)

export const FullWidth = ({ children, background = 'black', tag = 'div' }) => (
  <Box background={background} tag={tag} fill align="center">
    <Box width="xlarge" pad="small">
      {children}
    </Box>
  </Box>
)
