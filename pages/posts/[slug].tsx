import { Fragment } from 'react';
import Head from 'next/dist/next-server/lib/head';
import { useSession } from 'next-auth/client';

import CommentSection from '../../components/comments/CommentSection';
import PostDetail from '../../components/posts/postDetails/PostDetail';
import { getPostDetails, getPostsFiles } from '../../lib/posts';
import { getPostComments } from '../../lib/comments';

const BlogDetailPage = (props: any) => {
  const { post, comments } = props;

  const [session, loading] = useSession();

  if (post) {
    return (
      <Fragment>
        <Head>
          <title>{post.title}</title>
          <meta name="description" content={post.content} />
        </Head>
        <PostDetail post={post} />
        <CommentSection
          session={session}
          post={post.slug}
          comments={comments}
        />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <h2>Loading...</h2>
    </Fragment>
  );
};

export const getStaticProps = async (context: any) => {
  const { params } = context;
  const slug = params.slug;

  const postDetails = getPostDetails(slug);
  const postComments = await getPostComments(slug);

  return {
    props: {
      post: postDetails,
      comments: postComments,
    },
    revalidate: 60,
  };
};

export const getStaticPaths = async () => {
  const postFilenames = getPostsFiles();

  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ''));

  const pathsWithParams = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths: pathsWithParams,
    fallback: false,
  };
};

export default BlogDetailPage;
