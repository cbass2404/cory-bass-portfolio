import { useState } from 'react';

import Input from '../inputs/Input';
import classes from './CommentForm.module.scss';

const CommentForm = (props: any) => {
  const { label, handleSubmit, comment, setComment } = props;

  const onSubmit = (event: any) => {
    event.preventDefault();

    handleSubmit(comment);
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        type="textarea"
        label={label}
        value={comment}
        setValue={setComment}
      />
      <button className={classes.link}>Submit</button>
    </form>
  );
};

export default CommentForm;
