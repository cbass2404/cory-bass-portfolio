import connectToDatabase from '../../../lib/db';

const handler = async (req: any, res: any) => {
  if (req.method !== 'GET') {
    res.status(500).json({ message: 'Method not allowed' });
    return;
  }

  let unread = 0;

  let client;
  try {
    client = await connectToDatabase('messages');
  } catch {
    res.status(500).json({ message: 'Could not connect to message client' });
    return;
  }

  let count: number;
  try {
    count = await client
      ?.db()
      .collection('messages')
      .find({ viewed: false })
      .count();
  } catch {
    client?.close();
    res.status(500).json({ message: 'Could not query message database' });
    return;
  }

  client.close();
  unread += count;

  try {
    client = await connectToDatabase('comments');
  } catch {
    res.status(500).json({ message: 'Could not connect to comments client' });
  }

  try {
    count = await client
      .db()
      .collection('comments')
      .find({ viewed: false })
      .count();
  } catch {
    res.status(500).json({ message: 'Could not query comment database' });
  }

  client.close();
  unread += count;

  res.status(200).json({ message: 'Success', data: unread });
};

export default handler;
