import React from "react"

import { Box, Grid, Heading, Text } from "grommet"

export default ({ time, title, sub }) => (
  <Box margin={{ vertical: `small` }}>
    <Grid columns={[`small`, `flex`]}>
      <Heading level={5} margin="none" color="turqoise">
        {time}
      </Heading>
      <Box fill flex={true}>
        <Text weight="bold">{title}</Text>
        {sub && (
          <Text size="small" margin={{ vertical: `xsmall` }}>
            {sub}
          </Text>
        )}
      </Box>
    </Grid>
  </Box>
)
