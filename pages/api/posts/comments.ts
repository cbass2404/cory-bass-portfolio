import { connectToCommentsDatabase } from '../../../lib/db';

const handler = async (req: any, res: any) => {
  const comment = req.body;
  if (req.method === 'POST') {
    comment.viewed = false;
    comment.date = new Date();

    let client;
    try {
      client = await connectToCommentsDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to client' });
    }

    let data;
    try {
      data = await client?.db().collection('comments').insertOne(comment);
    } catch (error) {
      res.status(500).json({ message: 'Could not save to database' });
    }

    comment._id = data?.insertedId;

    return res.status(200).json({ message: 'POST', data: comment });
  }

  if (req.method === 'PATCH') {
    return res.status(200).json({ message: 'PATCH' });
  }

  if (req.method === 'DELETE') {
    return res.status(200).json({ message: 'DELETE' });
  }

  return res.status(400).json({ message: 'Method not allowed' });
};

export default handler;
