import React from "react"
import { Link, graphql } from "gatsby"
import kebabCase from "lodash.kebabcase"
import { FacebookProvider, Comments } from 'react-facebook';

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

import "katex/dist/katex.min.css"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const {
      siteUrl,
      title,
    } = this.props.data.site.siteMetadata
    const {
      previous,
      next,
      slug,
   } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={title}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <FacebookProvider appId='531519394274880'>
          <article>
            <header>
              <h1
                style={{
                  marginTop: rhythm(1),
                  marginBottom: 0,
                }}
              >
                {post.frontmatter.title}
              </h1>
              <time
                dateTime={post.frontmatter.date}
                style={{
                  ...scale(-1 / 5),
                  display: `block`,
                  marginBottom: rhythm(1),
                }}
              >
                {post.frontmatter.date}
              </time>
              <p>
                {post.frontmatter.tags.map(tag => {
                  return (
                    <small key={tag}>
                      <Link to={`/tags#${kebabCase(tag)}`} rel='tag'>
                        #{tag}
                      </Link>{" "}
                    </small>
                  )
                })}
              </p>
            </header>
            <section dangerouslySetInnerHTML={{ __html: post.html }} />
            <hr
              style={{
                marginBottom: rhythm(1),
              }}
            />
            <footer>
              <Bio />
              <p>
                {post.frontmatter.tags.map(tag => {
                  return (
                    <small key={tag}>
                      <Link to={`/tags#${kebabCase(tag)}`} rel='tag'>
                        #{tag}
                      </Link>{" "}
                    </small>
                  )
                })}
              </p>
            </footer>
          </article>
          <Comments
            href={`${siteUrl}${slug}`}
            colorScheme="dark"
          />
          <nav>
            <ul
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 0,
              }}
            >
              <li>
                {previous && (
                  <Link to={previous.fields.slug} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </FacebookProvider>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        siteUrl
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
    }
  }
`
