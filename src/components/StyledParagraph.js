import styled from 'styled-components'
import { theme } from '../components/theme'

import { Paragraph } from 'grommet'

export default styled(Paragraph)`
  a {
    color: ${theme.global.colors.brand};
    :hover {
      color: ${theme.global.colors.turqoise};
    }
  }
`
