import React from "react"

import "../css/styles.css"

export default function Page({ children, className }) {
  let _className = "page"
  if (className) {
    _className += ` ${className}`
  }

  return <div className={_className}>{children}</div>
}
