/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"

import {
  Box,
  Button,
  Collapsible,
  Grommet,
  Layer,
  ResponsiveContext,
} from "grommet"
import { FormClose } from "grommet-icons"
import { theme } from "./theme"

import AppHeader from "./header/AppHeader"

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
      <ResponsiveContext.Consumer>
        {size => (
          <Box fill>
            <AppHeader
              appName="coding earth"
              onToggleSidebar={() => {
                setShowSidebar(!showSidebar)
              }}
            />

            <Box direction="row" flex overflow={{ horizontal: `hidden` }}>
              <Box flex>{children}</Box>
              {!showSidebar || size !== `small` ? (
                <Collapsible direction="horizontal" open={showSidebar}>
                  <Box
                    flex
                    width="medium"
                    background="light-2"
                    elevation="small"
                    align="center"
                    justify="center"
                  >
                    sidebar
                  </Box>
                </Collapsible>
              ) : (
                <Layer>
                  <Box
                    background="light-2"
                    tag="header"
                    justify="end"
                    align="center"
                    direction="row"
                  >
                    <Button
                      icon={<FormClose />}
                      onClick={() => setShowSidebar(false)}
                    />
                  </Box>

                  <Box
                    fill
                    background="light-2"
                    align="center"
                    justify="center"
                  >
                    sidebar
                  </Box>
                </Layer>
              )}
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
