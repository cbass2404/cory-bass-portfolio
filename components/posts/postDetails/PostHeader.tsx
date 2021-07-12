import Image from 'next/image';
import HighlightedH1 from '../../../lib/HighlightedH1';

import classes from './PostHeader.module.scss';

const PostHeader = (props: any) => {
  const { title, image } = props;

  return (
    <header className={classes.header}>
      <HighlightedH1 content={title.toLowerCase()} />
      <Image src={image} alt={title} width={200} height={150} />
    </header>
  );
};

export default PostHeader;
