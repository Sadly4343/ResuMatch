const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// });

// Cover letter generator endpoint
router.post('/coverletter', (req, res) => {
  const { name = 'Applicant', role = 'Developer', company = 'Company', intro = '' } = req.body;

  // Build cover letter using template
  const letter = `
Dear ${company} Hiring Team,

My name is ${name}, and I am excited to apply for the ${role} position at ${company}. 
${intro || 'With several years of experience in related roles, I bring strong skills and a passion for making an impact.'}

I would love the opportunity to contribute to your team and support ${company}'s goals.

Thank you for your time and consideration.

Sincerely,  
${name}
`.trim();

  res.json({ letter });
});

// Resume analysis endpoint
router.post('/analyze', async (req, res) => {
  const { resume = '', job = '' } = req.body;

  if (!resume || !job) {
    return res.status(400).json({ 
      error: 'Both resume and job description are required' 
    });
  }

  try {
    // Basic keyword analysis
    const resumeWords = [...new Set(
      (resume.match(/\b\w+\b/g) || [])
        .map(w => w.toLowerCase())
        .filter(w => w.length > 2)
    )];
    
    const jobWords = [...new Set(
      (job.match(/\b\w+\b/g) || [])
        .map(w => w.toLowerCase())
        .filter(w => w.length > 2)
    )];

    const matching = jobWords.filter(word => resumeWords.includes(word));
    const missing = jobWords.filter(word => !resumeWords.includes(word));
    const score = jobWords.length ? Math.round((matching.length / jobWords.length) * 100) : 0;

    // Enhanced basic analysis (works without AI)
    const enhancedSuggestions = [];
    const gaps = [];
    const revampRecommendations = [];
    const keywordsToAdd = missing.slice(0, 8); // Top missing keywords

    // Gap analysis based on common job requirements
    if (score < 30) {
      gaps.push('Low keyword match - consider adding more relevant skills and experiences');
    }
    if (score < 50) {
      gaps.push('Missing key qualifications - review job requirements and add relevant experience');
    }
    if (resumeWords.length < 100) {
      gaps.push('Resume appears too brief - consider adding more detailed descriptions');
    }

    // Smart suggestions based on analysis
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

    // Revamp recommendations
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

    res.json({
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
    res.status(500).json({ error: 'Failed to analyze resume' });
  }
});

module.exports = router; 
