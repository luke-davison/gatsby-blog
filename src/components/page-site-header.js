import React from 'react'
import { Link } from 'gatsby'

import '../css/styles.css'

export default function PageSiteHeader({ title }) {
    return (
        <h2 className="page-site-header">
            <Link to="/">
                {title}
            </Link>
        </h2>
    )
}