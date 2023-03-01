/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

 module.exports = {
  siteMetadata: {
      title: `The Travels of Luke and Betty`,
      description: `This is where Luke and Betty post pictures of their stuff.  And words about that stuff.`,
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-remark-images`,
      {
          resolve: `gatsby-plugin-mdx`,
          options: {
            gatsbyRemarkPlugins: [
                {
                  resolve: `gatsby-remark-images`,
                  options: {
                    maxWidth: 1200,
                  },
                },
              ],
            extensions: [`.mdx`, `.md`],
          },
      },
      {
          resolve: `gatsby-source-filesystem`,
          options: {
              name: `posts`,
              path: `${__dirname}/src/posts`,
          },
      },
  ],
}
