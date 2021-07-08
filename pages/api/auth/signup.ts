import { signIn } from 'next-auth/client';

import { connectToDatabase } from '../../../lib/db';
import { hashPassword } from '../../../lib/auth';

interface UserData {
  username: string;
  email: string;
  password: string;
  image: string;
}

interface NewUser {
  username: string;
  password: string;
  email: string;
  image: string;
  _id: string;
}

const handler = async (req: any, res: any) => {
  if (req.method !== 'POST') {
    return;
  }

  const { username, email, password } = req.body;

  // TODO:
  // implement input checks

  const hashedPassword = await hashPassword(password);

  const userData: UserData = {
    username,
    email,
    password: hashedPassword,
    image: '/images/user/no-img.png',
  };

  let client;
  try {
    client = await connectToDatabase(process.env.USERS);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Could not connect to database...', error });
    return;
  }

  let response;
  try {
    response = await client.db().collection('users').insertOne(userData);
  } catch (error) {
    res.status(500).json({ message: 'Could not save profile...', error });
    client.close();
    return;
  }

  client.close();

  const newUser: NewUser = {
    username: userData.username,
    password: hashedPassword,
    email: userData.email,
    image: userData.image,
    _id: response.insertedId,
  };

  res.status(200).json({ message: 'Success!', newUser });
};

export default handler;
