import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { useSession, signOut } from 'next-auth/client';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelopeOpen,
  faEnvelope,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';

import classes from './MainHeader.module.scss';

const MainHeader = (props: any) => {
  const router = useRouter();

  const [session, loading] = useSession();

  const [activeLink, setActiveLink] = useState('');

  const route = useCallback(() => {
    return router.pathname.split('/')[1];
  }, [router.pathname]);

  useEffect(() => {
    const result = route();

    setActiveLink(result);
  }, [route]);

  const handleLogout = () => {
    signOut();
  };

  const showUser = useCallback(() => {
    if (loading) {
      return (
        <div className={classes.spacer}>
          <p>Loading...</p>
        </div>
      );
    } else if (session && session.user && session.user.name === '@cbass') {
      return (
        <div className={classes.spacer}>
          <div className={classes.toolbar}>
            <Link href="">
              <a>
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </Link>
          </div>
          <div className={classes.toolbar}>
            <Link href={`/${session.user.name}`}>
              <a>{session.user.name}</a>
            </Link>
          </div>
          <div className={classes.toolbar}>
            <Link href="">
              <a>
                <FontAwesomeIcon icon={faEdit} />
              </a>
            </Link>
          </div>
        </div>
      );
    } else if (session && session.user) {
      return (
        <div className={classes.spacer}>
          <div className={classes.toolbar}>
            <Link href={`/${session.user.name}`}>
              <a>{session.user.name}</a>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className={classes.spacer}>
          <p className={classes.name}>@guest</p>
        </div>
      );
    }
  }, [session, loading]);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">
          <a>
            <h2>Cory Bass</h2>
          </a>
        </Link>
      </div>

      {showUser()}

      <nav className={classes.navigation}>
        <div
          className={activeLink === 'portfolio' ? classes.active : classes.link}
        >
          <Link href="/portfolio">PORTFOLIO</Link>
        </div>

        <div className={activeLink === 'blog' ? classes.active : classes.link}>
          <Link href="/posts">BLOG</Link>
        </div>
        <div
          className={
            activeLink === 'contact-me' ? classes.active : classes.link
          }
        >
          <Link href="/contact-me">CONTACT ME</Link>
        </div>
        {session ? (
          <div className={classes.link}>
            <button onClick={handleLogout}>LOGOUT</button>
          </div>
        ) : (
          <div
            className={activeLink === 'auth' ? classes.active : classes.link}
          >
            <Link href="/auth">LOGIN</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default MainHeader;
