import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/lib/models/User";
import { connectDB } from "@/lib/mongoose";

interface IUserWithMethods {
    comparePassword: (input: string) => Promise<boolean>;
    toJSON: () => any;
}

const handler = NextAuth({
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

                return user.toJSON();
            },
        }),
    ],
   callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      if (token?.user) session.user = token.user;
      return session;
    },
  },
});
export { handler as GET, handler as POST };