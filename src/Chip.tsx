import { variant, get } from 'styled-system'
import * as React from 'react'
import { Box } from './Box'
import styled from 'styled-components'
import { useTheme } from './useTheme'

function getInverse({
  target: hex,
  black = '#000000',
  white = '#ffffff',
}: {
  target: string
  black?: string
  white?: string
}): string {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1)
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.')
  }
  var r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16)
  // http://stackoverflow.com/a/3943023/112731
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? black : white
}

let InnerChip = styled(Box)(variant({ scale: 'chips', prop: 'variant' }))

interface Props {
  bg?: string
  children: any
}

export let Chip = React.forwardRef(function Chip({ bg, ...props }: Props, ref) {
  let theme = useTheme()
  let background = get(theme, `colors.${bg}`)
  return (
    <InnerChip
      py={1}
      px={2}
      borderRadius={1}
      forwardedAs="span"
      bg={bg}
      {...props}
      color={
        background
          ? getInverse({
              target: background,
              black: theme.colors.black,
              white: theme.colors.white,
            })
          : undefined
      }
      ref={ref}
    />
  )
})