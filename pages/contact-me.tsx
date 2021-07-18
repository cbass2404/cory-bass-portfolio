import { Fragment } from 'react';
import Head from 'next/dist/next-server/lib/head';

import Contact from '../components/contactMe/Contact';
import HighlightedH1 from '../lib/HighlightedH1';

const ContactPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Contact Me</title>
      </Head>
      <HighlightedH1 content="contact me" />
      <Contact />
    </Fragment>
  );
};

export default ContactPage;
