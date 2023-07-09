import path from 'path'

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const dataTypes = ['project']

  for (const dataType of dataTypes) {
    const result = await graphql(`
        {
            typeQuery: allMarkdownRemark(
                filter: {fileAbsolutePath: {regex: "//${dataType}//"}}
            ) {
            nodes {
                id
                frontmatter {
                    id
                }
            }
            }
        }`)

    const nodes = result.data.typeQuery.nodes

    if (nodes.length > 0) {
      nodes.forEach((node, index) => {
        createPage({
          path: `/${dataType}/` + node.frontmatter.id,
          component: path.resolve(`./src/templates/${dataType}.tsx`),
          context: {
            id: node.id
          }
        })
      })
    }
  }
}
