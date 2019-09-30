import React from "react"
import { Fade } from "react-reveal"

import { Box, Heading, Image, Paragraph } from "grommet"
import { Code, Globe, Grow, ForwardTen, ScheduleNew } from "grommet-icons"

import styled from "styled-components"

import SEO from "../components/seo"
import Layout from "../components/layout"
import { theme } from "../components/theme"
import ResponsiveGrid from "../components/ResponsiveGrid"
import ResponsiveTwoCols from "../components/ResponsiveTwoCols"

export default () => (
  <Layout>
    <SEO title="Home" />

    <Box margin="large">
      <ResponsiveGrid></ResponsiveGrid>
    </Box>
  </Layout>
)
