import React from "react"

import { navigate } from "gatsby"

import { Box, Grid, Heading, Paragraph, Text } from "grommet"
import { Map } from "grommet-icons"
import styled from "styled-components"

import excerpt from "excerpt-html"
import { DateTime } from "luxon"
import { theme } from "./theme"
import RSVPButton from "./ui/RSVPButton"

const colors = theme.global.colors

const HoverBox = styled(Box)`
  transition: all 300ms;
  cursor: pointer;
  :hover {
    background-color: ${props =>
      props.upcoming ? colors[`dark-1-active`] : colors[`dark-2`]};
    box-shadow: 0px 3px 0px
      ${props => (props.upcoming ? colors[`meetup-red`] : colors.turqoise)};
  }
`

export default ({ meetup }) => {
  let date = DateTime.fromMillis(meetup.time).setZone(meetup.group.timezone)

  return (
    <HoverBox
      background={meetup.status === `upcoming` ? `dark-1` : `dark-2`}
      margin={{ vertical: `medium` }}
      round="xxsmall"
      fill
      upcoming={meetup.status === `upcoming`}
      alignSelf="center"
      onClick={() => navigate(`/${meetup.group.urlname}/${meetup.meetupId}`)}
    >
      <Grid
        columns={[`auto`, `small`]}
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
          <Heading full level={3} margin={{ bottom: `small` }}>
            {meetup.name}
          </Heading>

          {meetup.venue ? (
            <Text weight="bold">
              <Map size="medium" /> {meetup.venue.name}
            </Text>
          ) : (
            <Text color="turqoise">needs a venue</Text>
          )}
        </Box>
        <Box>
          {meetup.status === `upcoming` && <RSVPButton meetup={meetup} />}
        </Box>

        <Box gridArea="desc" size="small" pad="small">
          <Paragraph fill>
            {excerpt(meetup.description, { pruneLength: 500 })}
          </Paragraph>
        </Box>
      </Grid>
    </HoverBox>
  )
}
