import React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../components/layout'
import SEO from '../components/seo'

import comp from '../components/Mdx'

import { FullWidth } from '../components/TwoCols'

export default ({ data: { mdx } }) => (
  <Layout>
    <SEO title={mdx.frontmatter.title} />
    <FullWidth>
      <MDXProvider components={comp}>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </MDXProvider>
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
