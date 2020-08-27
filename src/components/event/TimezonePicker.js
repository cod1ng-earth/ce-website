import React, { useState } from 'react'

import { Anchor, Select, Text, Box } from 'grommet'
import { Globe, Schedule } from 'grommet-icons'

import tz from './timezones.json'

const timezones = [...tz.sort()]

export default ({ meetupUTCTime, tzUpdated }) => {
  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const [timeZone, setTimeZone] = useState(localTimezone)
  const userLocale = Intl.DateTimeFormat().resolvedOptions().locale

  function changeTimezone(tz) {
    setTimeZone(tz)
    tzUpdated(tz)
  }

  return (
    <Box gap="small">
      <Box align="center" direction="row" gap="small">
        <Schedule color="grey-400" />
        <Text size="medium">
          {meetupUTCTime.toLocaleString(userLocale, {
            timeZone,
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })}{' '}
        </Text>
      </Box>
      <Box align="center" direction="row" gap="small">
        <Globe color="grey-400" />
        <Select
          plain
          dropProps={{ stretch: true }}
          size="medium"
          dropHeight="medium"
          options={timezones}
          value={timeZone}
          onChange={({ option }) => changeTimezone(option)}
        />
      </Box>
    </Box>
  )
}
