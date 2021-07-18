import { getSession } from 'next-auth/client';

import CommentSection from '../components/messages/comments/CommentSection';
import ContactSection from '../components/messages/contact/ContactSection';
import HighlightedH1 from '../lib/HighlightedH1';

const MessagesPage = (props: any) => {
  return (
    <div>
      <HighlightedH1 content="messages" />
      <ContactSection />
      <CommentSection />
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const session = await getSession({ req: context.req });

  if (session?.user?.name !== '@cbass') {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default MessagesPage;
