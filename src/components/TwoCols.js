import React from 'react'
import { Box } from 'grommet'

export const TwoCols = ({ children }) => (
  <Box direction="row-responsive" gap="small">
    {children}
  </Box>
)

export const FullWidth = props => (
  <Box
    pad={{ vertical: 'medium' }}
    {...props}
    fill
    align="center"
    justify="center"
  >
    <Box width="xlarge" pad="small">
      {props.children}
    </Box>
  </Box>
)
