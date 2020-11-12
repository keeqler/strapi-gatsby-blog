const path = require(`path`);
const generatePostUrl = require('./src/generatePostUrl');

exports.createPages = ({ graphql, actions }) =>
  new Promise(async (resolve, reject) => {
    const result = await graphql(`
      query {
        blog {
          posts {
            id
            title
            published_at
          }
        }
      }
    `);

    if (result.errors) {
      reject(result.errors);
    }

    result.data.blog.posts.forEach(post =>
      actions.createPage({
        path: generatePostUrl(post.title, new Date(post.published_at)),
        component: path.resolve('./src/templates/Post.js'),
        context: { id: post.id }
      })
    );

    resolve();
  });
