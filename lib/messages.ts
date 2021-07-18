import connectToDatabase from './db';

export const getUnreadMessages = async () => {
  let client;
  try {
    client = await connectToDatabase('messages');
  } catch {
    throw new Error('Could not connect to client');
  }

  let data;
  try {
    data = await client
      .db()
      .collection('messages')
      .find({ viewed: false })
      .sort({ _id: 1 })
      .toArray();
  } catch {
    client.close();
    throw new Error('Could not query database');
  }

  const formattedData = data.map((item: any) => ({
    _id: item._id.toString(),
    name: item.name,
    email: item.email,
    message: item.message,
    viewed: item.viewed,
  }));

  client.close();
  return formattedData;
};
