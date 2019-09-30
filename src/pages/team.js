import React from "react"
import { Fade } from "react-reveal"
import { Link, graphql, useStaticQuery } from "gatsby"
import Image from "gatsby-image"

import { Box, Grid, Heading, ResponsiveContext } from "grommet"

import SEO from "../components/seo"
import Layout from "../components/layout"

import ResponsiveGrid from "../components/ResponsiveGrid"

export default () => {
  const team = useStaticQuery(graphql`
    {
      allTeamJson {
        edges {
          node {
            name
            position
            img
          }
        }
      }

      allFile(filter: { relativePath: { regex: "/team/" } }) {
        edges {
          node {
            id
            name
            relativePath
            childImageSharp {
              fluid(maxWidth: 600, maxHeight: 600) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
  `)

  const imgMap = {}
  team.allFile.edges.forEach(({ node }) => {
    imgMap[node.name] = node
  })

  return (
    <Layout>
      <SEO title="Home" />
      <ResponsiveGrid>
        <Heading level={1} color="turqoise">
          Team &amp; Organizers
        </Heading>
        <ResponsiveContext.Consumer>
          {size => (
            <Grid
              columns={size === `small` ? `auto` : [`1/2`, `1/2`]}
              gap="small"
            >
              {team.allTeamJson.edges.map(({ node }) => (
                <Box key={node.id}>
                  <Heading level={3} color="brand" margin="none">
                    {node.name}
                  </Heading>
                  <Heading
                    level={4}
                    color="turqoise"
                    margin={{ vertical: `small` }}
                  >
                    {node.position}
                  </Heading>
                  <Box height="medium" margin={{ bottom: `large` }}>
                    <Image
                      durationFadeIn={5000}
                      fluid={imgMap[node.img].childImageSharp.fluid}
                    />
                  </Box>
                </Box>
              ))}
            </Grid>
          )}
        </ResponsiveContext.Consumer>
      </ResponsiveGrid>
    </Layout>
  )
}
