import { useState } from 'react';
import Image from 'next/image';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import classes from './AuthForms.module.scss';

const AuthForms = () => {
  const [signupForm, setSignupForm] = useState<boolean>(false);

  const authImage = (
    <Image
      id="authImage"
      src="/images/auth/auth.png"
      alt="Login Security Icon"
      width={500}
      height={500}
    />
  );

  if (signupForm) {
    return (
      <section className={classes.wrapper}>
        <h1>{`< sign up />`}</h1>
        <div className={`${classes.content} ${classes.imageWrapper}`}>
          {authImage}
        </div>
        <div className={classes.content}>
          <SignupForm setSignupForm={setSignupForm} signupForm={signupForm} />
        </div>
      </section>
    );
  }

  return (
    <section className={classes.wrapper}>
      <h1>{`< login />`}</h1>
      <div className={`${classes.content} ${classes.imageWrapper}`}>
        {authImage}
      </div>
      <div className={classes.content}>
        <LoginForm setSignupForm={setSignupForm} signupForm={signupForm} />
      </div>
    </section>
  );
};

export default AuthForms;
