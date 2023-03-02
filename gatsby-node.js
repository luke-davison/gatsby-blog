const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    createNodeField({
      name: `slug`,
      node,
      value: node.frontmatter.slug
        ? `/posts${node.frontmatter.slug}`
        : `/posts${createFilePath({ node, getNode })}`,
    })

    createNodeField({
      name: `written`,
      node,
      value: node.frontmatter.written,
    })

    createNodeField({
      name: `date`,
      node,
      value: node.frontmatter.date,
    })

    createNodeField({
      name: `category`,
      node,
      value: node.frontmatter.category,
    })
  }
}

const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
              written
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  // Create blog post pages.
  const posts = Array.from(result.data.allMdx.edges)
  posts.sort(
    (postA, postB) =>
      new Date(postB.node.fields.written).getTime() -
      new Date(postA.node.fields.written).getTime()
  )

  posts.forEach(({ node }, index) => {
    const previousId = posts.find(
      (previous, previousIndex) => previousIndex === index + 1
    )?.node.id
    const nextId = posts.find((next, nextIndex) => nextIndex === index - 1)
      ?.node.id

    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/components/post-page-template.js`),
      context: { id: node.id, previousId, nextId },
    })
  })

  const categoryIds = ["north-america-2023", "new-zealand-2022", "new-zealand-2020", "north-america-2019"]

  categoryIds.forEach((category) => {
    createPage({
      path: "/" + category,
      component: path.resolve(`./src/components/category-page-template.js`),
      context: { id: category },
    })
  })
}
