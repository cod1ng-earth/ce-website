import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"

import { Box, Grommet } from "grommet"
import { theme } from "./theme"

import AppHeader from "./header/AppHeader"
import AppFooter from "./footer/AppFooter"

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
    <Grommet full theme={theme}>
      <Box full={true} flex={false}>
        <AppHeader
          appName="coding earth"
          onToggleSidebar={() => {
            setShowSidebar(!showSidebar)
          }}
        />
        {children}
        <AppFooter></AppFooter>
      </Box>
    </Grommet>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
