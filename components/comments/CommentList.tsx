import CommentItem from './CommentItem';

const CommentList = (props: any) => {
  return (
    <div>
      {props.comments.map((comment: any) => {
        return (
          <div key={comment._id}>
            <CommentItem comment={comment} />
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
