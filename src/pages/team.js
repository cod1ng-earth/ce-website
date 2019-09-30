import React from "react"
import { Fade } from "react-reveal"
import { Link, graphql, useStaticQuery } from "gatsby"

import {
  Box,
  Grid,
  Heading,
  Image,
  Paragraph,
  ResponsiveContext,
} from "grommet"

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
    }
  `)

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
                      src={node.img}
                      fit="cover"
                      width="auto"
                      style={{ objectPosition: `top` }}
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
