import React from 'react'
import { Button, Stack, Box } from 'grommet'

import { Link } from 'gatsby'

export const SectionButton = ({
  icon = null,
  label,
  to,
  color = 'orange-400',
}) => (
  <Stack anchor="left" alignSelf="center">
    <Button
      primary
      as={Link}
      to={to}
      label={label}
      style={{ paddingLeft: icon ? '70px' : '' }}
      color={color}
    />
    {icon && (
      <Box background="orange-600" pad="11px" fill="vertical" round>
        {icon}
      </Box>
    )}
  </Stack>
)
