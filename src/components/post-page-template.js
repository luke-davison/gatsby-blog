import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"

import Page from "./page"
import PageBottomNavigation from "./page-bottom-navigation"
import PageSiteHeader from "./page-site-header"

export const query = graphql`
  query PostsByID($id: String, $previousId: String, $nextId: String) {
    site {
      siteMetadata {
        title
        description
      }
    }
    post: mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        date(formatString: "Do MMMM YYYY")
        written(formatString: "Do MMMM YYYY")
        category
      }
    }
    previous: mdx(id: { eq: $previousId }) {
      body
      frontmatter {
        title
        date(formatString: "Do MMMM YYYY")
        written(formatString: "Do MMMM YYYY")
        category
      }
      fields {
        slug
      }
    }
    next: mdx(id: { eq: $nextId }) {
      body
      frontmatter {
        title
        date(formatString: "Do MMMM YYYY")
        written(formatString: "Do MMMM YYYY")
        category
      }
      fields {
        slug
      }
    }
  }
`

export default function PostPageTemplate({ data }) {
  const { frontmatter, body } = data.post
  return (
    <Page>
      <PageSiteHeader title={data.site.siteMetadata.title} />
      <header>
        <h1>{frontmatter.title}</h1>
        <h4>{"Date: " + frontmatter.date}</h4>
      </header>
      <MDXRenderer>{body}</MDXRenderer>
      <footer>
        <h4>{"Written: " + frontmatter.written}</h4>
        <h4>{"Category: " + frontmatter.category}</h4>
        <PageBottomNavigation previous={data.previous} next={data.next} />
      </footer>
    </Page>
  )
}
