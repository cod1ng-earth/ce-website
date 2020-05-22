import { graphql, navigate, useStaticQuery } from 'gatsby'
import { Box, Grommet } from 'grommet'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Auth0Provider } from './auth/react-auth0-spa'
import AppFooter from './footer/AppFooter'
import SubFooter from './footer/SubFooter'
import AppHeader from './header/AppHeader'
import { theme } from './theme'
import heroPattern from '../images/hero-pattern.svg'

import 'react-responsive-carousel/lib/styles/carousel.min.css'

const Layout = ({ children, isHero }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const topBackground = {
    image: `
        linear-gradient(
          to right,
          rgba(${theme.global.colors['grey-900-rgb']}, 0),
          rgba(${theme.global.colors['grey-900-rgb']}, 1)
        ),
        url('${heroPattern}'),
        linear-gradient(
          to right,
          ${theme.global.colors['grey-900']},
          ${theme.global.colors['grey-900']}
        )`,
    position: '0 -90px',
    repeat: 'repeat',
    size: 'initial',
  }

  //const [showSidebar, setShowSidebar] = useState(false)

  const onRedirectCallback = appState => {
    navigate(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  }

  return (
    <Auth0Provider
      domain={process.env.GATSBY_AUTH0_DOMAIN}
      client_id={process.env.GATSBY_AUTH0_CLIENT_ID}
      onRedirectCallback={onRedirectCallback}
    >
      <Grommet theme={theme} themeMode="dark">
        <Box background={topBackground}>
          <AppHeader appName="coding earth" isHero={isHero} />
          <Box full align="center">
            {children}
          </Box>
          <AppFooter />
          <SubFooter />
        </Box>
      </Grommet>
    </Auth0Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
