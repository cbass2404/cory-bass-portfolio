import { useState } from 'react';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';

//redux
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';

import AuthForm from './AuthForm';
import classes from './SignupForm.module.scss';

interface UserData {
  username: string;
  email: string;
  password: string;
}

const SignupForm = (props: any) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onToggle = () => {
    props.setSignupForm(!props.signupForm);
  };

  const handleSubmit = async (userData: UserData) => {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
      return;
    }

    const result = await signIn('credentials', {
      redirect: false,
      email: userData.email,
      password: userData.password,
    });

    if (result && result.error) {
      setError(result.error);
      return;
    }

    props.setUser(data.data);

    router.push('/');
  };

  return (
    <div className={classes.wrapper}>
      <AuthForm
        formType={'signup'}
        onFormSubmission={handleSubmit}
        error={error}
      />
      <button onClick={onToggle}>Already signed up?</button>
    </div>
  );
};

// const mapStateToProps = state => {

// }

export default connect(null, { setUser })(SignupForm);
