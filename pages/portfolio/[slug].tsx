import { Fragment } from 'react';
import Head from 'next/dist/next-server/lib/head';

import PortfolioDetail from '../../components/portfolio/portfolioDetails/PortfolioDetail';
import { getAllPortfolioItems, getAPortfolioItem } from '../../lib/portfolio';

const PortfolioDetailPage = (props: any) => {
  return (
    <Fragment>
      <Head>
        <title>{props.portfolioItem.title}</title>
        <meta name="description" content={props.portfolioItem.description} />
      </Head>
      <PortfolioDetail portfolioItem={props.portfolioItem} />
    </Fragment>
  );
};

export const getStaticProps = async (context: any) => {
  const slug = context.params.slug;

  const portfolioItem = await getAPortfolioItem(slug);

  return {
    props: {
      portfolioItem,
    },
    revalidate: 24 * 60 * 60,
  };
};

export const getStaticPaths = async () => {
  const allPortfolioItems = await getAllPortfolioItems();

  const pathsWithParams = allPortfolioItems.map(({ slug }) => ({
    params: { slug },
  }));

  return {
    paths: pathsWithParams,
    fallback: false,
  };
};

export default PortfolioDetailPage;
