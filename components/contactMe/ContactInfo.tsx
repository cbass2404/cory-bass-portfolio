import Link from 'next/dist/client/link';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelopeSquare,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';

import classes from './ContactInfo.module.scss';

const ContactInfo = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <a
          href="https://www.linkedin.com/in/cory-bass/"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} />
          {'LinkedIn'}
        </a>
      </div>
      <div className={classes.content}>
        <a href="https://github.com/cbass2404" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faGithubSquare} />
          {'Github'}
        </a>
      </div>
      <div className={classes.content}>
        <FontAwesomeIcon icon={faEnvelopeSquare} />
        {'cory@bass-dev.com'}
      </div>
      <div className={classes.content}>
        <FontAwesomeIcon icon={faMapMarkerAlt} />
        {'Many, La, USA'}
      </div>
    </div>
  );
};

export default ContactInfo;
