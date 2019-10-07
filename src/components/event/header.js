import React from "react"

import { Box, Grid, Heading, Image, ResponsiveContext, Text } from "grommet"

import ResponsiveGrid from "../ResponsiveGrid"
import RSVPButton from "../ui/RSVPButton"
import { DateTime } from "luxon"

const areas = {
  small: [
    { name: `logo`, start: [1, 0], end: [1, 0] },
    { name: `headline`, start: [0, 1], end: [2, 1] },
  ],
  medium: [
    { name: `logo`, start: [0, 0], end: [0, 0] },
    { name: `headline`, start: [1, 0], end: [1, 0] },
  ],
  large: [
    { name: `logo`, start: [0, 0], end: [0, 0] },
    { name: `headline`, start: [1, 0], end: [1, 0] },
  ],
}
areas.xlarge = areas.large

export default ({ meetup, group }) => {
  const date = DateTime.fromMillis(meetup.time).setZone(meetup.group.timezone)

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box background="dark-2">
          <ResponsiveGrid>
            <Box>
              <Grid
                gap="medium"
                areas={areas[size]}
                columns={[`auto`, `auto`, `auto`]}
                rows={[`auto`, `auto`]}
                justifyContent="center"
                alignContent="center"
                align="center"
              >
                <Image
                  gridArea="logo"
                  fit="contain"
                  src={group.group_photo.thumb_link}
                  justify="center"
                  alignSelf="center"
                  justifySelf="center"
                  alt={`${group.name} meetup logo`}
                />

                <Box gridArea="headline">
                  <Heading level={1} margin={{ bottom: `xsmall` }}>
                    {meetup.name}
                  </Heading>

                  <Grid columns={[`auto`, `auto`]} align="center">
                    <Box>
                      <Text>
                        {date.toFormat(`ccc`)},{` `}
                        {date.toLocaleString(DateTime.DATETIME_MED)}
                      </Text>
                      <Text>{meetup.venue && meetup.venue.name}</Text>
                    </Box>
                    <Box>
                      {meetup.status === `upcoming` && (
                        <RSVPButton meetup={meetup} />
                      )}
                    </Box>
                  </Grid>
                </Box>
              </Grid>
            </Box>
          </ResponsiveGrid>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  )
}
