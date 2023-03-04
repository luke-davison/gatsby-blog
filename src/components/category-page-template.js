import { graphql } from "gatsby"
import React from "react"
import PostList from "./post-list"
import { categories } from "../categories"
import PageSiteHeader from "./page-site-header"

import Page from "./page"

export const query = graphql`
  query PostsByCategory($id: String) {
    allMdx(
      sort: { frontmatter: { written: DESC } }
      filter: {
        frontmatter: { published: { eq: true }, category: { eq: $id } }
      }
    ) {
      nodes {
        frontmatter {
          title
          date(formatString: "Do MMMM YYYY")
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

export default function CategoryPageTemplate({ data, pageContext }) {
  const { title, description } = categories.find(
    ({ category }) => category === pageContext.id
  )

  return (
    <Page>
      <PageSiteHeader />
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <PostList posts={data.allMdx.nodes} />
    </Page>
  )
}
