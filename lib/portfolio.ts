import { connectToPortfolioDatabase } from './db';

export const getAllPortfolioItems = async () => {
  let client;

  try {
    client = await connectToPortfolioDatabase();
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
    throw new Error('Could not query database');
  }

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

  throw new Error('No results found');
};
