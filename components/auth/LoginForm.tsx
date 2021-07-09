import { useState } from 'react';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';

import AuthForm from './AuthForm';
import classes from './LoginForm.module.scss';

const LoginForm = (props: any) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onToggle = () => {
    props.setSignupForm(!props.signupForm);
  };

  const handleSubmit = async (userData: any) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: userData.email,
      password: userData.password,
    });

    if (result && result.error) {
      setError(result.error);
      return;
    }

    router.push('/');
  };

  return (
    <div className={classes.wrapper}>
      <AuthForm
        formType={'login'}
        onFormSubmission={handleSubmit}
        error={error}
      />
      <button onClick={onToggle}>Not signed up?</button>
    </div>
  );
};

export default LoginForm;
