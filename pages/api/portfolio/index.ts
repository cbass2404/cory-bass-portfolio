import { connectToPortfolioDatabase } from '../../../lib/db';

const handler = async (req: any, res: any) => {
  let portfolioItem = req.body;

  let client;
  try {
    client = await connectToPortfolioDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Could not connect to client' });
  }

  const collection = client?.db().collection('portfolio');

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

    let result;
    try {
      result = await collection?.insertOne(newPortfolioItem);
    } catch {
      res.status(500).json({ message: 'Could not save to database' });
    }

    portfolioItem._id = result?.insertedId.toString();

    res.status(200).json({ message: 'Success!', data: portfolioItem });
  }

  client?.close();
  return;
};

export default handler;
