import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import Post from '../components/Post';

const PostTemplate = ({ data }) => {
  const post = data.blog.post;

  return (
    <>
      <Helmet>
        <title>{post.title} - A Simple Blog</title>
      </Helmet>
      <Post post={post} hideFullPostLink fetchComments />
    </>
  );
};

export const query = graphql`
  query PostQuery($id: ID!) {
    blog {
      post(id: $id) {
        id
        title
        content
        published_at
      }
    }
  }
`;

export default PostTemplate;
