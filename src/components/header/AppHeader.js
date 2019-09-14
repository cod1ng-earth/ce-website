import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { theme } from "../theme"
import {
  Anchor,
  Box,
  DropButton,
  Image,
  ResponsiveContext,
  Text,
} from "grommet"
import { Globe } from "grommet-icons"

import Menu from "./Menu"

import logo from "../../images/coding_earth_logo.png"

const StyledAnchor = styled(Anchor)`
  font-family: "OCR-A";
  color: ${theme.global.colors.brand};
  text-decoration: none;
  :hover {
    color: ${theme.global.colors.turqoise};
  }
`

export default () => (
  <ResponsiveContext.Consumer>
    {size => (
      <Box
        tag="header"
        direction="row"
        background="dark"
        align="center"
        justify="between"
        responsive={false}
        pad={{ vertical: `small`, horizontal: `medium` }}
      >
        {size == `small` ? (
          <DropButton
            label={
              <Text size="large" weight="bold" color="brand">
                Location
              </Text>
            }
            color="brand"
            size="xlarge"
            icon={<Globe color="brand" />}
            dropProps={{ elevation: `xsmall` }}
            dropContent={
              <Box pad="medium" background="dark-1">
                <Menu />
              </Box>
            }
          />
        ) : (
          <Menu />
        )}
        <StyledAnchor as={Link} to="/">
          <Image src={logo} height={`50px`} />
        </StyledAnchor>
      </Box>
    )}
  </ResponsiveContext.Consumer>
)
