import AuthForm from './AuthForm';

import classes from './LoginForm.module.scss';

interface UserData {
  username: string;
  email: string;
  password: string;
}

const LoginForm = (props: any) => {
  const onToggle = () => {
    props.setSignupForm(!props.signupForm);
  };

  const handleSubmit = (userData: UserData) => {
    console.log(userData);
  };

  return (
    <div className={classes.wrapper}>
      <AuthForm formType={'login'} onFormSubmission={handleSubmit} />
      <button onClick={onToggle}>Not signed up?</button>
    </div>
  );
};

export default LoginForm;
