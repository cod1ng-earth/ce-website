import { Link, useStaticQuery, graphql } from 'gatsby'
import { Avatar, Box, Button, Image, Nav } from 'grommet'
import { Github } from 'grommet-icons'
import React from 'react'
import styled from 'styled-components'
import logo from '../../images/ce-logo.svg'
import { useAuth0 } from '../auth/react-auth0-spa'
import { theme } from '../theme'

const StyledLink = styled(Link)`
  color: ${theme.global.colors.white};
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;

  &.active {
    color: ${theme.global.colors.turqoise};
  }
  :hover {
    color: ${theme.global.colors.turqoise};
    text-decoration: none;
  }
`

export default ({ isHero = false }) => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()

  const data = useStaticQuery(graphql`
    query {
      graphcms {
        meetups(where: { time_gt: "now" }) {
          id
          name
        }
      }
    }
  `)

  const upcomingMeetup = data.graphcms.meetups[0]

  return (
    <Box
      tag="header"
      direction="row"
      margin={{ top: '20px' }}
      pad={{ horizontal: 'medium' }}
      fill="horizontal"
      height="80px"
      background={isHero ? 'transparent' : 'grey-800'}
      justify={isHero ? 'end' : 'between'}
      style={{ position: isHero ? 'absolute' : 'relative' }}
    >
      {!isHero && (
        <Link to="/">
          <Image
            src={logo}
            alt="coding earth logo"
            style={{
              width: '100px',
              top: '-16px',
              position: 'absolute',
              display: 'block',
            }}
          />
        </Link>
      )}
      <Box direction="row" align="center">
        <Nav direction="row" margin={{ right: 'medium' }} align="center">
          {upcomingMeetup && (
            <StyledLink
              to={`/meetup/${upcomingMeetup.id}`}
              title={upcomingMeetup.name}
              activeClassName="active"
            >
              Upcoming Meetups
            </StyledLink>
          )}
          <StyledLink to="/sofar" activeClassName="active">
            Previous Events
          </StyledLink>
          {isAuthenticated ? (
            <Button
              color="dark-1"
              primary
              size="small"
              icon={
                user && (
                  <Avatar size="small" background="black" src={user.picture} />
                )
              }
              label="Log out"
              onClick={() => logout({ returnTo: 'https://coding.earth' })}
            />
          ) : (
            <Button
              color="black"
              primary
              size="small"
              icon={<Github size="20px" />}
              style={{ padding: '10px 30px' }}
              label="Log in"
              onClick={() => loginWithRedirect()}
            />
          )}
        </Nav>
      </Box>
    </Box>
  )
}
