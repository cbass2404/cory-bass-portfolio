import { useState, useEffect } from 'react';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import CommentItem from '../../comments/CommentItem';
import classes from './CommentSection.module.scss';

const CommentSection = (props: any) => {
  const [comments, setComments] = useState<any[] | null>(null);

  useEffect(() => {
    if (props.comments) {
      setComments(props.comments);
    }
  }, [props.comments]);

  const handleClick = async (id: string) => {
    const response = await fetch('/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({ _id: id, type: 'comment' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error:', data.message);
      return;
    }

    const newComments: any = comments?.filter(
      (comment: any) => comment._id !== id
    );
    setComments(newComments);
  };

  return (
    <div className={classes.wrapper}>
      {comments?.map((comment: any) => {
        return (
          <div key={comment._id} className={classes.item}>
            <CommentItem comment={comment} />
            <div
              onClick={() => handleClick(comment._id)}
              className={classes.icon}
            >
              <FontAwesomeIcon icon={faCheck} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentSection;
