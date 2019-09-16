import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Box } from "grommet"

export default ({ data }) => (
  <Layout>
    <SEO title={data.markdownRemark.frontmatter.title} />
    <Box dangerouslySetInnerHTML={{ __html: data.html }} />
  </Layout>
)

export const query = graphql`
  query($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        slug
        title
      }
    }
  }
`
