import { useState } from 'react';

import PortfolioForm from './PortfolioForm';
import classes from './PortfolioManagement.module.scss';
import PortfolioModal from './PortfolioModal';

interface PortfolioItem {
  title: string;
  url: string;
  githubUrl: string;
  description: string;
  tags: string[];
  image: string;
  thumbnail: string;
  slug: string;
}

const PortfolioManagement = (props: any) => {
  const [portfolioItem, setPortfolioItem] = useState<PortfolioItem | null>(
    null
  );
  const [toggleModal, setToggleModal] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState('');

  const handleReview = (portfolioItem: PortfolioItem) => {
    setPortfolioItem(portfolioItem);
    setToggleModal(!toggleModal);
  };

  const handleSubmit = async () => {
    const response = await fetch('/api/portfolio', {
      method: 'POST',
      body: JSON.stringify(portfolioItem),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setError(true);
      setResponse(data.message);
      return;
    }

    setError(false);
    setResponse(data.message);
  };

  return (
    <div className={classes.wrapper}>
      <PortfolioForm
        handleSubmit={handleReview}
        portfolioItem={portfolioItem}
      />
      {toggleModal && (
        <PortfolioModal
          toggleModal={toggleModal}
          setToggleModal={setToggleModal}
          portfolioItem={portfolioItem}
          handleSubmit={handleSubmit}
        />
      )}
      <div>
        {!!response.length && (
          <p className={!error ? classes.success : classes.error}>{response}</p>
        )}
      </div>
    </div>
  );
};

export default PortfolioManagement;
