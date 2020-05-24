import { variant } from 'styled-system'
import styled from 'styled-components'
import { Box } from './Box'

let headingVariant = variant({
  scale: 'headings',
  prop: 'variant',
})

export let Heading = styled(Box)(headingVariant)
