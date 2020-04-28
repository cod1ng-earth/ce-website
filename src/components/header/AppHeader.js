import { Link } from 'gatsby'
import { Anchor, Avatar, Box, Button, Image, Nav } from 'grommet'
import { Github } from 'grommet-icons'
import React from 'react'
import styled from 'styled-components'
import logo from '../../images/ce-logo.svg'
import { useAuth0 } from '../auth/react-auth0-spa'
import { theme } from '../theme'
import { HeaderWrapper } from './HeaderWrapper'

const LinkStyles = `
  color: ${theme.global.colors.white};
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  
  :hover {
    color: ${theme.global.colors.turqoise};
    text-decoration: none;
  }
`

const StyledLink = styled(Link)`
  ${LinkStyles}
`
const StyledAnchor = styled(Anchor)`
  ${LinkStyles}
`

export default ({ currentPath }) => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()
  const isInHero = currentPath === '/'

  const headerProps = isInHero
    ? {
        background: 'transparent',
        justify: 'end',
        style: { position: 'absolute', height: '80px' },
      }
    : {}

  return (
    <HeaderWrapper {...headerProps}>
      {!isInHero && (
        <Box>
          <Link to="/">
            <Image
              src={logo}
              alt="coding earth logo"
              style={{
                width: '87px',
                height: '100px',
                display: 'block',
              }}
            />
          </Link>
        </Box>
      )}
      <Box direction="row" align="center">
        <Nav direction="row" margin={{ right: 'medium' }}>
          <StyledLink to="/">Upcoming Events</StyledLink>
          <StyledLink to="/sofar">Previous Events</StyledLink>
          <StyledAnchor>Our Rules</StyledAnchor>
        </Nav>
        {!isAuthenticated && (
          <Button
            color="black"
            primary
            icon={<Github />}
            label="Log in"
            onClick={() => loginWithRedirect()}
          />
        )}

        {isAuthenticated && (
          <Button
            color="dark-1"
            primary
            icon={
              user && (
                <Avatar size="small" background="black" src={user.picture} />
              )
            }
            label="Log out"
            onClick={() => logout({ returnTo: 'https://coding.earth' })}
          />
        )}
      </Box>
    </HeaderWrapper>
  )
}
