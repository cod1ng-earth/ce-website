import React from "react"
import { Box } from "grommet"
import earth from "../../images/earth_v.jpg"

export default () => (
  <Box
    tag="footer"
    direction="row"
    background={{
      color: `neutral-1`,
      dark: true,
      opacity: true,
      position: `0 30%`,
      image: `url(${earth})`,
    }}
    align="center"
    justify="between"
    height="medium"
    responsive={false}
    pad={{ vertical: `small`, horizontal: `medium` }}
  >
    Footer
  </Box>
)
