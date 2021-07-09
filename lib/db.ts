import { MongoClient } from 'mongodb';

// connects to database and returns the connection
export const connectToUserDatabase = async () => {
  let client;
  try {
    client = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dqnsb.mongodb.net/${process.env.USERS}?retryWrites=true&w=majority`,
      { useUnifiedTopology: true }
    );
  } catch (error) {
    throw new Error('Could not connect to database...');
  }

  return client;
};
