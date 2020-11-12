const axios = require('axios');

console.log(process.env.GATSBY_GRAPHQL_API_URL);

module.exports = axios.default.create({ baseURL: process.env.GATSBY_GRAPHQL_API_URL });
