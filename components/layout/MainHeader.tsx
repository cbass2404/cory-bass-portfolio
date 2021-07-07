import Link from 'next/link';
import Image from 'next/image';

import classes from './MainHeader.module.css';

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">
          <a>
            <Image
              src="/images/header/logo.png"
              alt="Main Header Logo"
              width={75}
              height={75}
            />
          </a>
        </Link>
      </div>

      <div className={classes.spacer} />

      <nav className={classes.navigation}>
        <Link href="/portfolio">Portfolio</Link>

        <Link href="/blog">Blog</Link>

        <Link href="/contact-me">Contact Me</Link>
      </nav>
    </header>
  );
};

export default MainHeader;
