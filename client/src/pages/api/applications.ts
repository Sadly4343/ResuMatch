import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import {
    getUserApplications,
    createApplication,
    updateApplication,
    deleteApplication,
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
            console.error("Error with adding an application", error)
            res.status(500).json({ error: "failed to fetch 1"});
         }
            
    }  else if (req.method === "PUT") {
        const { id } = req.query;
            if (!id || typeof id !== "string") {
                return res.status(400).json({error: "Missing application Id"});
            }
        try {
            const updated = await updateApplication(userId, id, req.body);
            res.status(200).json(updated);
        } catch (error) {
            console.error("Error with the updated application", error);
            res.status(500).json({ error: "failed to update"});
        }
    } else if (req.method === "DELETE") {
        const { id } = req.query;
        if (!id || typeof id !== "string") {
            return res.status(400).json({ error: "missing application id"});

        } try {
            const deleted = await deleteApplication(userId, id);
            res.status(200).json(deleted);
        } catch (error) {
            console.error("Error deleting applications", error);
            res.status(500).json({ error: "failed to delete application" });
        }
    }
    
    else {
            res.setHeader("Allow", [ 'GET', "POST"])
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
}