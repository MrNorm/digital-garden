import path from 'path'

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'project',
        path: path.resolve('./pages/project')
      }
    },
    'gatsby-transformer-remark'
  ]
}
