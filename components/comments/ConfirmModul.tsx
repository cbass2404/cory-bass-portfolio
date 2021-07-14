import classes from './ConfirmModul.module.scss';

const ConfirmModul = (props: any) => {
  const handleCancel = () => {
    props.setOpenModul(!props.openModul);
  };

  const handleDelete = () => {
    props.deleteComment();
    handleCancel();
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <p>Are you sure you want to delete this comment?</p>
      </div>
      <div className={classes.content}>{props.comment}</div>
      <div className={classes.content}>
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleDelete} className={classes.delete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ConfirmModul;
