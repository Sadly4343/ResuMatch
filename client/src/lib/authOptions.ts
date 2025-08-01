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

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", required: true },
                password: { label: "Password", type: "password", required: true },
            },
            async authorize(credentials) {
                await connectDB();

                const email = credentials?.email?.trim() || "";
                const password = credentials?.password?.trim() || "";

                if (!email || !password) {
                    throw new Error("Email and password required");
                }

                const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailReg.test(email)) {
                    throw new Error("Please enter a valid email");}

                if (password.length < 8) {
                    throw new Error("Password must be at least 8 characters");
                }

                const passwordReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;

                if (!passwordReg.test(password)) {
                throw new Error("Password must atleast one number and special character");
                 }




                

                const user = await User.findOne({ email: credentials?.email }) as IUserWithMethods;
                console.log("user found", user);
                if (!user || !credentials?.password) return null;

                const isValid = await user.comparePassword(credentials.password);
                console.log("password valid: ", isValid);
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async jwt({ token, user }: { token: any; user?: any }) {
            if (user) token.user = user;
            return token;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async session({ session, token }: { session: any; token: any }) {
            if (token?.user) session.user = token.user;
            return session;
        },
    },
};

export default authOptions;