/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/pages/projects`,
      },
    },
    `gatsby-transformer-remark`
  ],
}