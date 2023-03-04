import { graphql, Link } from "gatsby"
import React from "react"
import { categories } from "../categories"

import Page from "./page"
import PageBottomNavigation from "./page-bottom-navigation"
import PageSiteHeader from "./page-site-header"

export const query = graphql`
  query PostsByID($id: String, $previousId: String, $nextId: String) {
    post: mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "Do MMMM YYYY")
        written(formatString: "Do MMMM YYYY")
        category
      }
    }
    previous: mdx(id: { eq: $previousId }) {
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
    next: mdx(id: { eq: $nextId }) {
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
  }
`

export default function PostPageTemplate({ data, children }) {
  const { frontmatter } = data.post
  const category = categories.find(cat => cat.category === frontmatter.category)
  return (
    <Page>
      <PageSiteHeader />
      <header>
        <h1>{frontmatter.title}</h1>
        <h4>{"Date: " + frontmatter.date}</h4>
      </header>
      {children}
      <footer>
        <h4>{"Written: " + frontmatter.written}</h4>
        <h4>
          <Link to={category.slug}>{category.title}</Link>
        </h4>
        <PageBottomNavigation previous={data.previous} next={data.next} />
      </footer>
    </Page>
  )
}
