import React from 'react'
import { Button, Stack, Box } from 'grommet'

import { Link } from 'gatsby'

export const SectionButton = ({
  icon = null,
  label,
  to,
  color = 'orange',
  size = 'large',
}) => (
  <Stack anchor="left" alignSelf="center">
    <Button
      primary
      as={Link}
      to={to}
      label={label}
      style={{ paddingLeft: icon ? (size == 'large' ? '70px' : '50px') : '' }}
      color={`${color}-400`}
      size={size}
    />
    {icon && (
      <Box
        background={`${color}-600`}
        pad={size == 'large' ? '10px' : '4px'}
        fill="vertical"
        round
      >
        {icon}
      </Box>
    )}
  </Stack>
)
