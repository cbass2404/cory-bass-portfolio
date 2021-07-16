import { getSession } from 'next-auth/client';

import PortfolioManagement from '../../components/portfolio/PortfolioManagement';
import HighlightedH1 from '../../lib/HighlightedH1';

const NewItemPage = (props: any) => {
  return (
    <div>
      <HighlightedH1 content="new item" />
      <PortfolioManagement />
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const session = await getSession({ req: context.req });

  if (session?.user?.name !== '@cbass') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default NewItemPage;
