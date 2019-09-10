import React from "react"
import { Link } from "gatsby"

import { Anchor, Box, Button, Image } from "grommet"
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
    <Anchor as={Link} to="/CODING-BERLIN/">
      Berlin
    </Anchor>

    <Anchor as={Link} to="/coding-leipzig/">
      Leipzig
    </Anchor>

    <Anchor as={Link} to="/">
      <Image src={logo} height={`50px`} />
    </Anchor>

    <Anchor as={Link} to="/coding-stuttgart/">
      Stuttgart
    </Anchor>

    <Anchor as={Link} to="/CODING-PORTUGAL/">
      Portugal
    </Anchor>
  </Box>
)
