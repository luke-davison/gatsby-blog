import React from "react"

import "../css/styles.css"

export default function Page({ children }) {
  return (
    <>
      <title>The Luke and Betty Blog</title>
      <div className="page">{children}</div>
    </>
  )
}
