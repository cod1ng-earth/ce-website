import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { theme } from '../theme'
import { Text } from 'grommet'

const StyledLink = styled(Link)`
  font-family: 'OCR-A';
  color: ${theme.global.colors.brand};
  text-decoration: none;
  :hover {
    color: ${theme.global.colors.turqoise};
  }
`

const MenuLink = props => (
  <StyledLink {...props} activeStyle={{ color: theme.global.colors.turqoise }}>
    <Text size="medium">{props.label}</Text>
  </StyledLink>
)

export default () => <></>
