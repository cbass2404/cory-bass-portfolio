import { Fragment } from 'react';

import AllPosts from '../../components/posts/AllPosts';
import HighlightedH1 from '../../lib/HighlightedH1';
import { getAllPosts } from '../../lib/posts';

const BlogPage = (props: any) => {
  return (
    <Fragment>
      <HighlightedH1 content="blog" />
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
