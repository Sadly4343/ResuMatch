// src/app/api/notifications/route.ts
import { NextRequest, NextResponse } from "next/server";
import NotificationSettings from "@/lib/models/NotificationSettings";
import { Types } from "mongoose";
import { connectDB } from "@/lib/mongoose"; // make sure you're connecting to the DB

// Temporary mock user ID — replace with session-based ID later
const mockUserId = new Types.ObjectId("507f1f77bcf86cd799439011");

export async function GET() {
  await connectDB();
  try {
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
        emailFrequency: "daily",
      });
      await settings.save();
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Notification settings GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  await connectDB();
  try {
    const { settings, emailFrequency } = await req.json();

    const updated = await NotificationSettings.findOneAndUpdate(
      { user: mockUserId },
      { settings, emailFrequency },
      { new: true, upsert: true, runValidators: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Notification settings PUT error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}