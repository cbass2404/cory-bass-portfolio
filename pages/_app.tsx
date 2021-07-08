import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

import Layout from '../components/layout/layout';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container">
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </div>
  );
}
export default MyApp;
