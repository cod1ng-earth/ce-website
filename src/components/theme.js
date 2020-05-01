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
      'grey-900-rgb': '26, 26, 26',
      'grey-800': '#242424',
      'grey-700': '#2E2E2E',
      'grey-600': '#3D3D3D',
      'grey-500': '#4D4D4D',
      'grey-400': '#999999',
      'grey-100': '#E6E6E6',

      // Purple
      'purple-700': '#4B1383',
      'purple-600': '#6528A1',
      'purple-500': '#8040BF',
      'purple-400': '#9E66D4',
      'purple-300': '#BB9ED7',
      'purple-100': '#C19AE8',

      // Orange
      'orange-600': '#E06C00',
      'orange-400': '#FF9900',
    },
    elevation: {
      light: {
        xsmall: '0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0,0,0,0.24)',
        small: '0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0,0,0,0.24)',
        medium: '0 0 2px 0 rgba(0,0,0,0.40), 0 2px 4px 0 rgba(0,0,0,0.40)',
        large: '0 0 1px 0 rgba(0,0,0,0.40), 0 4px 8px 0 rgba(0,0,0,0.40)',
        xlarge: '0 0 1px 0 rgba(0,0,0,0.40), 0 8px 16px 0 rgba(0,0,0,0.40)',
      },
      dark: {
        xsmall: '0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0,0,0,0.24)',
        small: '0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0,0,0,0.24)',
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
      weight: 400,
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
    control: {
      border: {
        radius: '4px',
      },
    },
    focus: {
      border: {
        color: {
          dark: '#000',
        },
      },
    },
  },

  anchor: {
    color: 'brand',
    fontWeight: 500,
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
    xsmall: {
      size: '12px',
      height: '1.417',
    },
    small: {
      size: '14px',
      height: '1.85',
    },
    medium: {
      size: '16px',
      height: '1.75',
    },
    large: {
      size: '18px',
      height: '1.75',
    },
  },
  text: {
    xsmall: {
      size: '14px',
      height: '1.75',
    },
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
    code: {
      size: '18px',
      height: '1.75',
      extend: {
        family: 'OCR-A',
      },
    },
  },
  formField: {
    border: {
      color: {
        dark: 'transparent',
      },
      side: 'none',
      size: '0',
    },
    extend: `
      border-radius: 4px;
      background: #2E2E2E;
      border: 1px solid #141414;
      font-size: 14px;
      padding: 10px 12px;
    `,
  },
  textArea: {
    border: {
      color: {
        dark: 'transparent',
      },
      side: 'none',
      size: '0',
    },
    extend: `
      border-radius: 4px;
      background: #2E2E2E;
      border: 1px solid #141414;
      font-size: 14px;
      padding: 20px 25px;

      &:focus {
        border-color: #000;
      }
    `,
  },
})
