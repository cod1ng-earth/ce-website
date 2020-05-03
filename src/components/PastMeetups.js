import React, { useContext } from 'react'
import { Box, Heading, Text, Image, ResponsiveContext, Grid } from 'grommet'
import { Calendar } from 'grommet-icons'
import { graphql, useStaticQuery, navigate } from 'gatsby'
import styled from 'styled-components'
import Time from './Time'

const StyledH3 = styled(Heading)`
  font-size: 20px;
  line-height: 30px;
  margin-block-start: 0;
  margin-block-end: 0;
`

export default function() {
  const breakpoint = useContext(ResponsiveContext)

  // const data = useStaticQuery(graphql`
  //   query {
  //     graphcms {
  //       meetups(
  //         orderBy: time_DESC
  //         where: {
  //           id_in: [
  //             "ck8vxvl1k1a700104ygm809n9"
  //             "ck8vxuq6g1a6i0104fcr7s9qm"
  //             "ck8vxvl1k1a710104juon23a5"
  //             "ck8vxp38w1h4x01645txt71eb"
  //             "ck8vxpthc1h5m0164m62lfqvp"
  //             "ck8vxp38w1h4t0164eujq7shc"
  //           ]
  //         }
  //       ) {
  //         id
  //         name
  //         time

  //         keyImage {
  //           url
  //         }
  //         highlightImage {
  //           url
  //         }
  //       }
  //     }
  //   }
  // `)

  // const meetups = data.graphcms.meetups
  const meetups = [1, 2, 3, 4, 5, 6].map(i => {
    return {
      id: 'foo' + i,
      name: 'meetup',
      time: '2012-10-23',
      keyImage: { url: 'https://picsum.photos/800/400' },
      highlightImage: { url: 'https://picsum.photos/800/300' },
    }
  })

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
            height="small"
            round={{ size: '4px', corner: 'top' }}
            overflow="hidden"
          >
            <Image fit="cover" fill src={meetup.highlightImage.url} />
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
              <Calendar color="orange-400" size="20px" />
              <Text color="grey-100" size="xsmall" margin={{ left: 'small' }}>
                {Time({ timeString: meetup.time })}
              </Text>
            </Box>
          </Box>
        </Box>
      ))}
    </Grid>
  )
}
