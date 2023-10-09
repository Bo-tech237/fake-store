import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/dbConfig/dbConnect';
import bcrypt from 'bcrypt';
import { User } from '@/models/User';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials;
                dbConnect();

                try {
                    const user = await User.findOne({ email }).exec();

                    if (!user) return null;

                    const match = await bcrypt.compare(password, user.password);

                    if (!match) return null;

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.username,
                        image: user.image,
                        role: user.role,
                    };
                } catch (error) {
                    console.log('Error', error);
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }

            return token;
        },
        session: async ({ session, token }) => {
            if (session.user) {
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        },
    },
    pages: {
        signIn: '/user-auth/login',
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
