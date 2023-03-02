import { graphql } from "gatsby"
import React from "react"
import PostList from "./post-list"

import Page from "./page"

export const query = graphql`
  query PostsByCategory($id: String) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMdx(
      sort: { fields: [frontmatter___written], order: DESC }
      filter: {
        frontmatter: { published: { eq: true }, category: { eq: $id } }
      }
    ) {
      nodes {
        id
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

export default function CategoryPageTemplate({ data }) {
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
