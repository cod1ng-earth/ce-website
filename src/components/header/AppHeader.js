import { Link } from 'gatsby'
import { Anchor, Avatar, Box, Button, Image } from 'grommet'
import { Github } from 'grommet-icons'
import React from 'react'
import styled from 'styled-components'
import logo from '../../images/coding_earth_x_120.png'
import { useAuth0 } from '../auth/react-auth0-spa'
import { theme } from '../theme'

const StyledAnchor = styled(Anchor)`
  font-family: 'OCR-A';
  color: ${theme.global.colors.brand};
  text-decoration: none;
  :hover {
    color: ${theme.global.colors.turqoise};
  }
`

export default () => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,

    user,
  } = useAuth0()

  return (
    <Box
      tag="header"
      direction="row"
      background="very-dark"
      align="center"
      justify="between"
      margin={{ vertical: 'medium' }}
      pad={{ horizontal: 'medium' }}
      style={{ position: 'relative' }}
      height="xsmall"
    >
      <Box>
        <Link to="/">
          <Image src={logo} alt="coding earth logo" />
        </Link>
      </Box>
      <Box>
        {!isAuthenticated && (
          <Button
            color="black"
            primary
            icon={<Github />}
            label="Log in"
            onClick={() => loginWithRedirect({})}
          />
        )}

        {isAuthenticated && (
          <Button
            color="dark-2"
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
    </Box>
  )
}
