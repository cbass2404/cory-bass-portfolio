import { useState, useEffect } from 'react';
import Image from 'next/image';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import classes from './AuthForms.module.scss';

const AuthForms = (props: any) => {
  const [signupForm, setSignupForm] = useState<boolean>(false);

  const { setSignup } = props;

  useEffect(() => {
    setSignup(signupForm);
  }, [signupForm, setSignup]);

  const authImage = (
    <Image
      id="authImage"
      src="/images/auth/auth.png"
      alt="Login Security Icon"
      width={400}
      height={400}
    />
  );

  if (signupForm) {
    return (
      <section className={classes.wrapper}>
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
