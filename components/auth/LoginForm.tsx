import { useState } from 'react';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';

// redux
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';

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

    const response = await fetch('/api/auth/get-user', {
      method: 'POST',
      body: JSON.stringify({ email: userData.email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
      return;
    }

    props.setUser(data.data);

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

export default connect(null, { setUser })(LoginForm);
