import { Fragment } from 'react';

import { getAllPortfolioItems } from '../../lib/portfolio';
import AllPortfolioItems from '../../components/portfolio/AllPortfolioItems';
import HighlightedH1 from '../../lib/HighlightedH1';

const PortfolioPage = (props: any) => {
  return (
    <Fragment>
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
