import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const { title, social } = data.site.siteMetadata

    return (
      <Layout location={this.props.location} title={title}>
        <SEO title="about" />
        <ul>
          <li>
            <a
              href={`https://twitter.com/${social.twitter}`}
              target='blank'
              rel='author'
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href={`https://github.com/${social.github}`}
              target='blank'
              rel='author'
            >
              Github
            </a>
          </li>
          <li>
            <a
              href={`https://www.linkedin.com/in/${social.linkedin}`}
              target='blank'
              rel='author'
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        social {
          github
          twitter
          linkedin
        }
      }
    }
  }
`
