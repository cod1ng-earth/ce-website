import React from "react"

import { Box, Button, Image } from "grommet"
import logo from "../../images/coding_earth_logo.png"

export default () => (
  <Box
    tag="header"
    direction="row"
    background="dark-1"
    align="center"
    justify="between"
    responsive={false}
    pad={{ vertical: `small`, horizontal: `medium` }}
  >
    <Button>Berlin</Button>
    <Button>Leipzig</Button>

    <Image src={logo} height={`50px`} />

    <Button>Stuttgart</Button>
    <Button>Portugal</Button>
  </Box>
)
