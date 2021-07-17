import { ObjectId } from 'mongodb';

import { connectToPortfolioDatabase } from '../../../lib/db';

const handler = async (req: any, res: any) => {
  const portfolioItem = req.body;

  let client;
  try {
    client = await connectToPortfolioDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Could not connect to client' });
  }

  const collection = client?.db().collection('portfolio');

  let result;

  if (req.method === 'POST') {
    const { title, url, githubUrl, description, image, thumbnail, slug, tags } =
      portfolioItem;

    const newPortfolioItem = {
      title,
      url,
      githubUrl,
      description,
      image,
      thumbnail,
      slug,
      tags,
      date: new Date(),
    };

    try {
      result = await collection?.insertOne(newPortfolioItem);
    } catch {
      res.status(500).json({ message: 'Could not save to database' });
    }

    client?.close();

    portfolioItem._id = result?.insertedId.toString();
    portfolioItem.date = newPortfolioItem.date.toString();

    res.status(200).json({ message: 'Success!', data: portfolioItem });
    return;
  }

  if (req.method === 'PUT') {
    const _id = new ObjectId(portfolioItem._id);

    const query = { _id };

    const replacement = {
      ...portfolioItem,
      _id,
    };

    try {
      result = await collection?.findOneAndReplace(query, replacement);
    } catch {
      res.status(500).json({ message: 'Could not query database' });
      client?.close();
      return;
    }

    if (!result?.ok) {
      client?.close();
      res.status(500).json({ message: 'Could not save document' });
      return;
    }

    client?.close();
    res.status(200).json({ message: 'Success', data: portfolioItem });
    return;
  }

  if (req.method === 'DELETE') {
    const _id = new ObjectId(portfolioItem._id);

    try {
      result = await collection?.findOneAndDelete({ _id });
    } catch {
      client?.close();
      res.status(500).json({ message: 'Could not query database' });
      return;
    }

    if (!result?.ok) {
      client?.close();
      res.status(500).json({ message: 'Could not find item' });
      return;
    }

    client?.close();
    res.status(200).json({ message: 'Item Deleted' });
    return;
  }

  client?.close();
  res.status(400).json({ message: 'Method not allowed' });
  return;
};

export default handler;
