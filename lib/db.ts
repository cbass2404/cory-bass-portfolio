import { MongoClient } from 'mongodb';

// connects to database and returns the connection
const connectToDatabase = async (database: string) => {
  let envString;

  if (database === 'users') {
    envString = process.env.USERS;
  } else if (database === 'messages') {
    envString = process.env.MESSAGES;
  } else if (database === 'comments') {
    envString = process.env.COMMENTS;
  } else if (database === 'portfolio') {
    envString = process.env.PORTFOLIO;
  }

  let client;
  try {
    client = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dqnsb.mongodb.net/${envString}?retryWrites=true&w=majority`,
      { useUnifiedTopology: true }
    );
  } catch (error) {
    throw new Error('Could not connect to database...');
  }

  return client;
};

export default connectToDatabase;
