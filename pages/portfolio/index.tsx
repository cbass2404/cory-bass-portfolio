import { Fragment } from 'react';
import Head from 'next/dist/next-server/lib/head';

import { getAllPortfolioItems } from '../../lib/portfolio';
import AllPortfolioItems from '../../components/portfolio/AllPortfolioItems';
import HighlightedH1 from '../../lib/HighlightedH1';

const PortfolioPage = (props: any) => {
  return (
    <Fragment>
      <Head>
        <title>Corys Portfolio</title>
      </Head>
      <HighlightedH1 content="portfolio" />
      <AllPortfolioItems portfolioItems={props.portfolioItems} />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const allPortfolioItems = await getAllPortfolioItems();

  return {
    props: {
      portfolioItems: allPortfolioItems,
    },
  };
};

export default PortfolioPage;
