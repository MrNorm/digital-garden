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
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'cuttings',
        path: path.resolve('./pages/cutting')
      }
    },
    'gatsby-transformer-remark'
  ]
}
