import { getSession } from 'next-auth/client';

import { getAllPortfolioItems } from '../../lib/portfolio';
import PortfolioManagement from '../../components/portfolio/PortfolioManagement';

const PortfolioItemsPage = (props: any) => {
  return (
    <div>
      <PortfolioManagement portfolioItems={props.portfolioItems} />
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const session = await getSession({ req: context.req });
  const portfolioItems = await getAllPortfolioItems();

  if (session?.user?.name !== '@cbass') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      portfolioItems,
    },
  };
};

export default PortfolioItemsPage;
