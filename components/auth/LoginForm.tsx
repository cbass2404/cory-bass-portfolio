import AuthForm from './AuthForm';

const LoginForm = (props: any) => {
  const onToggle = () => {
    props.setSignupForm(!props.signupForm);
  };

  return (
    <div>
      <AuthForm formType={'login'} />
      <button onClick={onToggle}>Not signed up?</button>
    </div>
  );
};

export default LoginForm;
