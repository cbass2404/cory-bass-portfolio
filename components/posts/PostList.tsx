import { useEffect, useMemo } from 'react';
import PostItem from './PostItem';

const PostList = (props: any) => {
  const { posts } = props;

  return (
    <div>
      {props.posts &&
        posts.map((post: any) => {
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
