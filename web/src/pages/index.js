import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { formatRelative, subDays } from 'date-fns';

import './styles.scss';

export default () => {
  const data = useStaticQuery(graphql`
    query {
      blog {
        posts {
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

      <main id="posts-container">
        {posts.map(post => (
          <article className="post">
            <h1 className="post-title">{post.title}</h1>

            <span className="post-publish-date">
              Published {formatRelative(new Date(post.published_at), new Date())}
            </span>

            <span className="post-content">{post.content}</span>

            {/* TODO: use friendly names instead of id? */}
            <Link className="post-full-post-link" to={`/post/${post.id}`}>
              Read the full post →
            </Link>
          </article>
        ))}
      </main>
    </>
  );
};
