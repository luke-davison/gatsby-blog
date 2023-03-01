import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Page from "../components/page"

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

      <div className="list-of-posts">
        {data.allMdx.nodes.map(({ excerpt, frontmatter, fields }, index) => {
          let featuredImg = getImage(
            frontmatter.featuredImage?.childImageSharp?.gatsbyImageData
          )
          return (
            <Link key={index} to={fields.slug}>
              <div className="post-container">
                <GatsbyImage image={featuredImg} />
                <h2 className="post-title">{frontmatter.title}</h2>
                <p className="post-date">{frontmatter.date}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </Page>
  )
}

export default HomePage
