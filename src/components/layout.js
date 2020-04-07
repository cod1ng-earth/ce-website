import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'

import { Box, Grommet } from 'grommet'
import { theme } from './theme'

import AppHeader from './header/AppHeader'
import AppFooter from './footer/AppFooter'
import SubFooter from './footer/SubFooter'

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

  const [showSidebar, setShowSidebar] = useState(false)
  return (
    <Grommet theme={theme} themeMode="dark">
      <Box background="black">
        <AppHeader
          appName="coding earth"
          onToggleSidebar={() => {
            setShowSidebar(!showSidebar)
          }}
        />
        <Box full align="center">
          {children}
        </Box>
        <AppFooter />
        <SubFooter />
      </Box>
    </Grommet>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
