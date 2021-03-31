import React from "react"

import { useSiteMetadata } from "../hooks/use-site-metadata"

export default function About() {
    const { title, description } = useSiteMetadata()
    return (
        <div>
            <h1>Welcome to {title}</h1>
            <p>About: {description}</p>
        </div>
    )
}