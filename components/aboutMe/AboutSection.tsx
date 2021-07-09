import HighlightedContent from '../../lib/HighlightedContent';
import classes from './AboutSection.module.scss';

const AboutSection = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <HighlightedContent content="summary" />
        <p>
          I love to learn new things and accept challenging projects. Above all
          things I value a good team and being a valuable member of that team. I
          have a great attitude and feel like I would be an excellent addition
          to any workforce.
        </p>
      </div>
      <div className={classes.content}>
        <HighlightedContent content="hobbies" />
        <p>
          I enjoy playing Irish folk music on my mandolin, playing survival
          games and simulators, trying out new VR games as they come out,
          playing board games with my children, reading fantasy series,
          researching and learning new things. In the evenings I enjoy playing
          through{' '}
          <a
            href="https://www.codewars.com/users/cbass07"
            target="_blank"
            rel="noreferrer"
          >
            codewars
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
