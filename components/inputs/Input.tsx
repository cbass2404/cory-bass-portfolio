import { useState } from 'react';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import classes from './Input.module.scss';

const FormInput = (props: any) => {
  const [visible, setVisible] = useState<boolean>(false);

  const { label, type, value, setValue } = props;

  if (props.type === 'textarea') {
    return (
      <div className={classes.wrapper}>
        <label htmlFor={label}>{label}</label>
        <textarea
          id={label}
          className={classes.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={4}
          minLength={30}
          maxLength={1000}
        />
      </div>
    );
  }

  if (props.type === 'password') {
    return (
      <div className={classes.wrapper}>
        <label htmlFor={label}>{label}</label>
        <FontAwesomeIcon
          onClick={() => setVisible(!visible)}
          icon={visible ? faEye : faEyeSlash}
          color={'white'}
        />
        <input
          id={label}
          className={classes.input}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={15}
          minLength={8}
          required
        />
      </div>
    );
  }

  return (
    <div className={classes.wrapper}>
      <label htmlFor={label}>{label}</label>
      <input
        className={classes.input}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        minLength={5}
        required
      />
    </div>
  );
};

export default FormInput;
