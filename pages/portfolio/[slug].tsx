import HighlightedH1 from '../../lib/HighlightedH1';
import { getAllPortfolioItems, getAPortfolioItem } from '../../lib/portfolio';

const PortfolioDetailPage = (props: any) => {
  console.log(props.portfolioItem);

  return (
    <div>
      <HighlightedH1 content={props.portfolioItem.title.toLowerCase()} />
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
