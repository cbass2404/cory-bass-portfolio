import Link from 'next/dist/client/link';
import PostItem from './PostItem';

const PostList = (props: any) => {
  const { posts } = props;

  return (
    <div>
      {props.posts &&
        posts.map((post: any) => {
          return (
            <div key={post.slug}>
              <Link href={`/posts/${post.slug}`}>
                <a>
                  <PostItem post={post} />
                </a>
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default PostList;
