import { MongoClient } from 'mongodb';

// connects to database and returns the connection
export const connectToDatabase = async (database: string | undefined) => {
  let client;
  try {
    client = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dqnsb.mongodb.net/${database}?retryWrites=true&w=majority`,
      { useUnifiedTopology: true }
    );
  } catch (error) {
    throw new Error('Could not connect to database...');
  }

  return client;
};
