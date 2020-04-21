import Image from 'gatsby-image'
import { Box, Heading, Paragraph, Text, Button } from 'grommet'
import { Rewind } from 'grommet-icons'
import React from 'react'
import { theme } from './theme'
import { FullWidth } from './TwoCols'
import { graphql, useStaticQuery, Link, navigate } from 'gatsby'
import Time from './Time'

const colors = theme.global.colors

export default function() {
  const data = useStaticQuery(graphql`
    query {
      graphcms {
        meetups(
          orderBy: time_DESC
          where: {
            id_in: [
              "ck8vxvl1k1a700104ygm809n9"
              "ck8vxuq6g1a6i0104fcr7s9qm"
              "ck8vxvl1k1a710104juon23a5"
              "ck8vxp38w1h4x01645txt71eb"
              "ck8vxpthc1h5m0164m62lfqvp"
              "ck8vxp38w1h4t0164eujq7shc"
            ]
          }
        ) {
          id
          name
          time

          keyImage {
            url
          }
          highlightImage {
            url
          }
        }
      }
    }
  `)

  const meetups = data.graphcms.meetups
  return (
    <Box pad={{ vertical: 'medium' }} direction="row-responsive" wrap={true}>
      {meetups.map(meetup => (
        <Box
          pad="small"
          basis="1/2"
          key={meetup.id}
          align="center"
          responsive={true}
          onClick={() => navigate(`meetup/${meetup.id}`)}
        >
          <Box
            pad="small"
            fill
            height={{ min: 'medium' }}
            background={{ image: `url(${meetup.highlightImage.url})` }}
            align="start"
            justify="end"
          >
            <Box
              background={{ color: 'dark-1', opacity: true }}
              fill="horizontal"
              pad="small"
            >
              <Heading level={3} color="brand" margin="none">
                {meetup.name}
              </Heading>
              <Text color="white" size="medium">
                {Time({ timeString: meetup.time })}
              </Text>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}
