import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import classes from './Contact.module.scss';

const Contact = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <ContactInfo />
      </div>
      <div className={classes.content}>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
