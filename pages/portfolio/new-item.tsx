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

export default NewItemPage;
