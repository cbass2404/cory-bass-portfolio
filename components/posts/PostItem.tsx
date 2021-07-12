import Image from 'next/image';

import classes from './PostItem.module.scss';

const PostItem = (props: any) => {
  const { slug, title, date, excerpt, image } = props.post;

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <Image
          src={`/images/posts/${slug}/${image}`}
          alt={title}
          width={300}
          height={300}
        />
      </div>
      <div className={classes.content}>
        <div>{title}</div>
        <div>{date}</div>
        <div>{excerpt}</div>
      </div>
    </div>
  );
};

export default PostItem;
