import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"

export default function PostList({ posts }) {
  return (
    <div className="list-of-posts">
      {posts.map(({ frontmatter, fields }, index) => {
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
  )
}
