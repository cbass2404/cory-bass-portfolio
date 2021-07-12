import classes from './HighlightedH1.module.scss';

const HighlightedH1 = (props: any) => {
  return (
    <h1 className={classes.wrapper}>
      <span className={classes.highlighted}>{`< `}</span>
      <span className={classes.text}>{props.content}</span>
      <span className={classes.highlighted}>{` />`}</span>
    </h1>
  );
};

export default HighlightedH1;
