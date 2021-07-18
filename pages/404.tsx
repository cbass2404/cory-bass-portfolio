import { Fragment } from 'react';
import Head from 'next/dist/next-server/lib/head';
import Image from 'next/dist/client/image';
import Link from 'next/dist/client/link';

const styles: any = {
  marginTop: '40px',
  color: '#2ce6cd',
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
};

const NotFoundPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Page not found...</title>
      </Head>
      <div style={styles}>
        <div>
          <Image
            src={'/images/notFound.png'}
            alt="Page not found..."
            width={300}
            height={300}
          />
        </div>
        <div>
          <Link href="/">This page does not exist...</Link>
        </div>
      </div>
    </Fragment>
  );
};

export default NotFoundPage;
