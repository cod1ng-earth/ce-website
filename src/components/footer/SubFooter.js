import React from "react"

import { Box, Image, ResponsiveContext, Text } from "grommet"
import gatsby_icon from "../../images/gatsby-icon.png"
import ResponsiveGrid from "../ResponsiveGrid"

export default () => (
  <ResponsiveContext.Consumer>
    {size => (
      <Box tag="footer" direction="row" background="gatsby-light">
        <ResponsiveGrid>
          <Text textAlign="center">
            built with
            <Image
              src={gatsby_icon}
              fit="contain"
              width="30px"
              margin={{ left: `small` }}
              style={{ verticalAlign: `sub` }}
            />
          </Text>
        </ResponsiveGrid>
      </Box>
    )}
  </ResponsiveContext.Consumer>
)
