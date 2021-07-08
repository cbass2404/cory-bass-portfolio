import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { connectToDatabase } from '../../../lib/db';
import { verifyPassword } from '../../../lib/auth';

export default NextAuth({
  session: {
    jwt: true,
    maxAge: 7 * 24 * 60 * 60,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials: { email: string; password: string }) {
        let client;
        try {
          client = await connectToDatabase(process.env.USERS);
        } catch (error) {
          throw new Error('Could not connect to database...');
        }

        let user;
        try {
          user = await client
            .db()
            .collection('users')
            .findOne({ email: credentials.email });
        } catch (error) {
          client.close();
          throw new Error('Unable to query database...');
        }

        if (!user) {
          client.close();
          throw new Error('Invalid email or password');
        }

        let isValid;
        try {
          isValid = await verifyPassword(credentials.password, user.password);
        } catch (error) {
          client.close();
          throw new Error('Could not verify password');
        }

        if (!isValid) {
          client.close();
          throw new Error('Invalid email or password');
        }

        client.close();

        return { email: user.email };
      },
    }),
  ],
});
