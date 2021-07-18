import { Fragment } from 'react';
import Head from 'next/dist/next-server/lib/head';
import { getSession } from 'next-auth/client';
import Profile from '../components/profile/Profile';

import HighlightedH1 from '../lib/HighlightedH1';

const UserPage = (props: any) => {
  return (
    <Fragment>
      <Head>
        <title>{props.user.name}</title>
      </Head>
      <HighlightedH1 content={props.user.name} />
      <Profile user={props.user} />
    </Fragment>
  );
};

export const getServerSideProps = async (context: any) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session?.user,
    },
  };
};

export default UserPage;
