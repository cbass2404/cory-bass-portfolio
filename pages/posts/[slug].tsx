import { Fragment } from 'react';
import Head from 'next/dist/next-server/lib/head';
import { getSession } from 'next-auth/client';

import CommentSection from '../../components/comments/CommentSection';
import PostDetail from '../../components/posts/postDetails/PostDetail';
import { getPostDetails } from '../../lib/posts';
import { getPostComments } from '../../lib/comments';

const BlogDetailPage = (props: any) => {
  const { post, session, comments } = props;

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

export const getServerSideProps = async (context: any) => {
  const session = await getSession({ req: context.req });
  const { params } = context;
  const slug = params.slug;

  const postDetails = await getPostDetails(slug);
  const postComments = await getPostComments(slug);

  return {
    props: {
      post: postDetails,
      session: session,
      comments: postComments,
    },
  };
};

export default BlogDetailPage;
