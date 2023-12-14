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
    query AllPosts {
      allMdx(filter: { frontmatter: { published: { eq: true } } }) {
        edges {
          node {
            id
            fields {
              slug
              written
              category
            }
            internal {
              contentFilePath
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

  const postsToRandomise = Array.from(result.data.allMdx.edges).filter(post => {
    return post.node.fields.category !== "draft"
  })
  const randomPosts = []

  while (postsToRandomise.length > 0) {
    const r = Math.floor(Math.random() * postsToRandomise.length)
    const post = postsToRandomise.splice(r, 1)[0]
    randomPosts.push(post)
  }

  const template = path.resolve(`./src/components/post-page-template.js`)

  const categoryIds = [
    "taiwan-2023",
    "north-america-2023-2",
    "north-america-2023",
    "south-island-2022",
    "new-zealand-2020",
    "north-america-2019",
    "miscellaneous",
    "draft",
  ]

  categoryIds.forEach(category => {
    createPage({
      path: "/" + category,
      component: path.resolve(`./src/components/category-page-template.js`),
      context: { id: category },
    })

    const categoryPosts = posts.filter(
      post => post.node.fields.category === category
    )

    categoryPosts.sort(
      (postA, postB) =>
        new Date(postB.node.fields.written).getTime() -
        new Date(postA.node.fields.written).getTime()
    )

    categoryPosts.forEach(({ node }, index) => {
      const previousId =
        categoryPosts.find(
          (previous, previousIndex) => previousIndex === index + 1
        )?.node.id ?? null
      const nextId =
        categoryPosts.find((next, nextIndex) => nextIndex === index - 1)?.node
          .id ?? null
      const randomPosition = randomPosts.findIndex(
        post => post?.node?.id === node?.id
      )
      let nextRandomId = undefined

      if (randomPosition !== -1) {
        const nextRandomPosition =
          randomPosition === randomPosts.length - 1 ? 0 : randomPosition + 1
        nextRandomId = randomPosts[nextRandomPosition]?.node?.id ?? null
      }

      createPage({
        path: node.fields.slug,
        component: `${template}?__contentFilePath=${node.internal.contentFilePath}`,
        context: { id: node.id, previousId, nextId, nextRandomId },
      })
    })
  })
}
