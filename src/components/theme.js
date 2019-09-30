import { dark } from "grommet"
import { deepMerge } from "grommet/utils"

const noMaxWidthHeaders = {
  small: { maxWidth: `none` },
  medium: { maxWidth: `none` },
  large: { maxWidth: `none` },
  xlarge: { maxWidth: `none` },
}

export const theme = deepMerge(dark, {
  global: {
    colors: {
      active: `dark-5`,
      brand: `#FF9900`,
      turqoise: `#02ffff`,
      placeholder: `rgba(255, 255,255, 0.4)`,
      "very-dark": `hsl(0,0%,10%)`,
      "dark-1-active": `hsl(0,0%,23%)`,
      gatsby: `hsl(270, 50%, 40%)`,
      "gatsby-light": `hsl(270, 50%, 50%)`,
      "meetup-red": `#F64060`,
    },
    elevation: {
      light: {
        small: `0 0 1px 0 rgba(0, 0, 0, 0.40), 0 1px 2px 0 rgba(0,0,0,0.40)`,
        medium: `0 0 2px 0 rgba(0,0,0,0.40), 0 2px 4px 0 rgba(0,0,0,0.40)`,
        large: `0 0 1px 0 rgba(0,0,0,0.40), 0 4px 8px 0 rgba(0,0,0,0.40)`,
        xlarge: `0 0 1px 0 rgba(0,0,0,0.40), 0 8px 16px 0 rgba(0,0,0,0.40)`,
      },
    },

    font: {
      family: `'Karla', sans-serif`,
      size: `16px`,
      height: `20px`,
    },
    input: {
      weight: 500,
    },
    size: {
      avatar: `36px`,
      sidebar: `60px`,
    },
  },

  anchor: {
    color: `brand`,
    fontWeight: 900,
    hover: {
      color: `turquoise`,
    },
  },
  icon: {
    size: {
      medium: `18px`,
    },
  },
  heading: {
    font: { family: `OCR-A` },
    level: {
      "1": noMaxWidthHeaders,
      "2": noMaxWidthHeaders,
      "3": noMaxWidthHeaders,
      "4": noMaxWidthHeaders,
    },
  },
  paragraph: {
    medium: {
      size: `20px`,
      height: `28px`,
    },
    large: {
      size: `24px`,
      height: `28px`,
    },
  },
  text: {
    small: {
      size: `16px`,
      height: `18px`,
    },
    medium: {
      size: `20px`,
      height: `28px`,
    },
    large: {
      size: `24px`,
      height: `28px`,
    },
  },
})
