import React from 'react'
import { Button, Stack, Box } from 'grommet'
import { Next } from 'grommet-icons'
import { Link } from 'gatsby'

export const SectionButton = props => (
  <Stack anchor="left" alignSelf="center">
    <Button
      as={Link}
      to={props.to}
      color="orange-400"
      alignSelf="center"
      size="medium"
      primary
      active={false}
      label={props.label}
      style={{
        color: 'white',
        'font-size': '16px',
        'font-weight': '600',
        'border-radius': '20px',
        'padding-left': '50px',
      }}
    />
    <Box
      background="orange-600"
      width="40px"
      height="40px"
      align="center"
      justify="center"
      round
    >
      <Next color="white" />
    </Box>
  </Stack>
)
