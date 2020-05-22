import React from 'react'
import { Button, Stack, Box } from 'grommet'
import { Next } from 'grommet-icons'
import { Link } from 'gatsby'

export const SectionButton = ({ label, to, color = 'orange-400' }) => (
  <Stack anchor="left" alignSelf="center">
    <Button
      primary
      as={Link}
      to={to}
      label={label}
      style={{ paddingLeft: '70px' }}
      color={color}
    />
    <Box background="orange-600" pad="11px" fill="vertical" round>
      <Next color="white" />
    </Box>
  </Stack>
)
