import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

import Post from '../components/Post';

import './styles.scss';

const Home = () => {
  const data = useStaticQuery(graphql`
    query {
      blog {
        posts(sort: "id:desc") {
          id
          title
          content
          published_at
        }
      }
    }
  `);

  const posts = data.blog.posts;

  return (
    <>
      <Helmet>
        <title>A Simple Blog</title>
      </Helmet>

      <main>
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </main>
    </>
  );
};

export default Home;
