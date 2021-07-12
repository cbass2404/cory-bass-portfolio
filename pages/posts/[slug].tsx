import { Fragment } from 'react';

import PostDetail from '../../components/posts/postDetails/PostDetail';
import { getPostDetails, getPostsFiles } from '../../lib/posts';

const BlogDetailPage = (props: any) => {
  const { post } = props;

  if (post) {
    return (
      <Fragment>
        <PostDetail post={post} />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <h2>Loading...</h2>
    </Fragment>
  );
};

export const getStaticProps = (context: any) => {
  const { params } = context;

  const slug = params.slug;

  const postDetails = getPostDetails(slug);

  return {
    props: {
      post: postDetails,
    },
  };
};

export const getStaticPaths = () => {
  const postFileNames = getPostsFiles();

  const slugs = postFileNames.map((fileName: any) =>
    fileName.replace(/\.md$$/, '')
  );

  const pathsWithParams = slugs.map((slug: any) => ({
    params: { slug },
  }));

  return {
    paths: pathsWithParams,
    fallback: false,
  };
};

export default BlogDetailPage;
