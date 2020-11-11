module.exports = async (ctx, next) => {
  const postField = ctx.request.body.post;

  if (postField !== '' && isNaN(postField)) {
    ctx.response.status = 400;
    throw new Error('"postId" is missing');
  }

  await next();
};
