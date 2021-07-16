import { useState, useEffect, useCallback } from 'react';

import classes from './TagInput.module.scss';

const tagArray: string[] = [
  'CSS',
  'ExpressJS',
  'Firebase',
  'Git',
  'GraphQL',
  'HTML5',
  'Javascript',
  'JSON',
  'MongoDB',
  'NextJS',
  'NodeJS',
  'Python3',
  'ReactJS',
  'React Native',
  'Redux',
  'SCSS',
  'Typescript',
];

const TagInput = (props: any) => {
  const [value, setValue] = useState('');

  const onChange = (event: any) => {
    setValue(event.target.value);
  };

  const handleTags = useCallback(() => {
    if (value !== '') {
      props.setTags([...props.tags, value]);
      setValue('');
    }
  }, [props, value]);

  useEffect(() => {
    handleTags();
  }, [handleTags]);

  return (
    <div className={classes.select}>
      <span>{props.label}</span>
      <select onChange={onChange} value={value}>
        <option value=""></option>
        {tagArray.map((tag: string) => {
          return (
            <option key={tag} value={tag}>
              {tag}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default TagInput;
