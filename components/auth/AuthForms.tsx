import { useState } from 'react';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthForms = () => {
  const [signupForm, setSignupForm] = useState<boolean>(false);

  if (signupForm) {
    return (
      <section>
        <SignupForm setSignupForm={setSignupForm} signupForm={signupForm} />
      </section>
    );
  }

  return (
    <section>
      <LoginForm setSignupForm={setSignupForm} signupForm={signupForm} />
    </section>
  );
};

export default AuthForms;
