import  jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function authenticate(req: NextRequest) {
  
    const cookieToken = req.cookies.get("next-auth.session-token")?.value;
    const authHeader = req.headers.get("authorization");
    const headerToken = authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : undefined;
    
    const token = cookieToken || headerToken;

    if (!token) {
        throw new Error("No token, authorization has failed");

    }

    try {
        const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!);
        return (decoded as any).user || decoded;

    } catch (error) {
        throw new Error("Token is not a valid one");
    }
};

