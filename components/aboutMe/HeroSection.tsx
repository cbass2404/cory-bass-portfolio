import Image from 'next/dist/client/image';

import HighlightedContent from '../../lib/HighlightedContent';
import { techSkills, softSkills } from './skillsArrays';
import classes from './HeroSection.module.scss';

const HeroSection = () => {
  const handleLI: (list: string[]) => JSX.Element[] = (list) => {
    return list.map((item: string) => <li key={item}>{item}</li>);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.content + ' ' + classes.skills}>
        <div className={classes.list}>
          <HighlightedContent content="tech skills" />
          <ul>{handleLI(techSkills)}</ul>
        </div>
        <div className={classes.list}>
          <HighlightedContent content="soft skills" />
          <ul>{handleLI(softSkills)}</ul>
        </div>
      </div>
      <div className={classes.content + ' ' + classes.image}>
        <Image
          src="/images/about/coryBass.png"
          alt="About Me Profile Picture"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};

export default HeroSection;
