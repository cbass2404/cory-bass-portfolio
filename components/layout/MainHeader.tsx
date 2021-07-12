import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { useSession, signOut } from 'next-auth/client';

//redux
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';

import classes from './MainHeader.module.scss';

interface User {
  _id: string;
  username: string;
  email: string;
  image: string;
  admin: boolean;
}

const MainHeader = (props: any) => {
  const router = useRouter();

  const [session, loading] = useSession();

  const [activeLink, setActiveLink] = useState('');
  const [user, setUser] = useState<User | null>(null);

  const route = useCallback(() => {
    return router.pathname.split('/')[1];
  }, [router.pathname]);

  useEffect(() => {
    const result = route();

    setActiveLink(result);
  }, [route]);

  const handleLogout = () => {
    signOut();
    props.setUser(null);
  };

  const showUser = () => {
    if (loading) {
      return (
        <div className={classes.spacer}>
          <p>Loading...</p>
        </div>
      );
    } else if (session && props.user.user) {
      return (
        <div className={classes.spacer}>
          <p>{props.user.user.username}</p>
        </div>
      );
    } else {
      return <div className={classes.spacer}>@guest</div>;
    }
  };

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

const mapStateToProps = (state: any) => ({
  user: state.user,
});

export default connect(mapStateToProps, { setUser })(MainHeader);
