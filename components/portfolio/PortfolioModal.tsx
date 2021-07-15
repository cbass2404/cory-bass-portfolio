import Image from 'next/dist/client/image';

import Tag from '../inputs/Tag';
import classes from './PortfolioModal.module.scss';

const PortfolioModal = (props: any) => {
  const { title, url, githubUrl, description, tags, image, thumbnail, slug } =
    props.portfolioItem;

  const handleBack = () => {
    props.setToggleModal(!props.toggleModal);
  };

  const handleSubmit = () => {
    handleBack();
    props.handleSubmit();
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <h2>Title: {title}</h2>
        <p>Slug: {slug}</p>
        <p>Description: {description}</p>
        <div>
          <p>Tags:</p>
          {tags.map((tag: string) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>
      </div>
      <div className={classes.links}>
        <div>
          <a href={url} target="_blank" rel="noreferrer">
            Hosted at: {url}
          </a>
        </div>
        <div>
          <a href={githubUrl} target="_blank" rel="noreferrer">
            Repository: {githubUrl}
          </a>
        </div>
      </div>
      <div className={classes.images}>
        <div>
          <p>Image:</p>
          <Image
            src={image}
            alt={`${title} primary image`}
            width={300}
            height={300}
          />
        </div>
        <div>
          <p>Thumbnail:</p>
          <Image
            src={thumbnail}
            alt={`${title} thumbnail image`}
            width={300}
            height={300}
          />
        </div>
      </div>
      <div className={classes.buttons}>
        <div>
          <button onClick={handleBack} className={classes.back}>
            Back
          </button>
        </div>
        <div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;
