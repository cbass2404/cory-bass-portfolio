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

  const handleSubmit = (userData: UserData) => {
    console.log(userData);
  };

  return (
    <div className={classes.wrapper}>
      <AuthForm formType={'signup'} onFormSubmission={handleSubmit} />
      <button onClick={onToggle}>Already signed up?</button>
    </div>
  );
};

export default SignupForm;
