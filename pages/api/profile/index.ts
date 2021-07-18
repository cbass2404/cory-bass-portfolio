import connectToDatabase from '../../../lib/db';
import { hashPassword, verifyPassword } from '../../../lib/auth';

const handler = async (req: any, res: any) => {
  const user = req.body;

  let client;
  try {
    client = await connectToDatabase('users');
  } catch (error) {
    res.status(500).json({ message: 'Could not connect to client' });
    return;
  }

  const collection = client.db().collection('users');

  if (req.method === 'POST') {
    if (user.oldPassword === user.newPassword) {
      res.status(422).json({ message: 'This is your password already' });
      client.close();
      return;
    }

    let userDocument;
    try {
      userDocument = await collection.findOne({ email: user.email });
    } catch (error) {
      res.status(500).json({ message: 'Could not query database' });
      client.close();
      return;
    }

    if (!userDocument) {
      res.status(404).json({ message: 'User not found' });
      client.close();
      return;
    }

    let isValid;
    try {
      isValid = await verifyPassword(user.oldPassword, userDocument.password);
    } catch (error) {
      res.status(500).json({ message: 'Could not verify password' });
      client.close();
      return;
    }

    if (!isValid) {
      res
        .status(401)
        .json({ message: 'Old password does not match stored password' });
      client.close();
      return;
    }

    let hashedPassword;
    try {
      hashedPassword = await hashPassword(user.newPassword);
    } catch (error) {
      res.status(500).json({ message: 'Could not encrypt password' });
      client.close();
      return;
    }

    try {
      await collection.findOneAndUpdate(
        { email: user.email },
        { $set: { password: hashedPassword } }
      );
    } catch (error) {
      res.status(500).json({ message: 'Could not save new password' });
      client.close();
      return;
    }

    client.close();
    res.status(200).json({ message: 'Updated password!' });
    return;
  }

  if (req.method === 'DELETE') {
    let response;
    try {
      response = await collection.findOneAndDelete({ email: user.email });
    } catch (error) {
      res.status(500).json({ message: 'Could not query database' });
      client.close();
      return;
    }

    client.close();
    res.status(200).json({ message: 'delete user' });
    return;
  }

  client.close();
  res.status(400).json({ message: 'Method not allowed' });
  return;
};

export default handler;
