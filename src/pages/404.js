import { Link } from "gatsby-link"
import React from "react"

import Page from "../components/page"
import PageSiteHeader from "../components/page-site-header"
import { useSiteMetadata } from "../hooks/use-site-metadata"

export default function FourOhFour() {
  const { title, description } = useSiteMetadata()
  return (
    <Page>
      <PageSiteHeader/>
      <p>I don't know how you got here but there's clearly been a mistake.</p>
    </Page>
  )
}
