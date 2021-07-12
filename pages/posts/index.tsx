import { Fragment } from 'react';

import AllPosts from '../../components/posts/AllPosts';
import { getAllPosts } from '../../lib/posts';

const BlogPage = (props: any) => {
  return (
    <Fragment>
      <h1>{`< blog />`}</h1>
      <AllPosts posts={props.posts} />
    </Fragment>
  );
};

export const getStaticProps = () => {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
};

export default BlogPage;
