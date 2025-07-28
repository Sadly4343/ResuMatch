import { NextRequest, NextResponse } from "next/server";

  

export async function POST(req: NextRequest) {

const { resume = "", job = "" } = await req.json();

 // Extract words, normalize, and remove duplicates
  const resumeWords = [...new Set((resume.match(/\b\w+\b/g) || []).map((w: string) => w.toLowerCase()))];
  const jobWords = [...new Set((job.match(/\b\w+\b/g) || []).map((w: string) => w.toLowerCase()))];

  // Match logic
  const matching = jobWords.filter(word => resumeWords.includes(word));
  const missing = jobWords.filter(word => !resumeWords.includes(word));
  const score = jobWords.length ? Math.round((matching.length / jobWords.length) * 100) : 0;


  return NextResponse.json({ score, missing });
}
