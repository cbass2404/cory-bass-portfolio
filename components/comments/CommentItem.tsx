import { useState } from 'react';
import Image from 'next/dist/client/image';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import CommentForm from './CommentForm';
import classes from './CommentItem.module.scss';
import ConfirmModul from './ConfirmModul';

const CommentItem = (props: any) => {
  const { date, _id, comment, _user, image } = props.comment;

  const [newComment, setNewComment] = useState(comment);
  const [editMode, setEditMode] = useState(false);
  const [openModul, setOpenModul] = useState(false);

  const formattedDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

  const formattedTime = (date: string) =>
    new Date(date).toLocaleTimeString('en-US');

  const imageCheck = () => {
    if (image !== '/images/user/no-img.png') {
      return;
    }
    return image;
  };

  const editComment = () => {
    if (editMode) {
      return (
        <div className={classes.comment}>
          <CommentForm
            handleSubmit={onSubmit}
            comment={newComment}
            setComment={setNewComment}
            label="Edit Comment:"
          />
        </div>
      );
    }
    return (
      <div className={classes.comment}>
        <p>{comment}</p>
      </div>
    );
  };

  const onSubmit = async (newComment: string) => {
    const result = await fetch('/api/posts/comments', {
      method: 'PATCH',
      body: JSON.stringify({ newComment, _id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await result.json();
  };

  const handleModulToggle = () => {
    setOpenModul(!openModul);
  };

  const deleteComment = async () => {
    const comment = { _id };
    const response = await fetch('/api/posts/comments', {
      method: 'DELETE',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      props.handleDelete(_id);
    }
  };

  const checkAuth = () => {
    if (_user === props.user || props.user === '@cbass') {
      return (
        <div className={classes.manageComment}>
          <div className={classes.edit} onClick={() => setEditMode(!editMode)}>
            <FontAwesomeIcon icon={faEdit} />
          </div>
          <div className={classes.delete} onClick={handleModulToggle}>
            <FontAwesomeIcon icon={faTrash} />
          </div>
          {openModul && (
            <ConfirmModul
              setOpenModul={setOpenModul}
              openModul={openModul}
              comment={comment}
              deleteComment={deleteComment}
            />
          )}
        </div>
      );
    }
    return;
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <div className={classes.user}>
          <div className={classes.image}>
            <Image
              src={imageCheck()}
              alt="Commenters Profile Image"
              width={100}
              height={100}
            />
          </div>
          <div>
            <p>{_user}</p>
          </div>
        </div>
        {editComment()}
        <div className={classes.date}>
          {formattedTime(date) + ' ' + formattedDate(date) + ' '}
          {props.comment.edited &&
            'Edited: ' +
              formattedTime(props.comment.edited) +
              ' ' +
              formattedDate(props.comment.edited)}
        </div>
      </div>
      {checkAuth()}
    </div>
  );
};

export default CommentItem;
