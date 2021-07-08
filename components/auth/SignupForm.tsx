import { connect } from 'react-redux';

import AuthForm from './AuthForm';
import classes from './SignupForm.module.scss';

interface UserData {
  username: string;
  email: string;
  password: string;
}

const SignupForm = (props: any) => {
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

    console.log(data);
  };

  return (
    <div className={classes.wrapper}>
      <AuthForm formType={'signup'} onFormSubmission={handleSubmit} />
      <button onClick={onToggle}>Already signed up?</button>
    </div>
  );
};

// const mapStateToProps = state => {

// }

export default connect()(SignupForm);
