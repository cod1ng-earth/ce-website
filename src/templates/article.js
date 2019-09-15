import React from "react"
import { graphql } from "gatsby"
import { Box, Grid, Heading, Image, Paragraph, Text } from "grommet"

import Layout from "../components/layout"
import SEO from "../components/seo"

import ResponsiveGrid from "../components/ResponsiveGrid"
import styled from "styled-components"
import { theme } from "../components/theme"
import { DateTime } from "luxon"

import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"

export default ({ data }) => (
  <Layout>
    <SEO title={data.markdownRemark.frontmatter.title} />
    {data.markdownRemark.frontmatter.title}
  </Layout>
)

export const query = graphql`
  query($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
      }
    }
  }
`
