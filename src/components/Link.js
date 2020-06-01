import React from 'react'
import { Anchor } from 'grommet'
import { navigate } from 'gatsby'

const Link = ({ to, ...rest }) => (
  <Anchor
    href={to}
    onClick={ev => {
      navigate(to)
      ev.preventDefault()
    }}
    {...rest}
  />
)

export default Link
