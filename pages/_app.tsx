import type { AppProps } from 'next/app';

import Layout from '../components/layout/layout';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <div className="container">
        <Component {...pageProps} />
      </div>
    </Layout>
  );
}
export default MyApp;
