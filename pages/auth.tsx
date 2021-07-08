import { Fragment, useState } from 'react';

import AuthForms from '../components/auth/AuthForms';

const AuthPage = (props: any) => {
  const [signup, setSignup] = useState<boolean>(false);
  return (
    <Fragment>
      <h1>{signup ? '< signup />' : '< login />'}</h1>
      <AuthForms setSignup={setSignup} />
    </Fragment>
  );
};

export default AuthPage;
