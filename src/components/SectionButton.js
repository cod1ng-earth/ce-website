import React from 'react'
import { Button, Stack, Box } from 'grommet'

import { Link } from 'gatsby'

export const SectionButton = ({
  Icon = null,
  label,
  to,
  color = 'orange',
  size = 'medium',
}) => (
  <Stack anchor="left" alignSelf="center">
    <Button
      primary
      as={Link}
      to={to}
      label={label}
      focusIndicator={false}
      style={{ paddingLeft: Icon ? (size == 'small' ? '40px' : '60px') : '' }}
      color={`${color}-400`}
      size={size}
    />
    {Icon && (
      <Box
        background={`${color}-600`}
        pad="8px"
        style={{ borderRadius: '20px' }}
      >
        <Icon size={size} color="white" />
      </Box>
    )}
  </Stack>
)
