import { useEffect, useState } from 'react';

import Input from '../inputs/Input';
import classes from './AllPosts.module.scss';
import PostList from './PostList';

const AllPosts = (props: any) => {
  const [search, setSearch] = useState('');

  let result;
  const handleSearch = () => {
    result = props.posts;

    return result;
  };

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
        <PostList posts={handleSearch()} searchParams={search} />
      </div>
    </div>
  );
};

export default AllPosts;
