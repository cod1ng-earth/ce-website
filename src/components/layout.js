import { graphql, navigate, useStaticQuery } from 'gatsby'
import { Box, Grommet } from 'grommet'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Auth0Provider } from './auth/react-auth0-spa'
import AppFooter from './footer/AppFooter'
import SubFooter from './footer/SubFooter'
import AppHeader from './header/AppHeader'
import { theme } from './theme'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

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
        <Box background="black">
          <AppHeader appName="coding earth" />
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
