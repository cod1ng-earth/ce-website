import React from 'react'
import { Button, Stack, Box } from 'grommet'

import Link from './Link'

export const SectionButton = ({
  Icon = null,
  label,
  to,
  color = 'orange',
  size = 'medium',
}) => (
  <Stack anchor="left" alignSelf="center">
    <Link to={to}>
      <Button
        primary
        label={label}
        focusIndicator={false}
        style={{ paddingLeft: Icon ? (size == 'small' ? '40px' : '60px') : '' }}
        color={`${color}-400`}
        size={size}
      />
    </Link>
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
