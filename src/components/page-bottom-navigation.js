import React from "react"
import { Link } from "gatsby"

import "../css/styles.css"

export default function PageBottomNavigation({ previous, next }) {
  return (
    <div className="page-bottom-navigation">
      <div className="next-link">
        {next && (
          <>
            <h3>Next</h3>
            <Link to={next.fields.slug}>{next.frontmatter.title}</Link>
          </>
        )}
      </div>
      <div className="previous-link">
        {previous && (
          <>
            <h3>Previous</h3>
            <Link to={previous.fields.slug}>{previous.frontmatter.title}</Link>
          </>
        )}
      </div>
    </div>
  )
}
