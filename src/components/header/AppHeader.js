import { Link } from 'gatsby'
import { Anchor, Box, Image, ResponsiveContext } from 'grommet'
import React from 'react'
import styled from 'styled-components'
import logo from '../../images/coding_earth_x_120.png'
import { theme } from '../theme'

const StyledAnchor = styled(Anchor)`
  font-family: 'OCR-A';
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
        background="very-dark"
        align="center"
        justify="center"
        margin={{ vertical: 'medium' }}
        pad={{ horizontal: 'medium' }}
        style={{ position: 'relative' }}
        height="xsmall"
      >
        <Link to="/">
          <Image src={logo} alt="coding earth logo" />
        </Link>
      </Box>
    )}
  </ResponsiveContext.Consumer>
)
