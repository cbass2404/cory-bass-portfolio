import { Fragment } from 'react';

import Contact from '../components/contactMe/Contact';
import HighlightedH1 from '../lib/HighlightedH1';

const ContactPage = () => {
  return (
    <Fragment>
      <HighlightedH1 content="contact me" />
      <Contact />
    </Fragment>
  );
};

export default ContactPage;
