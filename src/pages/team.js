import { graphql, useStaticQuery } from 'gatsby'
import Image from 'gatsby-image'
import { Box, Grid, Heading, ResponsiveContext, Text } from 'grommet'
import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'

import FullWidth from '../components/FullWidth'

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
      <SEO title="Team" description="The team members of Coding Earth" />
      <FullWidth>
        <Heading level={1}>Team &amp; Organizers</Heading>
        <Box direction="row-responsive" wrap>
          {team.allTeamJson.edges.map(({ node }) => (
            <Box key={node.id} basis="1/2" pad="small">
              <Heading level={3} margin="none">
                {node.name}
              </Heading>
              <Text>{node.position}</Text>
              <Box margin={{ vertical: 'medium' }} height={{ min: 'medium' }}>
                <Image
                  durationFadeIn={5000}
                  fluid={imgMap[node.img].childImageSharp.fluid}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </FullWidth>
    </Layout>
  )
}
