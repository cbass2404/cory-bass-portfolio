import { useState } from 'react';

import Input from '../inputs/Input';
import classes from './AuthForm.module.scss';

const AuthForm = (props: any) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputs = [
    {
      label: 'Username:',
      type: 'text',
      value: username,
      setValue: setUsername,
    },
    { label: 'Email:', type: 'email', value: email, setValue: setEmail },
    {
      label: 'Password:',
      type: 'password',
      value: password,
      setValue: setPassword,
    },
  ];

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const userData = {
      username,
      email,
      password,
    };

    props.onFormSubmission(userData);
  };

  return (
    <form className={classes.wrapper} onSubmit={handleSubmit}>
      {inputs.map(({ label, type, value, setValue }) => (
        <Input
          key={label}
          label={label}
          type={type}
          value={value}
          setValue={setValue}
        />
      ))}

      <button>Submit Form</button>
    </form>
  );
};

export default AuthForm;
