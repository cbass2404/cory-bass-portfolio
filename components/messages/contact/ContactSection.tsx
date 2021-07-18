import { useState, useEffect } from 'react';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import ContactItem from './ContactItem';
import classes from './ContactSection.module.scss';

const ContactSection = (props: any) => {
  const [messages, setMessages] = useState<any[] | null>(null);

  useEffect(() => {
    if (props.messages) {
      setMessages(props.messages);
    }
  }, [props.messages]);

  const handleClick = async (id: string) => {
    const response = await fetch('/api/messages', {
      method: 'PATCH',
      body: JSON.stringify({ _id: id, type: 'message' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error:', data.message);
      return;
    }

    const newMessages: any = messages?.filter(
      (message: any) => message._id !== id
    );
    setMessages(newMessages);
  };

  return (
    <div className={classes.wrapper}>
      {messages?.map((message: any) => {
        return (
          <div key={message._id} className={classes.item}>
            <ContactItem message={message} />
            <div
              onClick={() => handleClick(message._id)}
              className={classes.icon}
            >
              <FontAwesomeIcon icon={faCheck} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContactSection;
