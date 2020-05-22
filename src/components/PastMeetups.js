import React, { useContext } from 'react'
import { Box, Heading, Text, Image, ResponsiveContext, Grid } from 'grommet'
import { Calendar } from 'grommet-icons'
import { graphql, useStaticQuery, navigate } from 'gatsby'
import styled from 'styled-components'
import Time from './Time'
import defaultImage from '../images/coding_earth_meetup.png'

const StyledH3 = styled(Heading)`
  font-size: 20px;
  line-height: 30px;
  margin-block-start: 0;
  margin-block-end: 0;
`

export default function({ meetups }) {
  const breakpoint = useContext(ResponsiveContext)

  return (
    <Grid
      columns={{
        count: { small: 1, medium: 2, large: 3 }[breakpoint],
        size: 'auto',
      }}
      gap="small"
    >
      {meetups.map(meetup => (
        <Box
          key={meetup.id}
          align="center"
          onClick={() => navigate(`meetup/${meetup.id}`)}
        >
          <Box
            height="200px"
            round={{ size: '4px', corner: 'top' }}
            overflow="hidden"
          >
            <Image
              fit="cover"
              fill
              src={
                meetup.highlightImage ? meetup.highlightImage.url : defaultImage
              }
            />
          </Box>
          <Box
            background={{ color: 'grey-700', opacity: true }}
            fill="horizontal"
            pad={{ vertical: 'small', horizontal: 'medium' }}
            justify="between"
            gap="small"
            height="115px"
            round={{ size: '4px', corner: 'bottom' }}
            elevation="xsmall"
          >
            <StyledH3 level={3} color="white" margin="none">
              {meetup.name}
            </StyledH3>
            <Box direction="row" align="center">
              <Calendar color="orange-400" />
              <Text color="grey-100" size="small" margin={{ left: 'small' }}>
                {Time({ timeString: meetup.time })}
              </Text>
            </Box>
          </Box>
        </Box>
      ))}
    </Grid>
  )
}
