'use strict';

const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const posts = await strapi.services.post.find(ctx.query);
    const sanitizedPosts = sanitizeEntity(posts, { model: strapi.models.post });

    return sanitizedPosts.map(post => {
      const content = post.content;
      const breakStringIndex = content.indexOf('--break--');
      let contentCut;

      if (breakStringIndex) {
        contentCut = content.slice(0, breakStringIndex);
      }

      return { ...post, content: contentCut || content };
    });
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    const post = await strapi.services.post.findOne({ id });
    const sanitizedPost = await sanitizeEntity(post, { model: strapi.models.post });

    return { ...sanitizedPost, content: sanitizedPost.content.replace('\n--break--\n', '') };
  }
};
