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
    <Box direct="row">
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
        <Anchor
          icon={<Schedule />}
          href="/ics/ce_global_1.ics"
          title="download as ICS"
        />
      </Text>

      <Select
        plain
        icon={<Globe />}
        dropProps={{ stretch: 'false' }}
        size="small"
        dropHeight="medium"
        options={timezones}
        value={timeZone}
        onChange={({ option }) => changeTimezone(option)}
      />
    </Box>
  )
}
