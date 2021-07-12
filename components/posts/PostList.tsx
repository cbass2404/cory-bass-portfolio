import PostItem from './PostItem';

const PostList = (props: any) => {
  const postsList = [...props.posts];

  
  if(!!props.searchParams.length){
    postsList.filter(postsList => {
      const searchTerm = props.searchParams.replace(' ', '').toLowerCase()
      postsList=
    })
  }

  return (
    <div>
      {props.posts &&
        postsList.map((post: any) => {
          return (
            <div key={post.slug}>
              <PostItem post={post} />
            </div>
          );
        })}
    </div>
  );
};

export default PostList;
