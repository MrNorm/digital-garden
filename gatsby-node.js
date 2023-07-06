const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions
    const dataTypes = ["project"];

    for (const dataType of dataTypes) {
        // Get all the Markdown nodes that posts that are on the blog folder
        const result = await graphql(
            `
            {
                typeQuery: allMarkdownRemark(
                filter: {fileAbsolutePath: {regex: "/\/${dataType}s\//"}}
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
                        path: `/${dataType}s/` + node.frontmatter.id,
                        component: path.resolve(`./src/templates/${dataType}.js`),
                        context: {
                            id: node.id,
                        },
                    })
                })
            }
    }
}