import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

import "./layout.css"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    return (
      <>
        <header
          style={{
            backgroundColor: '#1D1D1D',
            padding: rhythm(1),
          }}
        >
d
        </header>
        <main
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          {children}
        </main>
      </>
    )
  }
}

export default Layout
