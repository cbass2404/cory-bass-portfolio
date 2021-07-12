import { Fragment } from 'react';

import AboutMe from '../components/aboutMe/AboutMe';
import HighlightedH1 from '../lib/HighlightedH1';

const HomePage = () => {
  return (
    <Fragment>
      <HighlightedH1 content="about me" />
      <AboutMe />
    </Fragment>
  );
};

export const getStaticProps = () => {
  return {
    props: {},
  };
};

export default HomePage;
