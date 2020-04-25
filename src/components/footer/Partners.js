import React from 'react'
import { Box, Text, Heading, Image, Button, Grid } from 'grommet'
import { Cubes } from 'grommet-icons'
import { graphql, useStaticQuery } from 'gatsby'
import { FullWidth } from '../TwoCols'

function Partner(props) {
  if (props.website && props.website !== '') {
    return (
      <Button {...props} as="a" href={props.website} target="_blank">
        {props.children}
      </Button>
    )
  }

  return <Box {...props}>{props.children}</Box>
}

export default () => {
  const data = useStaticQuery(graphql`
    query {
      graphcms {
        partners(stage: PUBLISHED) {
          name
          id
          logo {
            fileName
            height
            width
            url
          }
          website
        }
      }
    }
  `)
  const partners = data.graphcms.partners

  return (
    partners.length > 0 && (
      <FullWidth
        tag="section"
        background="neutral-3"
        pad={{ vertical: 'large' }}
      >
        <Heading level={2} color="accent-4">
          <Cubes
            size="large"
            color="accent-4"
            style={{ verticalAlign: 'sub' }}
          />{' '}
          Our partners
        </Heading>
        <Grid rows={['auto']} columns={['1fr 1fr 1fr 1fr 1fr 1fr']} gap="small">
          {partners.map((partner, index) => (
            <Partner key={index} website={partner.website}>
              <Box height="small" width="100%" pad={{ horizontal: 'small' }}>
                <Image fit="contain" src={partner.logo.url} />
              </Box>
              <Text color="white" textAlign="center" tag="div">
                {partner.name}
              </Text>
            </Partner>
          ))}
        </Grid>
      </FullWidth>
    )
  )
}
