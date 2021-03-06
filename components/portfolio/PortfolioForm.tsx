import { useState, useEffect, useCallback } from 'react';
import { ObjectId } from 'mongodb';

import FormInput from '../inputs/Input';
import TagInput from '../inputs/TagInput';
import Tag from '../inputs/Tag';
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
  _id: ObjectId | string | null;
  date: Date | null;
}

const PortfolioForm = (props: any) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [slug, setSlug] = useState('');
  const [_id, set_id] = useState<ObjectId | string | null>(null);
  const [date, setDate] = useState<Date | null>(null);

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
      setTags(props.portfolioItem.tags);
      setImage(props.portfolioItem.image);
      setThumbnail(props.portfolioItem.thumbnail);
      setSlug(props.portfolioItem.slug);
      set_id(props.portfolioItem._id);
      setDate(props.portfolioItem.date);
    }
  }, [props.portfolioItem]);

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

  const onSubmit = (event: any) => {
    event.preventDefault();

    const portfolioItem: PortfolioItem = {
      title,
      url,
      githubUrl,
      description,
      image,
      thumbnail,
      slug,
      tags,
      _id,
      date,
    };

    props.handleReview(portfolioItem);
  };

  const clearForm = (event: any) => {
    event.preventDefault();

    setTitle('');
    setUrl('');
    setGithubUrl('');
    setDescription('');
    setTags([]);
    setImage('');
    setThumbnail('');
    setSlug('');
    set_id(null);
    setDate(null);
  };

  const removeTag = (targetTag: string) => {
    const newTags = tags.filter((tag: string) => tag !== targetTag);
    setTags(newTags);
  };

  return (
    <div className={classes.wrapper}>
      <form onSubmit={onSubmit}>
        {setInput()}
        <TagInput setTags={setTags} tags={tags} label={'Tags: '} />
        <div className={classes.tagsSelect}>
          {!!tags.length &&
            tags.map((tag: string) => {
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
        <div className={classes.buttons}>
          <button onClick={clearForm}>Clear</button>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PortfolioForm;
