import 'react-toastify/dist/ReactToastify.css';

import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { formatRelative } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

import './styles.scss';

export default ({
  post,
  hideFullPostLink = false,
  fetchComments = false,
  fullPostPageVariant = false
}) => {
  const [comments, setComments] = useState([]);

  // fetch post comments
  useEffect(() => {
    if (!fetchComments) return;

    (async () => {
      const response = await axios.post('http://localhost:1337/graphql', {
        query: `
          query {
            post(id: ${post.id}) {
              comments(sort: "id:desc") {
                id
                author
                comment
                published_at
              }
            }
          }
        `
      });

      setComments(response.data.data.post.comments);
    })();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const author = event.target[0].value;
    const comment = event.target[1].value;

    if (author === '' || comment === '') {
      return toast.error('Fields cannot be blank');
    }

    try {
      const response = await axios.post('http://localhost:1337/graphql', {
        query: `
          mutation CreateComment($author: String!, $comment: String!, $postId: ID!) {
            createComment(input: { data: { author: $author, comment: $comment, post: $postId } }) {
              comment {
                id
                author
                comment
                published_at
              }
            }
          }
        `,
        variables: {
          author,
          comment,
          postId: post.id
        }
      });

      setComments([response.data.data.createComment.comment, ...comments]);
      toast.success('Comment successfully posted');

      event.target.reset();
    } catch {
      toast.error('Sorry, something went wrong 🙁');
    }
  }

  return (
    <>
      <ToastContainer className="toast" />
      <article className="post">
        <h1 className="post-title">{post.title}</h1>

        <span className="post-publish-date">
          Published {formatRelative(new Date(post.published_at), new Date())}
        </span>

        <span className="post-content">{post.content}</span>

        {/* TODO: use friendly names instead of id? */}
        {!hideFullPostLink && (
          <Link className="post-full-post-link" to={`/${post.id}`}>
            Read the full post →
          </Link>
        )}

        {fetchComments && (
          <>
            <form className="comment-form" onSubmit={handleSubmit}>
              <h3>Add a new comment</h3>
              <input className="comment-form-input" name="author" placeholder="Your name" />

              <textarea
                className="comment-form-input textarea"
                name="content"
                placeholder="Comment"
              />

              <button type="submit">Post</button>
            </form>

            {comments.map(comment => (
              <div key={comment.id} className="comment">
                <span className="comment-author">{comment.author}</span>

                <span className="comment-publish-date">
                  {formatRelative(new Date(comment.published_at), new Date())}
                </span>

                <span className="comment-content">{comment.comment}</span>
              </div>
            ))}
          </>
        )}
      </article>
    </>
  );
};
