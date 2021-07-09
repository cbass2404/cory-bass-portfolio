import { Fragment, useState } from 'react';

import AuthForms from '../components/auth/AuthForms';

const AuthPage = () => {
  const [signup, setSignup] = useState<boolean>(false);
  return (
    <Fragment>
      <h1>{signup ? '< signup />' : '< login />'}</h1>
      <AuthForms setSignup={setSignup} />
    </Fragment>
  );
};

export const getStaticProps = () => {
  return {
    props: {},
  };
};

export default AuthPage;
