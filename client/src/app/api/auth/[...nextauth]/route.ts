import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/lib/models/User";
import { connectDB } from "@/lib/mongoose";
import { Types, Document } from "mongoose";

interface IUserWithMethods  extends Document {
    _id: Types.ObjectId;
    email: string;
    name: string;
    password: string;
    comparePassword: (input: string) => Promise<boolean>;
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", required: true},
                password: { label: "Password", type: "password", required: true},
            },
            async authorize(credentials) {
                await connectDB();

                const user = await User.findOne({ email: credentials?.email }) as IUserWithMethods;
                if (!user) return null;

                if (!credentials?.password) return null;
                const isValid = await user.comparePassword(credentials.password);
                if (!isValid) return null;

                return {
                  id: user._id.toString(),
                  email: user.email,
                  name: user.name,
                };
            },
        }),
    ],
   callbacks: {
    async jwt({ token, user }: { token: any; user?: any}) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }: { session: any; token: any}) {
      if (token?.user) session.user = token.user;
      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};