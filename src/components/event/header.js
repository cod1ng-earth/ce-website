import React from "react"

import { Box, Grid, Heading, Image, Text } from "grommet"

import ResponsiveGrid from "../ResponsiveGrid"
import RSVPButton from "../ui/RSVPButton"
import { DateTime } from "luxon"

export default ({ meetup, group }) => {
  const date = DateTime.fromMillis(meetup.time).setZone(meetup.group.timezone)

  return (
    <Box background="dark-2" height="small">
      <ResponsiveGrid>
        <Grid columns={[`auto`, `auto`, `auto`]} justifyContent="start">
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
            <Text justifyContent="start">
              {date.toFormat(`ccc`)},{` `}
              {date.toLocaleString(DateTime.DATETIME_MED)}
            </Text>
            <Text>{meetup.venue && meetup.venue.name}</Text>
          </Box>
          <Box justify="center">
            {meetup.status === `upcoming` && <RSVPButton meetup={meetup} />}
          </Box>
        </Grid>
      </ResponsiveGrid>
    </Box>
  )
}
