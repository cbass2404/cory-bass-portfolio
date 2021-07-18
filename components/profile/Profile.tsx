import { useState } from 'react';
import Router from 'next/dist/next-server/server/router';
import { signOut } from 'next-auth/client';

import Input from '../inputs/Input';
import ConfirmModul from '../inputs/ConfirmModul';
import classes from './Profile.module.scss';
import { useRouter } from 'next/dist/client/router';

const Profile = (props: any) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState(false);
  const [openModul, setOpenModul] = useState(false);

  const inputs = [
    {
      label: 'Old Password:',
      type: 'password',
      value: oldPassword,
      setValue: setOldPassword,
    },
    {
      label: 'New Password:',
      type: 'password',
      value: newPassword,
      setValue: setNewPassword,
    },
  ];

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const user = {
      email: props.user.email,
      oldPassword,
      newPassword,
    };

    const response = await fetch('/api/profile', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setError(true);
      setResponse(data.message);
      return;
    }

    setError(false);
    setResponse(data.message);
    setOldPassword('');
    setNewPassword('');
  };

  const toggleModal = () => {
    setOpenModul(!openModul);
  };

  const handleDelete = async () => {
    const user = {
      email: props.user.email,
    };

    const response = await fetch('/api/profile', {
      method: 'DELETE',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setResponse(data.message);
      setError(true);
      return;
    }

    signOut();
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.form}>
        <h2>Change Password:</h2>
        <form onSubmit={handleSubmit}>
          {inputs.map(({ label, type, value, setValue }) => (
            <div className={classes.input} key={label}>
              <Input
                label={label}
                type={type}
                value={value}
                setValue={setValue}
              />
            </div>
          ))}

          <button>Submit</button>
        </form>
        {!!response.length && (
          <p className={!error ? classes.success : classes.error}>{response}</p>
        )}
      </div>
      <div className={classes.delete}>
        <div>
          <h2>Delete Account?</h2>
        </div>
        <div>
          <p>Caution, this can not be reversed...</p>
        </div>
        <div>
          <button onClick={toggleModal}>Delete Account</button>
        </div>
      </div>
      {openModul && (
        <ConfirmModul
          setOpenModul={setOpenModul}
          openModul={openModul}
          item="account"
          deleteFn={handleDelete}
        />
      )}
    </div>
  );
};

export default Profile;
