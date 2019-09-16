import React from "react"

import { Box, Grid, Image, ResponsiveContext, Text } from "grommet"

//import earth from "../../images/earth_v.jpg"
import logo_ce from "../../images/coding_earth_logo.png"
import meetup_logo from "../../images/meetup-wordmark-red.png"
import { Twitter, Slack } from "grommet-icons"

import ResponsiveGrid from "../ResponsiveGrid"

export default () => (
  <ResponsiveContext.Consumer>
    {size => (
      <Box
        tag="footer"
        direction="row"
        background={{
          color: `dark-4`,
          dark: true,
          opacity: true,
        }}
        align="center"
        justify="between"
        height="medium"
        responsive={false}
        pad={{ vertical: `small`, horizontal: `medium` }}
      >
        <ResponsiveGrid>
          <Grid
            gap="medium"
            columns={size == `small` ? [`auto`] : [`auto`, `auto`, `auto`]}
          >
            <Box>
              <Twitter size="medium" />

              <Image src={logo_ce} fit="contain" width="50%" />
            </Box>
            <Box>
              <Text>follow us on</Text>
              <Twitter size="medium" />
              <Image src={meetup_logo} fit="contain" width="50%" />
            </Box>
            <Box>
              <Text>contact us</Text>
              <Slack size="medium" />
            </Box>
          </Grid>
        </ResponsiveGrid>
      </Box>
    )}
  </ResponsiveContext.Consumer>
)
