import React from "react"

import { Anchor, Box, Image, Text } from "grommet"
import { Github } from "grommet-icons"
import gatsby_icon from "../../images/gatsby-icon.png"
import grommet_icon from "../../images/grommet.png"
import ResponsiveGrid from "../ResponsiveGrid"

export default () => (
  <Box tag="footer" direction="row" background="gatsby-light">
    <ResponsiveGrid>
      <Text textAlign="center">
        built with
        <Anchor href="https://www.gatsbyjs.org" target="_blank" rel="noopener">
          <Image
            title="Gatsby"
            alt="Gatsby static site generator logo"
            src={gatsby_icon}
            fit="contain"
            width="30px"
            margin={{ left: `small` }}
            style={{ verticalAlign: `-8px` }}
          />
        </Anchor>
        {` `}
        and
        <Anchor href="https://grommet.io" target="_blank" rel="noopener">
          <Image
            title="grommet v2"
            alt="Grommet frontend library logo"
            src={grommet_icon}
            fit="contain"
            width="40px"
            margin={{ left: `small` }}
            style={{ verticalAlign: `-10px` }}
          />
        </Anchor>
      </Text>
      <Text textAlign="center">
        Found an issue?{` `}
        <Anchor
          href="https://github.com/cod1ng-earth/ce-website"
          target="_blank"
          rel="noopener"
        >
          <Github size="medium" color="brand" /> Fork us and fix it
        </Anchor>
      </Text>
    </ResponsiveGrid>
  </Box>
)
