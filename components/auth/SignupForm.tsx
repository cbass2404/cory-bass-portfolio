import { useState } from 'react';
import { connect } from 'react-redux';

import AuthForm from './AuthForm';
import classes from './SignupForm.module.scss';

interface UserData {
  username: string;
  email: string;
  password: string;
}

const SignupForm = (props: any) => {
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

    console.log(data.message);

    if (!response.ok) {
      setError(data.message);
      return;
    }

    onToggle();
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

export default connect()(SignupForm);
