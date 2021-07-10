import { useState, useEffect } from 'react';

import Input from '../inputs/Input';
import classes from './ContactForm.module.scss';

const ContactForm = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const inputs = [
    { label: 'Name:', type: 'text', value: name, setValue: setName },
    { label: 'Email:', type: 'email', value: email, setValue: setEmail },
    {
      label: 'Message:',
      type: 'textarea',
      value: message,
      setValue: setMessage,
    },
  ];

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const messageData = {
      name,
      email,
      message,
    };

    const response: any = await fetch('/api/contact-me', {
      method: 'POST',
      body: JSON.stringify(messageData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setError(true);

      if (data.message) {
        setResponse(data.message);
      }
      return;
    }

    setError(false);
    setResponse(data.message);
    setName('');
    setEmail('');
    setMessage('');
  };

  useEffect(() => {
    if (!!response.length && !error) {
      const timer = setTimeout(() => {
        setResponse('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [response, error]);

  return (
    <form onSubmit={handleSubmit}>
      {inputs.map(({ label, type, value, setValue }) => (
        <Input
          key={label}
          label={label}
          type={type}
          value={value}
          setValue={setValue}
        />
      ))}
      <button>Submit</button>
      {!!response.length && (
        <p className={!error ? classes.success : classes.error}>{response}</p>
      )}
    </form>
  );
};

export default ContactForm;
