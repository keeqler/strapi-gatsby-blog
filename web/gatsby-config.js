/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `Blog`,
        fieldName: `blog`,
        url: `http://localhost:1337/graphql`
      }
    }
  ],
  siteMetadata: {
    title: 'Simple Blog'
  }
};
