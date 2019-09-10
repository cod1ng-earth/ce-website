import React from "react"
import { Link } from "gatsby"

import { Box, Heading, Paragraph, Text, Anchor } from "grommet"

import ResponsiveGrid from "../components/ResponsiveGrid"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Cont = () => (
  <>
    <Heading size="small">Heading 1 - Small</Heading>
    <Text>Size: </Text>
    <Text>Responsive</Text>
    <Text size="large">Text Large </Text>
    <Paragraph>Paragraph - Medium</Paragraph>
    <Anchor as={Link} to="/page-2/">
      Go to page 2
    </Anchor>
  </>
)

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <ResponsiveGrid>{[...Array(2).keys()].map(k => Cont())}</ResponsiveGrid>

    <Box full={true} flex={false} background={`green`} height={`medium`}>
      <ResponsiveGrid> so what </ResponsiveGrid>
    </Box>
  </Layout>
)

export default IndexPage
