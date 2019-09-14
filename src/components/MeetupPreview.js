import React from "react"
import { Link } from "gatsby"
import { Box, Button, Grid, Heading, Image, Paragraph, Text } from "grommet"
import { Map } from "grommet-icons"

import excerpt from "excerpt-html"
import { DateTime } from "luxon"

export default ({ group, meetup }) => {
  let date = DateTime.fromMillis(meetup.time)
  date = date.setZone(group.timezone)

  return (
    <Box
      background="dark-1"
      margin={{ vertical: `small` }}
      pad="small"
      round="small"
      full={true}
      flex={true}
      width="large"
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

      <Box alignSelf="end">
        <Link to={`/${group.urlname}/${meetup.meetupId}`}>
          <Button primary={true} color="turqoise" label="Details" />
        </Link>
      </Box>
    </Box>
  )
}
