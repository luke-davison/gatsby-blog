import React from "react"
import { Link } from "gatsby"

import "../css/styles.css"

export default function PageSiteHeader() {
  return (
    <h2 className="page-site-header">
      <Link to="/">Luke and Betty Blog</Link>
    </h2>
  )
}
