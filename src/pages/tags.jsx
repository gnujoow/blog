import React from "react"
import PropTypes from "prop-types"

// Utilities
import kebabCase from "lodash.kebabcase"

// Components
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout title={title}>
    <Helmet title={title} />
    <>
      {group.map(tag => (
        <span key={kebabCase(tag.fieldValue)}>
          <Link to={`/tags#${kebabCase(tag.fieldValue)}`}>
            {tag.fieldValue} ({tag.totalCount})
          </Link> / {' '}
        </span>
      ))}
      {group.map(tag => (
        <div key={tag.fieldValue}>
          <h2 id={kebabCase(tag.fieldValue)}>
            {tag.fieldValue} ({tag.totalCount})
          </h2>
          <hr />
          <ul>
            {tag.nodes.map(item => {
              const { slug } = item.fields
              const { title } = item.frontmatter
              return (
                <li key={slug}>
                  <Link to={slug}>{title}</Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </>
  </Layout>
)

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000, sort: {fields: frontmatter___title, order: DESC}) {
      totalCount
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
        nodes {
          fields {
            slug
          }
          frontmatter {
            title
            date
            category
          }
        }
      }
    }
  }
`
