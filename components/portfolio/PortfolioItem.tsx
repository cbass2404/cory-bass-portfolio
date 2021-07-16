import Image from 'next/image';
import Link from 'next/dist/client/link';

import Tag from '../inputs/Tag';
import classes from './PortfolioItem.module.scss';

const PortfolioItem = (props: any) => {
  const { description, tags, slug, thumbnail, title } = props.item;

  return (
    <div className={classes.wrapper}>
      <div className={`${classes.content} ${classes.textWrapper}`}>
        <Link href={`/portfolio/${slug}`}>
          <a>
            <Image
              src={thumbnail}
              alt={`${title} thumbnail`}
              width={300}
              height={300}
            />
            <div className={classes.text}>
              <h2>{title}</h2>
              <p className={classes.ellipsis}>{description}</p>
            </div>
          </a>
        </Link>
      </div>
      <div className={classes.content}>
        {tags.map((tag: string) => {
          return <Tag key={tag} tag={tag} />;
        })}
      </div>
    </div>
  );
};

export default PortfolioItem;
