import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default class BlogList extends React.Component {
  render() {
    const { data } = this.props;
    const { allMarkdownRemark, site } = data;
    const { pageContext } = this.props;
    const posts = allMarkdownRemark.edges
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={`page ${this.props.pageContext.currentPage}`} />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug}>
              <header>
                <time dateTime={node.frontmatter.date}>{node.frontmatter.date}</time>
                {" "}
                <Link to={node.fields.slug}>
                  {title}
                </Link>
              </header>
            </article>
          )
        })}

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
              {pageContext.currentPage !== 1 && (
                <Link
                  to={
                    pageContext.currentPage === 2
                    ? '/blog'
                    : `/blog/${pageContext.currentPage - 1}`
                  }
                  rel="next"
                >
                  이전 페이지
                </Link>
              )}
            </li>
            <li>
              {pageContext.currentPage !== pageContext.numPages && (
                <Link
                  to={`/blog/${pageContext.currentPage + 1}`}
                  rel="next"
                >
                  다음 페이지
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
            description
          }
        }
      }
    }
  }
`
