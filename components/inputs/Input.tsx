import { useState } from 'react';

const FormInput = (props: any) => {
  const [visible, setVisible] = useState<boolean>(false);

  const togglePassword = (event: any) => {
    event.preventDefault();

    setVisible(!visible);
  };

  const { label, type, value, setValue } = props;

  if (props.type === 'password') {
    return (
      <div>
        <label>
          {label}
          <input
            type={visible ? 'text' : 'password'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </label>
        <button onClick={togglePassword}>See password</button>
      </div>
    );
  }

  return (
    <div>
      <label>
        {label}
        <input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </label>
    </div>
  );
};

export default FormInput;
