import React from "react"
import { Box, Grid, ResponsiveContext } from "grommet"

export default ({ children }) => (
  <ResponsiveContext.Consumer>
    {size => (
      <Grid gap="medium" columns={size == `small` ? `auto` : [`auto`, `auto`]}>
        {children}
      </Grid>
    )}
  </ResponsiveContext.Consumer>
)
