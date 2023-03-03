import * as React from "react"
import { graphql, Link } from "gatsby"

import Page from "../components/page"
import PostList from "../components/post-list"

import "@fontsource/cabin"
import "@fontsource/raleway"
import { categories } from "../categories"

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

const HomePage = ({ data, ...rest }) => {
  return (
    <Page>
      <div>
        <h1>{data.site.siteMetadata.title}</h1>
        <p>{data.site.siteMetadata.description}</p>
      </div>

      <h2>Our holidays</h2>

      <div className="category-list">
        { categories.map(category => (
          <Link to={category.slug}>{category.title}</Link>
        ))}
      </div>

      <h2>Latest blog entries</h2>

      <PostList posts={data.allMdx.nodes} />

      <p>This site doesn't have any fancy features like subscribing or commenting.</p>
      <p>If you have a comment - please email it to me.  If you want to subscribe, let me know and I'll send you an email every time I upload a new entry.</p>
    </Page>
  )
}

export default HomePage
