import { Fragment } from 'react';

import AboutMe from '../components/aboutMe/AboutMe';

const HomePage = () => {
  return (
    <Fragment>
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
