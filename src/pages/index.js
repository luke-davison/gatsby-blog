import * as React from 'react'
import { graphql, Link } from 'gatsby'

import Page from "../components/page"

import '@fontsource/cabin'
import '@fontsource/raleway'

export const query = graphql
`
    query SITE_INDEX_QUERY {
        site {
            siteMetadata {
               title
               description
            }
        }
        allMdx(
            sort: {fields: [frontmatter___written], order: DESC},
            filter: {frontmatter: {published: {eq: true}}}
        ){
            nodes {
                id
                excerpt(pruneLength: 250)
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
    }
`

const HomePage = ({ data }) => {
  return (
      <Page>
          <div>
              <h1>{data.site.siteMetadata.title}</h1>
              <p>{data.site.siteMetadata.description}</p>
          </div>

          <div>
              {data.allMdx.nodes.map(({ excerpt, frontmatter, fields }, index) => (
                  <div key={index}>
                      <Link to={fields.slug}>
                          <h2>{frontmatter.title}</h2>
                      </Link>
                      <p>{frontmatter.date}</p>
                      <p>{excerpt}</p>
                  </div>
              ))}
          </div>
      </Page>
  )
}

export default HomePage