import { connectToCommentsDatabase } from './db';

export const getPostComments = async (slug: string) => {
  let client;
  try {
    client = await connectToCommentsDatabase();
  } catch (error) {
    throw new Error('Could not connect to database');
  }

  let data;
  try {
    data = await client
      .db()
      .collection('comments')
      .find({ _post: slug })
      .sort({ date: -1 })
      .toArray();
  } catch (error) {
    throw new Error('Could not query database');
  }

  const formattedData = data.map((comment) => ({
    _id: comment._id.toString(),
    _post: comment._post,
    _user: comment._user,
    image: comment.image,
    comment: comment.comment,
    viewed: comment.viewed,
    date: comment.date.toString(),
    edited: comment.edited?.toString() || null,
  }));

  return formattedData;
};
