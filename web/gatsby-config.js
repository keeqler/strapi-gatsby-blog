require('dotenv').config();

module.exports = {
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `Blog`,
        fieldName: `blog`,
        url: process.env.GATSBY_GRAPHQL_API_URL
      }
    }
  ],
  siteMetadata: {
    title: 'Simple Blog'
  }
};
