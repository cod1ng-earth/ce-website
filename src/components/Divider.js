import React from 'react'
import { Box } from 'grommet'
import Hexagon from '../images/icons/hexagon.svg'
import styled from 'styled-components'
import { theme } from '../components/theme'

const StyledHr = styled.hr`
  max-width: 200px;
  margin: 0;
  flex-grow: 1;
`

const StyledHexagon = styled(Hexagon)`
  color: ${theme.global.colors['grey-500']};
`

export const Divider = () => (
  <Box direction="row" gap="small" align="center" justify="center">
    <StyledHr />
    <StyledHexagon />
    <StyledHr />
  </Box>
)
