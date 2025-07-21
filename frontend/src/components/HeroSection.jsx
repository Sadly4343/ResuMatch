import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10 px-4 max-w-4xl mx-auto'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>
                    No. 1 Job Hunt Website
                </span>

                <h1 className='text-5xl font-bold leading-tight'>
                    Search, Apply &<br />Get Your <span className='text-[#6A38C2]'>Dream Jobs</span>
                </h1>

                <div className='text-left text-gray-700 mt-4 space-y-4'>
                    <h2 className='text-xl font-semibold'>🧑‍💻 Job Title: Technology Professional / IT Specialist</h2>
                    <p>
                        We are actively seeking skilled and passionate technology professionals across various domains
                        to join our innovative and fast-growing organization. Whether you're a software engineer,
                        data scientist, network administrator, DevOps engineer, or UI/UX designer — we welcome talent
                        driven by impact and innovation.
                    </p>

                    <h3 className='font-semibold'>Available Roles Include:</h3>
                    <ul className='list-disc list-inside'>
                        <li>Frontend / Backend / Full Stack Developers</li>
                        <li>Mobile App Developers (iOS/Android)</li>
                        <li>DevOps & Cloud Engineers</li>
                        <li>Data Scientists & Analysts</li>
                        <li>Cybersecurity Specialists</li>
                        <li>Network & Systems Administrators</li>
                        <li>QA/Test Engineers</li>
                        <li>UI/UX Designers</li>
                        <li>IT Support & Helpdesk Professionals</li>
                    </ul>

                    <h3 className='font-semibold'>Key Responsibilities (may vary by role):</h3>
                    <ul className='list-disc list-inside'>
                        <li>Design, build, and maintain technical systems and software solutions.</li>
                        <li>Collaborate with cross-functional teams to deliver high-quality products.</li>
                        <li>Analyze and troubleshoot technical issues and implement effective solutions.</li>
                        <li>Write efficient, reusable, and well-documented code or configurations.</li>
                        <li>Stay current with industry trends and continuously upgrade skills.</li>
                    </ul>

                    <h3 className='font-semibold'>Requirements:</h3>
                    <ul className='list-disc list-inside'>
                        <li>Degree/diploma in Computer Science, IT, or related field (or equivalent experience).</li>
                        <li>Strong analytical and problem-solving skills.</li>
                        <li>Proficiency in relevant technologies and platforms.</li>
                        <li>Good communication and teamwork skills.</li>
                        <li>Passion for technology and innovation.</li>
                    </ul>

                    <h3 className='font-semibold'>Preferred Qualifications:</h3>
                    <ul className='list-disc list-inside'>
                        <li>Industry certifications (e.g., AWS, Cisco, Google, Microsoft).</li>
                        <li>Experience with Agile/Scrum workflows.</li>
                        <li>Portfolio of previous projects or GitHub contributions.</li>
                    </ul>

                    <p className='italic text-sm text-gray-600'>
                        ✅ Note: Job responsibilities and qualifications will differ based on the specific role. Please refer
                        to individual job postings for more details.
                    </p>
                </div>

                <div className='flex w-full max-w-xl shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto mt-6'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full py-3'
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2] text-white px-6">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
