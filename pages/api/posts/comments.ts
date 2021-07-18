import { ObjectId } from 'mongodb';

import connectToDatabase from '../../../lib/db';

const handler = async (req: any, res: any) => {
  const comment = req.body;

  let client;
  try {
    client = await connectToDatabase('comments');
  } catch (error) {
    res.status(500).json({ message: 'Could not connect to client' });
  }

  const collection = client?.db().collection('comments');

  let data;

  if (req.method === 'POST') {
    comment.viewed = false;
    comment.date = new Date();

    try {
      data = await collection?.insertOne(comment);
    } catch (error) {
      res.status(500).json({ message: 'Could not save to database' });
      client?.close();
      return;
    }

    comment._id = data?.insertedId;
    client?.close();
    return res.status(200).json({ message: 'Success!', data: comment });
  }

  if (req.method === 'PATCH') {
    comment.edited = new Date();

    const _id = new ObjectId(comment._id);

    try {
      data = await collection?.findOneAndUpdate({ _id }, [
        { $set: { edited: comment.edited, comment: comment.newComment } },
      ]);
    } catch (error) {
      res.status(500).json({ message: 'Could not query database' });
      client?.close();
      return;
    }

    client?.close();
    return res.status(200).json({ message: 'Success!', data: data?.value });
  }

  if (req.method === 'DELETE') {
    const _id = new ObjectId(comment._id);

    try {
      data = await collection?.findOneAndDelete({ _id });
    } catch (error) {
      res.status(500).json({ message: 'Could not query database' });
    }

    client?.close();
    return res.status(200).json({ message: 'Deleted!' });
  }

  client?.close();
  return res.status(400).json({ message: 'Method not allowed' });
};

export default handler;
