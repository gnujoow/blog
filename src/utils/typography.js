import Typography from "typography"
import theme from 'typography-theme-fairy-gates'
import CodePlugin from 'typography-plugin-code'

theme.plugins = [new CodePlugin()]
theme.overrideThemeStyles = ({ rhythm }, options) => {
  const primaryColor = "#bb86fc"
  const secondaryColor = '#03dac5'
  const backgroundColor = '#121212'
  return {
    'h1,h2,h3,h4': {
      color: 'rgba(255, 255, 255, 0.87)'
    },
    'p': {
      color: 'rgba(255, 255, 255, 0.60)'
    },
    '*::selection': {
      backgroundColor: primaryColor,
      color: 'white',
    },
    'li': {
      color: 'rgba(255, 255, 255, 0.60)'
    },
    'a': {
      color: primaryColor,
      'text-shadow': 'none',
      backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, ${primaryColor} 1px, ${primaryColor} 2px, rgba(0, 0, 0, 0) 2px)`, // eslint-disable-line
    },
    'img': {
      'background-color': 'rgba(255, 255, 255, 0.60)',
      'border-radius': '3px',
    },
    'strong': {
      color: 'rgba(255, 255, 255, 0.87)'
    },
    'blockquote': {
      color: '#fff',
      background: '#2d2d2d',
      padding: '1rem',
      'border-radius': '3px',
      'font-style': 'normal',
    },
    'hr': {
      'background-color': secondaryColor,
    },
    'table': {
      'background-color': '#2d2d2d',
    },
    'td, th': {
      'border-bottom': `2px solid ${backgroundColor}`,
    }
  }
}

const typography = new Typography(theme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
