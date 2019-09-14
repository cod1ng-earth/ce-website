import React, { useState } from "react"
import { Link } from "gatsby"
import { Box, Button, Grid, Heading, Image, Paragraph, Text } from "grommet"
import { Map } from "grommet-icons"
import styled from "styled-components"

import excerpt from "excerpt-html"
import { DateTime } from "luxon"

const HoverBox = styled(Box)`
  transition: transform ease-in-out 200ms, box-shadow 500ms;
  :hover {
    transform: scale(1.01);
    box-shadow: -2px 0px 0px #02ffff;
  }
`

export default ({ group, meetup }) => {
  let date = DateTime.fromMillis(meetup.time).setZone(group.timezone)

  return (
    <Link
      to={`/${group.urlname}/${meetup.meetupId}`}
      style={{ textDecoration: `none` }}
    >
      <HoverBox
        background="dark-1"
        margin={{ vertical: `small` }}
        pad="small"
        round="xxsmall"
        full={true}
        flex={true}
        alignSelf="center"
      >
        <Grid columns={[`auto`, `1/4`]}>
          <Box>
            <Text>
              {date.toFormat(`ccc`)},{` `}
              {date.toLocaleString(DateTime.DATETIME_MED)}
            </Text>
            <Heading level={4} margin={{ bottom: `xsmall` }}>
              {meetup.name}
            </Heading>

            <Text>
              <Map size="medium" /> {meetup.venue && meetup.venue.name}
            </Text>
          </Box>
          <Box height="xsmall">
            <Image fit="cover" src={group.key_photo.photo_link} />
          </Box>
        </Grid>

        <Paragraph size="small" fill>
          {excerpt(meetup.description, { pruneLength: 280 })}
        </Paragraph>
      </HoverBox>
    </Link>
  )
}
