import React from "react"
import { Link } from "gatsby"

import { Box, Heading, Paragraph, Text } from "grommet"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Box pad="medium" background="neutral-1">
      <Heading size="small">Heading 1 - Small</Heading>

      <Text size="large">Text Large</Text>
      <Paragraph>Paragraph - Medium</Paragraph>
      <Link to="/page-2/">Go to page 2</Link>
    </Box>
  </Layout>
)

export default IndexPage
