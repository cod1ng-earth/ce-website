import { dark } from 'grommet'
import { deepMerge } from 'grommet/utils'

const noMaxWidthHeaders = {
  small: { maxWidth: 'none' },
  medium: { maxWidth: 'none' },
  large: { maxWidth: 'none' },
  xlarge: { maxWidth: 'none' },
}

export const theme = deepMerge(dark, {
  global: {
    colors: {
      black: '#000000',
      active: 'dark-5',
      brand: '#FF9900',
      turqoise: '#02ffff',
      placeholder: 'rgba(255, 255,255, 0.4)',
      'very-dark': 'hsl(0,0%,10%)',
      'dark-1-active': 'hsl(0,0%,23%)',
      gatsby: 'hsl(270, 50%, 40%)',
      'gatsby-light': 'hsl(270, 50%, 50%)',
      'meetup-red': '#F64060',

      // Grey
      'grey-900': '#1A1A1A',
      'grey-800': '#242424',
      'grey-700': '#2E2E2E',
      'grey-600': '#3D3D3D',
      'grey-400': '#999999',

      // Purple
      'purple-700': '#4B1383',
      'purple-600': '#6528A1',
      'purple-500': '#8040BF',
      'purple-400': '#9E66D4',
      'purple-300': '#BB9ED7',

      // Orange
      'orange-600': '#E06C00',
      'orange-400': '#FF9900',
    },
    elevation: {
      light: {
        small: '0 0 1px 0 rgba(0, 0, 0, 0.40), 0 1px 2px 0 rgba(0,0,0,0.40)',
        medium: '0 0 2px 0 rgba(0,0,0,0.40), 0 2px 4px 0 rgba(0,0,0,0.40)',
        large: '0 0 1px 0 rgba(0,0,0,0.40), 0 4px 8px 0 rgba(0,0,0,0.40)',
        xlarge: '0 0 1px 0 rgba(0,0,0,0.40), 0 8px 16px 0 rgba(0,0,0,0.40)',
      },
    },

    font: {
      // eslint-disable-next-line
      family: "'Manrope', sans-serif",
      size: '16px',
      height: '1.75',
    },
    input: {
      weight: 500,
    },
    size: {
      avatar: '36px',
      sidebar: '60px',
    },
    breakpoints: {
      medium: {
        value: 1180,
      },
    },
  },

  anchor: {
    color: 'brand',
    fontWeight: 900,
    hover: {
      color: 'turquoise',
    },
  },
  icon: {
    size: {
      medium: '18px',
    },
  },
  heading: {
    level: {
      '1': noMaxWidthHeaders,
      '2': noMaxWidthHeaders,
      '3': noMaxWidthHeaders,
      '4': noMaxWidthHeaders,
    },
  },
  paragraph: {
    medium: {
      size: '20px',
      height: '28px',
    },
    large: {
      size: '24px',
      height: '28px',
    },
  },
  text: {
    small: {
      size: '16px',
      height: '18px',
    },
    medium: {
      size: '20px',
      height: '28px',
    },
    large: {
      size: '24px',
      height: '28px',
    },
  },
})
