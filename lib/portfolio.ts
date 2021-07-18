import connectToDatabase from './db';

export const getAllPortfolioItems = async () => {
  let client;
  try {
    client = await connectToDatabase('portfolio');
  } catch {
    throw new Error('Could not connect to database');
  }

  let response: any[];
  try {
    response = await client
      .db()
      .collection('portfolio')
      .find()
      .sort({ date: -1 })
      .toArray();
  } catch {
    client.close();
    throw new Error('Could not query database');
  }

  client.close();

  if (response) {
    const data: any[] = [];

    response.forEach((item: any) => {
      data.push({
        ...item,
        _id: item._id.toString(),
        date: item.date.toString(),
        tags: item.tags.sort(),
      });
    });

    return data;
  }

  client.close();
  throw new Error('No results found');
};

export const getAPortfolioItem = async (slug: string) => {
  let client;
  try {
    client = await connectToDatabase('portfolio');
  } catch {
    throw new Error('Could not connect to database');
  }

  const collection = client.db().collection('portfolio');

  let response;
  try {
    response = await collection.findOne({ slug });
  } catch {
    client.close();
    throw new Error('Could not query database');
  }

  client.close();

  if (response) {
    const data = {
      ...response,
      _id: response._id.toString(),
      date: response.date.toString(),
    };

    return data;
  }

  client.close();
  throw new Error('No result found');
};
