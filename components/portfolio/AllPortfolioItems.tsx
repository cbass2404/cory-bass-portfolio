import { useState } from 'react';
import Link from 'next/dist/client/link';

import PortfolioItem from './PortfolioItem';

const AllPortfolioItems = (props: any) => {
  const [search, setSearch] = useState('');

  const handlePortfolioItems = () => {
    return props.portfolioItems.map((item: any) => {
      return (
        <Link key={item._id} href={`/portfolio/${item.slug}`}>
          <a>
            <PortfolioItem item={item} />
          </a>
        </Link>
      );
    });
  };
  return (
    <div>
      <div>
        <input />
      </div>
      <div>{handlePortfolioItems()}</div>
    </div>
  );
};

export default AllPortfolioItems;
