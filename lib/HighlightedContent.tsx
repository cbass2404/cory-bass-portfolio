import classes from './HighlightedContent.module.scss';

const HighlightedContent = (props: any) => {
  return (
    <p className={classes.wrapper}>
      <span className={classes.highlighted}>{`< `}</span>
      <span className={classes.text}>{props.content}</span>
      <span className={classes.highlighted}>{` />`}</span>
    </p>
  );
};

export default HighlightedContent;
