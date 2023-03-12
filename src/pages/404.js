import React from "react"

import HtmlHead from "../components/html-head"
import Page from "../components/page"
import PageSiteHeader from "../components/page-site-header"

export default function FourOhFour() {
  return (
    <Page>
      <PageSiteHeader/>
      <p>I don't know how you got here but there's clearly been a mistake.</p>
    </Page>
  )
}

export const Head = () => <HtmlHead />