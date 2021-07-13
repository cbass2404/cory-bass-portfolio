import { Fragment } from 'react';
import Head from 'next/head';
import AboutMe from '../components/aboutMe/AboutMe';
import HighlightedH1 from '../lib/HighlightedH1';

const HomePage = () => {
  return (
    <Fragment>
      <Head>
        <title>About Me</title>
        <meta name="description" content="kajsdfkljdf" />
      </Head>
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
