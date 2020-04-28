import React from 'react'
import { Box } from 'grommet'

export const HeaderWrapper = props => (
  <Box
    tag="header"
    direction="row"
    align="center"
    margin={{ top: '20px' }}
    pad={{ horizontal: 'medium' }}
    height="xsmall"
    fill="horizontal"
    background="grey-800"
    justify="between"
    style={{ position: 'relative', height: '80px' }}
    {...props}
  >
    {props.children}
  </Box>
)
