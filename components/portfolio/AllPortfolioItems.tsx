import { useState } from 'react';
import Link from 'next/dist/client/link';

import PortfolioItem from './PortfolioItem';
import Tag from '../inputs/Tag';
import TagInput from '../inputs/TagInput';
import classes from './AllPortfolioItems.module.scss';

const AllPortfolioItems = (props: any) => {
  const [filter, setFilter] = useState<string[]>([]);

  const handlePortfolioItems = () => {
    return props.portfolioItems.map((item: any) => {
      return <PortfolioItem key={item._id} item={item} />;
    });
  };

  const removeTag = (targetTag: string) => {
    const newTags = filter.filter((tag: string) => tag !== targetTag);
    setFilter(newTags);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.filter}>
        <TagInput setTags={setFilter} tags={filter} label={'Filter: '} />
        <div className={classes.tagsSelect}>
          {!!filter.length &&
            filter.map((tag: string) => {
              return (
                <div
                  key={tag}
                  className={classes.tagItem}
                  onClick={() => removeTag(tag)}
                >
                  <Tag tag={tag} />
                </div>
              );
            })}
        </div>
      </div>
      <div className={classes.items}>{handlePortfolioItems()}</div>
    </div>
  );
};

export default AllPortfolioItems;
