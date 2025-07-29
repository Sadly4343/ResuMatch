import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { name = 'Applicant', role = 'Developer', company = 'Company', intro = '' } = req.body;

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
}