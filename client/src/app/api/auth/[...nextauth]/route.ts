import NextAuth from "next-auth";
import authOptions from "@/lib/authOptions";

//Api Route Hanlder for Next Auth Authentication (GET and POST).
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };