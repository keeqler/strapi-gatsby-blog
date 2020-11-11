const path = require(`path`);

exports.createPages = ({ graphql, actions }) =>
  new Promise(async (resolve, reject) => {
    const result = await graphql(`
      query {
        blog {
          posts {
            id
          }
        }
      }
    `);

    if (result.errors) {
      reject(result.errors);
    }

    result.data.blog.posts.forEach(post =>
      actions.createPage({
        path: `/${post.id}`,
        component: path.resolve('./src/templates/Post.js'),
        context: { id: post.id }
      })
    );

    resolve();
  });
