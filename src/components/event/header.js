import React from "react"

import { Box, Grid, Heading, Image, Text } from "grommet"

import ResponsiveGrid from "../ResponsiveGrid"
import { DateTime } from "luxon"

export default ({ meetup, group }) => {
  const date = DateTime.fromMillis(meetup.time).setZone(meetup.group.timezone)

  return (
    <Box background="dark-2" height="small">
      <ResponsiveGrid>
        <Grid columns={[`auto`, `auto`]} justifyContent="start">
          <Image
            margin={{ right: `large` }}
            justify="center"
            alignSelf="center"
            fit="contain"
            src={group.group_photo.thumb_link}
          />
          <Box>
            <Heading level={2} margin={{ bottom: `xsmall` }}>
              {meetup.name}
            </Heading>
            <Text>
              {date.toFormat(`ccc`)},{` `}
              {date.toLocaleString(DateTime.DATETIME_MED)}
            </Text>

            <Text>{meetup.venue && meetup.venue.name}</Text>
          </Box>
        </Grid>
      </ResponsiveGrid>
    </Box>
  )
}
