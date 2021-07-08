import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';

import { getPathname } from '../../lib/getPathname';
import classes from './MainHeader.module.scss';

const MainHeader = () => {
  const router = useRouter();

  const [activeLink, setActiveLink] = useState('');

  const route = useCallback(() => {
    return router.pathname.split('/')[1];
  }, [router.pathname]);

  useEffect(() => {
    const result = route();

    setActiveLink(result);
  }, [route]);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">
          <a>
            <h2>Cory Bass</h2>
          </a>
        </Link>
      </div>

      <div className={classes.spacer} />

      <nav className={classes.navigation}>
        <div
          className={activeLink === 'portfolio' ? classes.active : classes.link}
        >
          <Link href="/portfolio">PORTFOLIO</Link>
        </div>

        <div className={activeLink === 'blog' ? classes.active : classes.link}>
          <Link href="/blog">BLOG</Link>
        </div>
        <div
          className={
            activeLink === 'contact-me' ? classes.active : classes.link
          }
        >
          <Link href="/contact-me">CONTACT ME</Link>
        </div>
        <div className={activeLink === 'auth' ? classes.active : classes.link}>
          <Link href="/auth">LOGIN</Link>
        </div>
      </nav>
    </header>
  );
};

export default MainHeader;