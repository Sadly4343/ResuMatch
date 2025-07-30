import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import {
    getUserApplications,
    createApplication,
} from '@/lib/controllers/applicationController';
import User from "@/lib/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await connectDB();

    const session = await getServerSession(req, res, authOptions);

    if(!session?.user?.email) {
        return res.status(401).json({ error: "Unauthorized "});

    }

    const user = await User.findOne({ email: session.user.email});
    if (!user) {
        return res.status(404).json({ error: "User isnt found"});
    }

    const userId = user._id;


    if (req.method === "GET") {
        try{
            const applications = await getUserApplications(userId);
            res.status(200).json(applications);
        } catch(error) {
            console.error("Error getting ", error );
            res.status(500).json({ error: "failed to fetch 1"});
        }
    } else if (req.method === "POST") {
        try {
            const application = await createApplication(userId, req.body);
            res.status(201).json(application);
            } catch(error) {
            res.status(500).json({ error: "failed to fetch 1"});
         }
            
    }   else {
            res.setHeader("Allow", [ 'GET', "POST"])
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
}