import React from 'react'

import { Box, Grid, ResponsiveContext } from 'grommet'

const columns = {
  small: ['auto'],
  medium: ['flex', 'large', 'flex'],
  large: ['flex', 'xlarge', 'flex'],
  xlarge: ['flex', 'xlarge', 'flex'],
}

export default ({ children }) => (
  <ResponsiveContext.Consumer>
    {size => (
      <Grid
        fill
        columns={columns[size]}
        rows={['full', 'flex', 'full']}
        areas={
          size === 'small'
            ? [{ name: 'main', start: [0, 0], end: [0, 0] }]
            : [{ name: 'main', start: [1, 0], end: [1, 0] }]
        }
      >
        <Box gridArea="main" pad="small">
          {children}
        </Box>
      </Grid>
    )}
  </ResponsiveContext.Consumer>
)
