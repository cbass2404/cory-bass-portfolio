import { connectToMessageDatabase } from '../../../lib/db';

const handler = async (req: any, res: any) => {
  let client;
  try {
    client = await connectToMessageDatabase();
  } catch {
    res.status(500).json({ message: 'Could not connect to client' });
    return;
  }

  if (req.method === 'PATCH') {
    client?.close();
    res.status(200).json({ message: 'PATCH' });
    return;
  }

  if (req.method === 'GET') {
    client?.close();
    res.status(200).json({ message: 'GET' });
    return;
  }

  client?.close();
  res.status(400).json({ message: 'Method not allowed' });
  return;
};

export default handler;
