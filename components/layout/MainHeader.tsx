import Link from 'next/link';
import Image from 'next/image';

import classes from './MainHeader.module.scss';

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">
          <a>
            <Image
              src="/images/header/logo.png"
              alt="Main Header Logo"
              width={200}
              height={200}
            />
          </a>
        </Link>
      </div>

      <div className={classes.spacer} />

      <nav className={classes.navigation}>
        <Link href="/portfolio">PORTFOLIO</Link>

        <Link href="/blog">BLOG</Link>

        <Link href="/contact-me">CONTACT ME</Link>

        <Link href="/login">LOGIN</Link>
      </nav>
    </header>
  );
};

export default MainHeader;
