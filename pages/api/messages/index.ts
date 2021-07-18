import { ObjectId } from 'mongodb';
import connectToDatabase from '../../../lib/db';

const handler = async (req: any, res: any) => {
  const body = req.body;
  let client;
  let collection;

  if (req.method === 'PATCH') {
    if (body.type === 'message') {
      try {
        client = await connectToDatabase('messages');
      } catch {
        res.status(500).json({ message: 'Could not connect to client' });
        return;
      }

      collection = client.db().collection('messages');
    }

    if (body.type === 'comment') {
      try {
        client = await connectToDatabase('comments');
      } catch {
        res.status(500).json({ message: 'Could not connect to client' });
        return;
      }

      collection = client.db().collection('comments');
    }

    const _id = new ObjectId(body._id);

    try {
      await collection?.findOneAndUpdate({ _id }, { $set: { viewed: true } });
    } catch {
      client?.close();
      res.status(500).json({ message: 'Could not query database' });
      return;
    }

    client?.close();
    res.status(200).json({ message: 'Success!' });
    return;
  }

  res.status(400).json({ message: 'Method not allowed' });
  return;
};

export default handler;
