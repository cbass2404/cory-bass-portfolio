import type { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import Head from 'next/head';

import Layout from '../components/layout/layout';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container">
      <Provider session={pageProps.session}>
        <Layout>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </div>
  );
}
export default MyApp;
