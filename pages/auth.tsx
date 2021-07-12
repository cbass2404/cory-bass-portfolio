import { Fragment, useState } from 'react';

import AuthForms from '../components/auth/AuthForms';
import HighlightedH1 from '../lib/HighlightedH1';

const AuthPage = () => {
  const [signup, setSignup] = useState<boolean>(false);
  return (
    <Fragment>
      <h1>
        {signup ? (
          <HighlightedH1 content="signup" />
        ) : (
          <HighlightedH1 content="login" />
        )}
      </h1>
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
