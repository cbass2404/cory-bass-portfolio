import Image from 'next/image';

import classes from './PostItem.module.scss';

const PostItem = (props: any) => {
  const { slug, title, date, excerpt, image } = props.post;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

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
        <div>
          <h2>{title}</h2>
        </div>
        <div>
          <p>{excerpt}</p>
        </div>
        <div>
          <time>{formattedDate}</time>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
