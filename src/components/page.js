import React from "react"

import "../css/styles.css"

export default function Page({ children, className }) {
  let _className = "page"
  if (className) {
    _className += ` ${className}`
  }

  return (
    <>
      <title>The Luke and Betty Blog</title>
      <div className={_className}>{children}</div>
    </>
  )
}
