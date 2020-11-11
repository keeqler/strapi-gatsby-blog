module.exports = {
  resolver: {
    Mutation: {
      createComment: {
        policies: ['require-post-field']
      }
    }
  }
};
