import { getSession } from 'next-auth/client';
import Profile from '../components/profile/Profile';

import HighlightedH1 from '../lib/HighlightedH1';

const UserPage = (props: any) => {
  return (
    <div>
      <HighlightedH1 content={props.user.name} />
      <Profile user={props.user} />
    </div>
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
