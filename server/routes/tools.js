const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const dotenv = require('dotenv');

dotenv.config();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// });

router.get('/', (req, res) => {
  res.render('tools', { result: null, letter: null });
});

router.post('/analyze', (req, res) => {
  const resume = req.body.resume || '';
  const job = req.body.job || '';

  // Extract words, normalize, and remove duplicates
  const resumeWords = [...new Set((resume.match(/\b\w+\b/g) || []).map(w => w.toLowerCase()))];
  const jobWords = [...new Set((job.match(/\b\w+\b/g) || []).map(w => w.toLowerCase()))];

  // Match logic
  const matching = jobWords.filter(word => resumeWords.includes(word));
  const missing = jobWords.filter(word => !resumeWords.includes(word));
  const score = jobWords.length ? Math.round((matching.length / jobWords.length) * 100) : 0;

  res.render('tools', {
    result: { score, missing },
    letter: null
  });
});

router.post('/coverletter', (req, res) => {
  const { name = 'Applicant', role = 'Developer', company = 'Company', intro = '' } = req.body;

  // Build cover letter using basic string template
  const letter = `
Dear ${company} Hiring Team,

My name is ${name}, and I am excited to apply for the ${role} position at ${company}. 
${intro || 'With several years of experience in related roles, I bring strong skills and a passion for making an impact.'}

I would love the opportunity to contribute to your team and support ${company}'s goals.

Thank you for your time and consideration.

Sincerely,  
${name}
`.trim();

  res.render('tools', {
    result: null,
    letter
  });
});

module.exports = router;
