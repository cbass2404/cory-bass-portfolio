import connectToDatabase from './db';

const formatData = async (data: any) =>
  await data.map((item: any) => ({
    _id: item._id.toString(),
    _post: item._post,
    _user: item._user,
    image: item.image,
    comment: item.comment,
    viewed: item.viewed,
    date: item.date.toString(),
    edited: item.edited?.toString() || null,
  }));

let client;
let data;

export const getPostComments = async (slug: string) => {
  try {
    client = await connectToDatabase('comments');
  } catch (error) {
    throw new Error('Could not connect to database');
  }

  try {
    data = await client
      .db()
      .collection('comments')
      .find({ _post: slug })
      .sort({ date: -1 })
      .toArray();
  } catch (error) {
    client.close();
    throw new Error('Could not query database');
  }

  client.close();

  const formattedData = await formatData(data);

  return formattedData;
};

export const getUnreadComments = async () => {
  try {
    client = await connectToDatabase('comments');
  } catch {
    throw new Error('Could not connect to client');
  }

  try {
    data = await client
      .db()
      .collection('comments')
      .find({ viewed: false })
      .sort({ date: 1 })
      .toArray();
  } catch {
    client.close();
    throw new Error('Could not query database');
  }

  const formattedData = await formatData(data);

  client.close();
  return formattedData;
};
