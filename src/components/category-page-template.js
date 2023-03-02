import { graphql } from "gatsby"
import React from "react"
import PostList from "./post-list"
import { categories } from "../categories"
import PageSiteHeader from "./page-site-header"

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

export default function CategoryPageTemplate({ data, pageContext }) {
  const { title, description } = categories.find(({ category }) => category === pageContext.id)

  return (
    <Page>
      <PageSiteHeader title={data.site.siteMetadata.title} />
      <div>
        <h1>{ title }</h1>
        <p>{ description }</p>
      </div>

      <PostList posts={data.allMdx.nodes} />
    </Page>
  )
}
