import * as React from "react"
import { graphql } from "gatsby"

import Page from "../components/page"
import PostList from "../components/post-list"

import "@fontsource/cabin"
import "@fontsource/raleway"

export const query = graphql`
  query SITE_INDEX_QUERY {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMdx(
      limit: 4
      sort: { fields: [frontmatter___written], order: DESC }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      nodes {
        id
        excerpt(pruneLength: 100)
        frontmatter {
          title
          date(formatString: "Do MMMM YYYY")
          written(formatString: "Do MMMM YYYY")
          category
          featuredImage {
            childImageSharp {
              gatsbyImageData(
                width: 400
                height: 400
                transformOptions: { cropFocus: CENTER }
              )
            }
          }
        }
        fields {
          slug
        }
      }
    }
  }
`

const HomePage = ({ data }) => {
  return (
    <Page>
      <div>
        <h1>{data.site.siteMetadata.title}</h1>
        <p>{data.site.siteMetadata.description}</p>
      </div>

      <PostList posts={data.allMdx.nodes} />
    </Page>
  )
}

export default HomePage
