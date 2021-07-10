import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { connectToUserDatabase } from '../../../lib/db';
import { verifyPassword } from '../../../lib/auth';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials: any) {
        let client;
        try {
          client = await connectToUserDatabase();
        } catch (error) {
          throw new Error('Could not connect to database...');
        }

        let user;
        try {
          user = await client
            .db()
            .collection('users')
            .findOne({ email: credentials.email });
          client.close();
        } catch (error) {
          client.close();
          throw new Error('Unable to query database...');
        }

        if (!user) {
          throw new Error('Invalid email or password');
        }

        let isValid;
        try {
          isValid = await verifyPassword(credentials.password, user.password);
        } catch (error) {
          throw new Error('Could not verify password');
        }

        if (!isValid) {
          throw new Error('Invalid email or password');
        }

        return { email: user.email, admin: user.admin };
      },
    }),
  ],
});
