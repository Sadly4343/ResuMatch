import  jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

interface DecodedToken {
    user?: {
        id: string;
        email: string;
        name: string;
    };
}

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
        const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as DecodedToken;
        return decoded.user || decoded;

    } catch (error) {
        console.error("JWT verification failed: ", error)
        throw new Error("Token is not a valid one");
    }
};

