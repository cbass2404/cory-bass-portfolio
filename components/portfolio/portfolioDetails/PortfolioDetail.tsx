import Image from 'next/dist/client/image';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import classes from './PortfolioDetail.module.scss';
import HighlightedH1 from '../../../lib/HighlightedH1';
import Tag from '../../inputs/Tag';

const PortfolioDetail = (props: any) => {
  const { description, githubUrl, url, image, tags, title } =
    props.portfolioItem;

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <Image
          src={image}
          alt={`${title} banner image`}
          width={400}
          height={400}
        />
        <div className={classes.title}>
          <HighlightedH1 content={title} />
        </div>
      </div>
      <div className={classes.content}>
        {tags.map((tag: any) => {
          return <Tag key={tag} tag={tag} />;
        })}
      </div>
      <div className={classes.content}>
        <p>{description}</p>
      </div>
      <div className={classes.content}>
        <div className={classes.links}>
          <a href={url} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faLink} />
            {` See it live`}
          </a>
        </div>
        <div className={classes.links}>
          <a href={githubUrl} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faGithubSquare} />
            {` Repository`}
          </a>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetail;
