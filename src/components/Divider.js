import React from 'react'
import { Box } from 'grommet'
import Hexagon from '../images/icons/hexagon.svg'
import styled from 'styled-components'
import { theme } from '../components/theme'

const StyledHr = styled.hr`
  max-width: 200px;
  margin: 0;
  flex-grow: 1;
  border: 0;
  height: 1px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
`

const StyledHexagon = styled(Hexagon)`
  color: rgba(255, 255, 255, 0.5);
`

export const Divider = props => (
  <Box direction="row" gap="small" align="center" justify="center">
    <StyledHr borderColor={props.borderColor} />
    <StyledHexagon color={props.color} />
    <StyledHr borderColor={props.borderColor} />
  </Box>
)
