import PortfolioDetail from '../../components/portfolio/portfolioDetails/PortfolioDetail';
import HighlightedH1 from '../../lib/HighlightedH1';
import { getAllPortfolioItems, getAPortfolioItem } from '../../lib/portfolio';

const PortfolioDetailPage = (props: any) => {
  return (
    <div>
      <PortfolioDetail portfolioItem={props.portfolioItem} />
    </div>
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
