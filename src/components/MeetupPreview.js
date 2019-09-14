import React, { useState } from "react"
import { Link } from "gatsby"
import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Paragraph,
  Stack,
  Text,
} from "grommet"
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
        margin={{ vertical: `medium` }}
        round="xxsmall"
        full={true}
        flex={true}
        alignSelf="center"
      >
        <Stack anchor="top-right">
          <Grid
            columns={[`auto`, `1/4`]}
            rows={[`auto`, `auto`]}
            areas={[
              { name: `title`, start: [0, 0], end: [1, 1] },
              { name: `img`, start: [1, 0], end: [1, 0] },
              { name: `desc`, start: [0, 1], end: [1, 1] },
            ]}
          >
            <Box gridArea="title" pad="small">
              <Text>
                {date.toFormat(`ccc`)},{` `}
                {date.toLocaleString(DateTime.DATETIME_MED)}
              </Text>
              <Heading full level={4} margin={{ bottom: `xsmall` }}>
                {meetup.name}
              </Heading>

              <Text>
                <Map size="medium" /> {meetup.venue && meetup.venue.name}
              </Text>
            </Box>
            <Box gridArea="img" height="170px" pad="small">
              <Image fit="cover" src={group.key_photo.photo_link} />
            </Box>

            <Box gridArea="desc" size="small" pad="small">
              <Paragraph fill>
                {excerpt(meetup.description, { pruneLength: 500 })}
              </Paragraph>
            </Box>
          </Grid>
          <Box
            background={meetup.status === `upcoming` ? `brand` : `dark-3`}
            pad={{ vertical: `xxsmall`, horizontal: `medium` }}
            style={{ marginTop: `-1.5rem` }}
          >
            <Text weight="bold">{meetup.status}</Text>
          </Box>
        </Stack>
      </HoverBox>
    </Link>
  )
}
