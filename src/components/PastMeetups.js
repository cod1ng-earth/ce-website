import React from 'react'
import { graphql, navigate, useStaticQuery } from 'gatsby'
import { Box, Heading, Text } from 'grommet'
import { Rewind } from 'grommet-icons'

import { theme } from './theme'
import Time from './Time'

const colors = theme.global.colors

export default function() {
  const data = useStaticQuery(graphql`
    query {
      graphcms {
        meetups(orderBy: time_DESC, first: 6, stage: PUBLISHED) {
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
    <>
      <Heading level={2} color="turqoise">
        <Rewind
          size="large"
          color="turqoise"
          style={{ verticalAlign: 'sub' }}
        />{' '}
        Previously, on coding earth
      </Heading>
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
    </>
  )
}
