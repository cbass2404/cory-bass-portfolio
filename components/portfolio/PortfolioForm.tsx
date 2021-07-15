import { useState, useEffect, useCallback } from 'react';

import FormInput from '../inputs/Input';
import classes from './PortfolioForm.module.scss';

interface PortfolioItem {
  title: string;
  url: string;
  githubUrl: string;
  description: string;
  tags: string[];
  image: string;
  thumbnail: string;
  slug: string;
}

const PortfolioForm = (props: any) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [slug, setSlug] = useState('');

  const inputs = [
    { label: 'Title:', type: 'text', value: title, setValue: setTitle },
    { label: 'Url:', type: 'text', value: url, setValue: setUrl },
    {
      label: 'Github Url:',
      type: 'text',
      value: githubUrl,
      setValue: setGithubUrl,
    },
    {
      label: 'Description:',
      type: 'textarea',
      value: description,
      setValue: setDescription,
    },
    { label: 'Tags:', type: 'text', value: tags, setValue: setTags },
  ];

  const setSlugAndImages = useCallback(() => {
    if (title) {
      setSlug(title.replace(/[ ]/g, '-').toLowerCase());

      setImage(`/images/portfolio/${slug}/image.png`);
      setThumbnail(`/images/portfolio/${slug}/thumbnail.png`);
    }
  }, [title, slug]);

  useEffect(() => {
    setSlugAndImages();
  }, [setSlugAndImages]);

  useEffect(() => {
    if (props.portfolioItem) {
      setTitle(props.portfolioItem.title);
      setUrl(props.portfolioItem.url);
      setGithubUrl(props.portfolioItem.githubUrl);
      setDescription(props.portfolioItem.description);
      setTags(props.portfolioItem.tags.join(', '));
      setImage(props.portfolioItem.image);
      setThumbnail(props.portfolioItem.thumbnail);
      setSlug(props.portfolioItem.slug);
    }
  }, [props]);

  const onSubmit = (event: any) => {
    event.preventDefault();

    const formatTags = tags;
    let formattedTags = formatTags.trim().split(', ');

    const portfolioItem: PortfolioItem = {
      title,
      url,
      githubUrl,
      description,
      image,
      thumbnail,
      slug,
      tags: formattedTags,
    };

    props.handleSubmit(portfolioItem);
  };

  const setInput = () => {
    return inputs.map(({ label, type, value, setValue }) => (
      <div key={label}>
        <FormInput
          label={label}
          type={type}
          value={value}
          setValue={setValue}
        />
      </div>
    ));
  };

  return (
    <div className={classes.wrapper}>
      <form onSubmit={onSubmit}>
        {setInput()}
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PortfolioForm;
