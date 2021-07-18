import { useState, useEffect, useCallback } from 'react';

import PortfolioItem from './PortfolioItem';
import Tag from '../inputs/Tag';
import TagInput from '../inputs/TagInput';
import classes from './AllPortfolioItems.module.scss';

const AllPortfolioItems = (props: any) => {
  const [filters, setFilters] = useState<string[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<any[] | null>(null);

  const removeTag = (targetTag: string) => {
    const newTags = filters.filter((tag: string) => tag !== targetTag);
    setFilters(newTags);
  };

  const filteredItems = useCallback(async () => {
    const items = props.portfolioItems;

    if (!!filters.length) {
      const newItems = items.reduce((accum: any, item: any) => {
        let matches = true;

        filters.forEach((filter: string) => {
          if (!matches) {
            return;
          }

          matches = item.tags.includes(filter);
        });

        if (matches) {
          accum.push(item);
        }

        return accum;
      }, []);

      setPortfolioItems(newItems);
      return;
    }

    setPortfolioItems(items);
    return;
  }, [filters, props.portfolioItems]);

  useEffect(() => {
    filteredItems();
  }, [filteredItems]);

  const handlePortfolioItems = () => {
    return portfolioItems?.map((item: any) => {
      return <PortfolioItem key={item._id} item={item} />;
    });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.filter}>
        <TagInput setTags={setFilters} tags={filters} label={'Filter: '} />
        <div className={classes.tagsSelect}>
          {!!filters.length &&
            filters.map((tag: string) => {
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
      <div className={classes.items}>
        {!!portfolioItems?.length && handlePortfolioItems()}
      </div>
    </div>
  );
};

export default AllPortfolioItems;
