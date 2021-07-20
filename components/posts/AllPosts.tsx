import { useState, useEffect, useCallback } from 'react';

import Input from '../inputs/Input';
import classes from './AllPosts.module.scss';
import PostList from './PostList';

const AllPosts = (props: any) => {
  const { posts } = props;
  const [search, setSearch] = useState('');

  const handleSearch = useCallback(() => {
    const formattedSearch = search.replace(/[ ]/g, '').toLowerCase();
    const results = posts;

    if (!!search.length) {
      const filteredResults = results.filter((result: any) => {
        const formattedExcerpt = result.excerpt
          .replace(/[ ]/g, '')
          .toLowerCase();

        return formattedExcerpt.includes(formattedSearch);
      });

      return filteredResults;
    }
    return results;
  }, [search, posts]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.input}>
        <Input
          label={'Search:'}
          type={'text'}
          value={search}
          setValue={setSearch}
        />
      </div>
      <div className={classes.content}>
        {posts && <PostList posts={handleSearch()} searchParams={search} />}
      </div>
    </div>
  );
};

export default AllPosts;
