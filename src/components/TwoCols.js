import React from 'react'
import { Box } from 'grommet'

const TwoCols = ({ children, gap = 'small' }) => (
  <Box direction="row-responsive" gap={gap}>
    {children}
  </Box>
)
export default TwoCols
