import React from 'react'
import { Box } from 'grommet'
import imgHexagon from '../images/icons/hexagon.svg'
import styled from 'styled-components'

const Hr = styled.hr`
  max-width: 200px;
  margin: 0;
  flex-grow: 1;
  border: 0;
  height: 1px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
`

const Hexagon = styled(imgHexagon)`
  color: rgba(255, 255, 255, 0.5);
`

export const Divider = ({ color = 'red', borderColor = 'grey-400' }) => (
  <Box direction="row" gap="small" align="center" justify="center">
    <Hr borderColor={borderColor} />
    <Hexagon color={color} />
    <Hr borderColor={borderColor} />
  </Box>
)
