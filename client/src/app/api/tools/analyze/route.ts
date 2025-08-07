/**
 * Resume Analysis API Route - Created by Halle Cooper
 * Analyzes resume content against job descriptions using keyword matching and AI
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { resume = '', job = '' } = await req.json();

    if (!resume || !job) {
      return NextResponse.json(
        { error: "Both resume and job description are required" },
        { status: 400 }
      );
    }

    const resumeWords = [...new Set(
      (resume.match(/\b\w+\b/g) || [])
        .map((w: string) => w.toLowerCase())
        .filter((w: string) => w.length > 2)
    )];

    const jobWords = [...new Set(
      (job.match(/\b\w+\b/g) || [])
        .map((w: string) => w.toLowerCase())
        .filter((w: string) => w.length > 2)
    )];

    const matching = jobWords.filter(word => resumeWords.includes(word));
    const missing = jobWords.filter(word => !resumeWords.includes(word));
    const score = jobWords.length ? Math.round((matching.length / jobWords.length) * 100) : 0;

    const enhancedSuggestions: string[] = [];
    const gaps: string[] = [];
    const revampRecommendations: string[] = [];
    const keywordsToAdd = missing.slice(0, 8);

    if (score < 30) {
      gaps.push('Low keyword match - consider adding more relevant skills and experiences');
    }
    if (score < 50) {
      gaps.push('Missing key qualifications - review job requirements and add relevant experience');
    }
    if (resumeWords.length < 100) {
      gaps.push('Resume appears too brief - consider adding more detailed descriptions');
    }

    if (score < 70) {
      enhancedSuggestions.push(`Add these key terms to your resume: ${missing.slice(0, 5).join(', ')}`);
    }
    if (matching.length < 5) {
      enhancedSuggestions.push('Include more specific skills and technologies mentioned in the job description');
    }
    if (resumeWords.length < 150) {
      enhancedSuggestions.push('Expand your experience descriptions with quantifiable achievements');
    }
    enhancedSuggestions.push('Use action verbs and industry-specific terminology');
    enhancedSuggestions.push('Highlight relevant projects and accomplishments');

    if (score < 60) {
      revampRecommendations.push('Restructure your resume to prioritize relevant experience');
      revampRecommendations.push('Add a skills section highlighting key technologies and tools');
    }
    if (missing.length > 10) {
      revampRecommendations.push('Rewrite job descriptions to include more relevant keywords');
    }
    revampRecommendations.push('Ensure your summary/objective aligns with the job requirements');

    const aiAnalysis = {
      gaps: gaps.length > 0 ? gaps : ['No major gaps identified'],
      suggestions: enhancedSuggestions,
      revampRecommendations: revampRecommendations,
      keywordsToAdd: keywordsToAdd
    };

    return NextResponse.json({
      score,
      matching: matching.slice(0, 10),
      missing: missing.slice(0, 10),
      aiAnalysis,
      stats: {
        resumeWords: resumeWords.length,
        jobWords: jobWords.length,
        matches: matching.length
      }
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze resume' },
      { status: 500 }
    );
  }
}