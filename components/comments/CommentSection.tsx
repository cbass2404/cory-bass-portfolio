import { useState, useCallback, useEffect } from 'react';
import Link from 'next/dist/client/link';

import CommentForm from './CommentForm';
import CommentList from './CommentList';
import classes from './CommentSection.module.scss';

const CommentSection = (props: any) => {
  const { session, post } = props;

  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<string[]>(props.comments || null);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const onSubmit = async (comment: string) => {
    const newComment = {
      _post: post,
      _user: session.user.name,
      image: session.user.image,
      comment,
    };

    const result = await fetch('/api/posts/comments', {
      method: 'POST',
      body: JSON.stringify(newComment),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await result.json();

    setComments([data.data, ...comments]);
    setComment('');
  };

  if (session && showComments) {
    return (
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <button className={classes.link} onClick={toggleComments}>
            Hide Comments
          </button>
        </div>
        <div className={classes.content}>
          <CommentForm
            handleSubmit={onSubmit}
            comment={comment}
            setComment={setComment}
            label="New Comment:"
          />
        </div>
        <div className={classes.content}>
          <CommentList
            comments={comments}
            setComments={setComments}
            user={session.user.name}
          />
        </div>
      </div>
    );
  }

  if (showComments) {
    return (
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <button className={classes.link} onClick={toggleComments}>
            Hide Comments
          </button>
        </div>
        <div className={classes.content}>
          <Link href="/auth">Sign in to comment</Link>
        </div>
        <div className={classes.content}>
          <CommentList comments={comments} setComments={setComments} />
        </div>
      </div>
    );
  }

  return (
    <div className={classes.wrapper}>
      <button className={classes.link} onClick={toggleComments}>
        Show Comments
      </button>
    </div>
  );
};

export default CommentSection;
