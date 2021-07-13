const CommentItem = (props: any) => {
  console.log(props.comment);
  const { date, _id, comment, _user } = props.comment;
  return <div>{comment}</div>;
};

export default CommentItem;
