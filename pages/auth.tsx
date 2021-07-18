import { Fragment, useState } from 'react';
import Head from 'next/dist/next-server/lib/head';

import AuthForms from '../components/auth/AuthForms';
import HighlightedH1 from '../lib/HighlightedH1';

const AuthPage = () => {
  const [signup, setSignup] = useState<boolean>(false);
  return (
    <Fragment>
      <Head>
        <title>{signup ? 'Signup' : 'Login'}</title>
      </Head>
      {signup ? (
        <HighlightedH1 content="signup" />
      ) : (
        <HighlightedH1 content="login" />
      )}
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
