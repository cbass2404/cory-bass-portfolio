import AuthForm from './AuthForm';

const SignupForm = (props: any) => {
  const onToggle = () => {
    props.setSignupForm(!props.signupForm);
  };

  return (
    <div>
      <AuthForm formType={'signup'} />
      <button onClick={onToggle}>Already signed up?</button>
    </div>
  );
};

export default SignupForm;
