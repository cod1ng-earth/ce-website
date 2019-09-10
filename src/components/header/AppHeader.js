import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { theme } from "../theme"
import { Anchor, Box, Image } from "grommet"
import logo from "../../images/coding_earth_logo.png"

const StyledAnchor = styled(Anchor)`
  font-family: "OCRA";
  color: ${theme.global.colors.brand};
  text-decoration: none;
  :hover {
    color: ${theme.global.colors.turqoise};
  }
`

export default () => (
  <Box
    tag="header"
    direction="row"
    background="very-dark"
    align="center"
    justify="between"
    responsive={false}
    pad={{ vertical: `small`, horizontal: `medium` }}
  >
    <StyledAnchor
      as={Link}
      to="/CODING-BERLIN/"
      activeStyle={{ color: theme.global.colors.turqoise }}
    >
      Berlin
    </StyledAnchor>

    <StyledAnchor
      as={Link}
      to="/coding-leipzig/"
      activeStyle={{ color: theme.global.colors.turqoise }}
    >
      LeipZig
    </StyledAnchor>

    <Anchor as={Link} to="/">
      <Image src={logo} height={`50px`} />
    </Anchor>

    <StyledAnchor
      as={Link}
      to="/coding-stuttgart/"
      activeStyle={{ color: theme.global.colors.turqoise }}
    >
      Stuttgart
    </StyledAnchor>

    <StyledAnchor
      as={Link}
      to="/CODING-PORTUGAL/"
      activeStyle={{ color: theme.global.colors.turqoise }}
    >
      Portugal
    </StyledAnchor>
  </Box>
)
