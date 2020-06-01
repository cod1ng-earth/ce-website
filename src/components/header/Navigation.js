import React from 'react'

import { graphql, Link, useStaticQuery } from 'gatsby'
import { Avatar, Button, Nav } from 'grommet'
import { Github } from 'grommet-icons'
import styled from 'styled-components'
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

const Navigation = ({ showHome = false }) => {
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
    <Nav direction="row-responsive" align="center">
      {showHome && (
        <StyledLink to={'/'} title="Home" activeClassName="active">
          Home
        </StyledLink>
      )}

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
          size="medium"
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
          size="medium"
          icon={<Github size="20px" />}
          style={{ padding: '10px 30px' }}
          label="Log in"
          onClick={() => loginWithRedirect()}
        />
      )}
    </Nav>
  )
}

export default Navigation
