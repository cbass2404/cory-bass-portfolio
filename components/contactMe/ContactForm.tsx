import { useState } from 'react';

import Input from '../inputs/Input';

const ContactForm = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();

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

  return (
    <form>
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
    </form>
  );
};

export default ContactForm;
