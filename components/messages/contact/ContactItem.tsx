import classes from './ContactItem.module.scss';

const ContactItem = (props: any) => {
  const { message, name, email } = props.message;

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <p>
          <span>Name: </span>
          {name}
        </p>
        <p>
          <span>Email: </span> {email}
        </p>
      </div>
      <div className={classes.content}>
        <p>
          <span>Message: </span>
          {message}
        </p>
      </div>
    </div>
  );
};

export default ContactItem;
