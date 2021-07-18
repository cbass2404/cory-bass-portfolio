import { Fragment } from 'react';
import Head from 'next/dist/next-server/lib/head';
import { getSession } from 'next-auth/client';

import { getAllPortfolioItems } from '../../lib/portfolio';
import PortfolioManagement from '../../components/portfolio/PortfolioManagement';

const PortfolioItemsPage = (props: any) => {
  return (
    <Fragment>
      <Head>
        <title>Portfolio Management</title>
      </Head>
      <PortfolioManagement portfolioItems={props.portfolioItems} />
    </Fragment>
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
