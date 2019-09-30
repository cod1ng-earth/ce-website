import React from "react"

import { Anchor, Box, Image, ResponsiveContext, Text } from "grommet"
import gatsby_icon from "../../images/gatsby-icon.png"
import grommet_icon from "../../images/stak-hurrah.svg"
import ResponsiveGrid from "../ResponsiveGrid"

export default () => (
  <ResponsiveContext.Consumer>
    {size => (
      <Box tag="footer" direction="row" background="gatsby-light">
        <ResponsiveGrid>
          <Text textAlign="center">
            built with
            <Anchor href="https://www.gatsbyjs.org" target="_blank">
              <Image
                title="Gatsby"
                src={gatsby_icon}
                fit="contain"
                width="30px"
                margin={{ left: `small` }}
                style={{ verticalAlign: `sub` }}
              />
            </Anchor>{" "}
            and{" "}
            <Anchor href="https://grommet.io" target="_blank">
              <Image
                title="grommet v2"
                src={grommet_icon}
                fit="contain"
                width="40px"
                margin={{ left: `small` }}
                style={{ verticalAlign: `sub` }}
              />
            </Anchor>
          </Text>
        </ResponsiveGrid>
      </Box>
    )}
  </ResponsiveContext.Consumer>
)
