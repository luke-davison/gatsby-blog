import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'

import Page from './page'

export const query = graphql
    `
    query PostsByID($id: String!) {
        mdx(
            id: { eq: $id }
        ){
            body
            frontmatter {
                title
                date(formatString: "Do MMMM YYYY")
                written(formatString: "Do MMMM YYYY")
                category
            }
        }
    }
`

export default function PostPageTemplate({ data }) {
    const { frontmatter, body } = data.mdx
    return (
        <Page>
            <header>
                <h1>{frontmatter.title}</h1>
                <p>{'Date: ' + frontmatter.date}</p>
            </header>
            <MDXRenderer>{body}</MDXRenderer>
            <footer>
                <p>{'Written: ' + frontmatter.written}</p>
                <p>{'Category: ' + frontmatter.category  }</p>
            </footer>
        </Page>
    )
}