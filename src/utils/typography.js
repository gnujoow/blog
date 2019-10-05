import Typography from "typography"
import theme from 'typography-theme-fairy-gates'
import CodePlugin from 'typography-plugin-code'

theme.plugins = [new CodePlugin()]
theme.overrideThemeStyles = ({ rhythm }, options) => ({
  'h1,h2,h3': {
    color: '#fff',
  },
  'p': {
    color: 'rgba(255, 255, 255, 0.87)'
  },
  'a': {
    color: '#BB86FC',
    'text-shadow': 'none',
  },
  'blockquote': {
    color: '#fff',
    background: '#2d2d2d',
    padding: '1rem',
    'border-radius': '3px',
  },
})

const typography = new Typography(theme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
