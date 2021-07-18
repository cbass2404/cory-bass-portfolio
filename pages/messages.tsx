import { getSession } from 'next-auth/client';

import CommentSection from '../components/messages/comments/CommentSection';
import ContactSection from '../components/messages/contact/ContactSection';
import { getUnreadComments } from '../lib/comments';
import { getUnreadMessages } from '../lib/messages';
import HighlightedH1 from '../lib/HighlightedH1';

const MessagesPage = (props: any) => {
  return (
    <div>
      <HighlightedH1 content="messages" />
      <ContactSection messages={props.messages} />
      <HighlightedH1 content="comments" />
      <CommentSection comments={props.comments} />
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

  const comments = await getUnreadComments();
  const messages = await getUnreadMessages();

  return {
    props: {
      comments,
      messages,
    },
  };
};

export default MessagesPage;
