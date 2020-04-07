import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { Box } from 'grommet'

import MdxRenderer from '../components/Mdx'
import { FullWidth } from '../components/TwoCols'

export default ({ data: { mdx } }) => (
  <Layout>
    <SEO title={mdx.frontmatter.title} />
    <FullWidth>
      <MdxRenderer mdx={mdx} />
    </FullWidth>
  </Layout>
)

export const query = graphql`
  query($slug: String) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      id
      body
      rawBody
      frontmatter {
        slug
        title
      }
    }
  }
`
