import connectToDatabase from '../../../lib/db';
import { hashPassword } from '../../../lib/auth';
import {
  isValidInput,
  isValidEmail,
  isValidPassword,
} from '../../../lib/validateInput';

interface UserData {
  username: string;
  email: string;
  password: string;
  image: string;
  admin: boolean;
}

interface NewUser {
  _id: string;
  username: string;
  email: string;
  image: string;
  admin: boolean;
}

const handler = async (req: any, res: any) => {
  if (req.method !== 'POST') {
    return;
  }

  let { username, email, password } = req.body;

  email = email.split('').replace(/[@]/g, '').join('');

  let validUsername = isValidInput(username);
  let validEmail = isValidInput(email);
  let validPassword = isValidInput(password);

  if (!validUsername || !validEmail || !validPassword) {
    res.status(422).json({ message: 'Unprocessable input(s)' });
    return;
  }

  validEmail = isValidEmail(email);
  validPassword = isValidPassword(password);

  let error: string[] = [];

  if (!validEmail) {
    error.push('Invalid email format');
  }

  if (!validPassword) {
    error.push('Invalid password format');
  }

  if (!!error.length) {
    res.status(422).json({ message: error.join(', ') });
    return;
  }

  const hashedPassword = await hashPassword(password);

  const userData: UserData = {
    username: `@${username.toLowerCase()}`,
    email,
    password: hashedPassword,
    image: '/images/user/no-img.png',
    admin: false,
  };

  let client;
  try {
    client = await connectToDatabase('users');
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Could not connect to database...', error });
    return;
  }

  const collection = client.db().collection('users');

  let usernameTaken;
  try {
    usernameTaken = await collection.findOne({ username });
  } catch (error) {
    res.status(500).json({ message: 'Could not query database' });
    client.close();
    return;
  }

  if (usernameTaken) {
    res.status(422).json({ message: 'Username taken' });
    client.close();
    return;
  }

  let emailTaken;
  try {
    emailTaken = await collection.findOne({ email });
  } catch (error) {
    res.status(500).json({ message: 'Could not query database' });
    client.close();
    return;
  }

  if (emailTaken) {
    res.status(422).json({ message: 'Email taken' });
    client.close();
    return;
  }

  let response;
  try {
    response = await collection.insertOne(userData);
  } catch (error) {
    res.status(500).json({ message: 'Could not save profile...', error });
    client.close();
    return;
  }

  client.close();

  const newUser: NewUser = {
    username: userData.username,
    email: userData.email,
    image: userData.image,
    _id: response.insertedId,
    admin: false,
  };

  res.status(200).json({ message: 'Success!', data: newUser });
};

export default handler;
