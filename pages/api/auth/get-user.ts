import { connectToUserDatabase } from '../../../lib/db';

const handler = async (req: any, res: any) => {
  if (req.method !== 'POST') {
    res.status(400).json({ message: 'Method not allowed' });
    return;
  }
  const email = req.body;

  let client;
  try {
    client = await connectToUserDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Could not connect to client' });
    return;
  }

  let data;
  if (client) {
    try {
      data = await client.db().collection('users').findOne(email);
    } catch (error) {
      res.status(500).json({ message: 'Could not query database' });
      client.close();
      return;
    }

    if (!data) {
      res.status(422).json({ message: 'User not found' });
      client.close();
      return;
    }

    const user = {
      _id: data._id,
      username: data.username,
      email: data.email,
      image: data.image,
      admin: data.admin,
    };

    res.status(200).json({ data: user });
    client.close();
  }
  return;
};

export default handler;
