import CommentItem from './CommentItem';

const CommentList = (props: any) => {
  const handleDelete = (id: string) => {
    const filteredComments = props.comments.filter(
      (comment: any) => comment._id !== id
    );

    props.setComments(filteredComments);
  };

  return (
    <div>
      {props.comments.map((comment: any) => {
        return (
          <div key={comment._id}>
            <CommentItem
              comment={comment}
              user={props.user}
              handleDelete={handleDelete}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
