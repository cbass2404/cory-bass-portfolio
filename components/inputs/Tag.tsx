import classes from './Tag.module.scss';

const Tag = (props: any) => {
  return <span className={classes.wrapper}>{props.tag}</span>;
};

export default Tag;
