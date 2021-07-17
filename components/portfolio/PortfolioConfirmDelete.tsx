import classes from './PortfolioConfirmDelete.module.scss';

const PortfolioConfirmDelete = (props: any) => {
  const handleCancel = () => {
    props.setOpenModul(!props.openModul);
  };

  const handleDelete = () => {
    props.deleteFn();
    handleCancel();
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <p>Are you sure you want to delete this portfolio item?</p>
      </div>
      <div className={classes.content}>
        <button onClick={handleCancel}>Cancel</button>
        <button className={classes.delete} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default PortfolioConfirmDelete;
