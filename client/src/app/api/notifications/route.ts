import type { NextApiRequest, NextApiResponse } from "next";
import NotificationSettings from "@/lib/models/NotificationSettings"; // Adjust path as needed
import { Types } from "mongoose";

// Replace with real user ID from auth/session later
const mockUserId = new Types.ObjectId('507f1f77bcf86cd799439011');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET': {
        let settings = await NotificationSettings.findOne({ user: mockUserId });

        if (!settings) {
          settings = new NotificationSettings({
            user: mockUserId,
            settings: {
              stagnantApplicationReminders: true,
              interviewReminders: false,
              applicationDeadlineAlerts: true,
              weeklyDigest: false,
              newJobMatches: true,
            },
            emailFrequency: 'daily',
          });
          await settings.save();
        }

        return res.status(200).json(settings);
      }

      case 'PUT': {
        const { settings, emailFrequency } = req.body;

        const updated = await NotificationSettings.findOneAndUpdate(
          { user: mockUserId },
          { settings, emailFrequency },
          { new: true, upsert: true, runValidators: true }
        );

        return res.status(200).json(updated);
      }

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Notification settings error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}