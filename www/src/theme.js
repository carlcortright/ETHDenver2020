// example theme.js
export default {
    breakpoints: ['40em', '52em', '64em'],
    fontSizes: [
      12, 14, 16, 20, 24, 32, 48, 64
    ],
    colors: {
      primary: '#00CD90',
      lightgray: '#9FA4AE'
    },
    space: [
      0, 4, 8, 16, 32, 64, 128, 256
    ],
    fonts: {
        body: '"Apercu", sans-serif',
        heading: '"Apercu", sans-serif',
    },
    fontWeights: {
        body: 400,
        heading: 700,
        bold: 700,
      },
    styles: {
        root: {
          fontFamily: 'body',
          fontWeight: 'body',
        },
    },
    lineHeights: {
      body: 1.5,
      heading: 1.25,
    },
    shadows: {
      small: '0 0 4px rgba(0, 0, 0, .125)',
      large: '0 0 24px rgba(0, 0, 0, .125)'
    },
    variants: {
    },
    text: {
    },
    buttons: {
      primary: {
        color: 'white',
        bg: 'primary',
        lineHeight: 1.15,
        borderRadius: '0.316rem',
        padding: '1rem',
        fontFamily: 'body'
      }
    },
    forms: {
        input: {
            border: '0px solid',
            borderBottom: '1px solid',
            borderColor: 'lightgray',
            '&:focus': {
                outline: 'none',
                borderColor: 'primary',
            }
        },
        select: {
          borderRadius: 9999,
        },
        textarea: {},
        label: {},
        radio: {},
        checkbox: {},
      },
  }