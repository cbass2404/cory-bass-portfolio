import CommentItem from './CommentItem';

const CommentList = (props: any) => {
  const handleDelete = (id: string) => {
    const filteredComments = props.comments.filter(
      (comment: any) => comment._id !== id
    );

    props.setComments(filteredComments);
  };

  if (!!props.comments.length) {
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
  }

  return (
    <div>
      <p>No comments yet...</p>
    </div>
  );
};

export default CommentList;
