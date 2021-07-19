import connectToDatabase from '../../lib/db';
import { isValidInput, isValidEmail } from '../../lib/validateInput';

interface Message {
  name: string;
  email: string;
  message: string;
  viewed: boolean;
}

const handler = async (req: any, res: any) => {
  if (req.method === 'POST') {
    const messageData = req.body;

    const validName = isValidInput(messageData.name);
    let validEmail = isValidInput(messageData.email);
    const validMessage = isValidInput(messageData.message);

    if (!validName || !validEmail || !validMessage) {
      res.status(422).json({ message: 'Inputs must have content' });
      return;
    }

    validEmail = isValidEmail(messageData.email);
    if (!validEmail) {
      res.status(422).json({ message: 'Must be a valid email' });
      return;
    }

    const newMessage: Message = {
      name: messageData.name,
      email: messageData.email,
      message: messageData.message,
      viewed: false,
    };

    let client;
    try {
      client = await connectToDatabase('messages');
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to client' });
      return;
    }

    if (client) {
      try {
        await client.db().collection('messages').insertOne(newMessage);
      } catch (error) {
        res.status(500).json({ message: 'Could not save to database' });
        client.close();
        return;
      }
    }

    client.close();
    res.status(200).json({ message: 'Success!' });
    return;
  }

  res.status(400).json({ message: 'Method not allowed' });
  return;
};

export default handler;
