import React from 'react'
import { Box } from 'grommet'

const FullWidth = props => (
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

export default FullWidth
