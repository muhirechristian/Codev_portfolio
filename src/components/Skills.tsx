import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Award,
  Compass,
  Users,
  Sparkles,
  Layout,
  Server,
  Smartphone,
  Database,
  Cpu,
  Wrench,
  Target,
} from 'lucide-react';
import CertificateModal, { CertificateData } from './CertificateModal.tsx';

export default function Skills() {
  const [selectedCert, setSelectedCert] = useState<CertificateData | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');

  const certificates: CertificateData[] = [
    {
      id: 'cisco',
      name: 'Cisco Networking & Systems',
      issuer: 'Cisco Networking Academy',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/networkx/networkx-original.svg',
      issueDate: '2024',
      credentialId: 'CISCO-NA-2024-RW',
      certLink: 'https://www.netacad.com/',
      skills: ['Network Architecture', 'IP Addressing & Subnetting', 'Routing Protocols', 'Network Security', 'Troubleshooting'],
      description: 'Comprehensive certification in computer networks, routing, switching, system security, and infrastructure administration from Cisco Networking Academy.',
    },
    {
      id: 'elements-ai',
      name: 'Elements of AI',
      issuer: 'University of Helsinki & MinnaLearn',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      issueDate: '2024',
      credentialId: 'EOAI-UH-948124',
      certLink: 'https://www.elementsofai.com/',
      skills: ['Machine Learning Fundamentals', 'Neural Networks', 'Probability & Search', 'Bayesian Logic', 'Societal AI Implications'],
      description: 'Accredited international qualification covering foundational machine learning algorithms, deep neural network concepts, and real-world AI applications.',
    },
    {
      id: 'tvet-software',
      name: 'Secondary Education – Software Development',
      issuer: 'Lycee Saint Alexandre Sauli De Muhura | TVET Level 5',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      issueDate: 'July 2025',
      credentialId: 'TVET-L5-MUHURA-2025',
      skills: ['Full-Stack Systems', 'Relational Databases (MySQL, PostgreSQL)', 'API Architecture', 'OOP Principles', 'Software Lifecycle'],
      description: 'Secondary Education in Software Development (Sept 2022 – July 2025) at Lycee Saint Alexandre Sauli De Muhura. Graduated with 70% in national examinations.',
    },
    {
      id: 'ejolabs-fellow',
      name: 'EjoLabs Summer Talent Fellow',
      issuer: 'EjoLabs Tech Initiative & Emerging Tech',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      issueDate: '2026',
      credentialId: 'EJOLABS-STP-2026-MC',
      certLink: 'https://github.com/muhirechristian',
      skills: ['Applied AI Engineering', 'React Architecture', 'Youth Mentorship', 'Product Delivery', 'Collaborative Hackathons'],
      description: 'Selected participant in technology development program focused on Artificial Intelligence and emerging technologies.',
    },
  ];

  // Detailed Categorized Expertise
  const skillCategories = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      icon: Layout,
      skills: [
        'React.js',
        'JavaScript (ES6+)',
        'TypeScript',
        'HTML5 & CSS3',
        'Tailwind CSS',
        'Bootstrap',
        'Figma (UI/UX Design)',
      ],
    },
    {
      id: 'backend',
      title: 'Backend Development',
      icon: Server,
      skills: [
        'Node.js',
        'Express.js',
        'RESTful APIs',
        'Python',
        'PHP',
      ],
    },
    {
      id: 'mobile',
      title: 'Mobile Development',
      icon: Smartphone,
      skills: [
        'React Native',
        'Flutter',
        'Dart',
      ],
    },
    {
      id: 'databases',
      title: 'Databases',
      icon: Database,
      skills: [
        'MySQL',
        'PostgreSQL',
        'MongoDB',
        'Supabase',
      ],
    },
    {
      id: 'ai',
      title: 'Artificial Intelligence & Machine Learning',
      icon: Cpu,
      skills: [
        'Python for AI & ML',
        'AI-Powered Application Development',
        'Machine Learning Fundamentals',
        'Generative AI Integration',
      ],
    },
    {
      id: 'tools',
      title: 'Tools & Technologies',
      icon: Wrench,
      skills: [
        'Git & GitHub',
        'Postman',
        'Vercel',
        'Firebase',
        'VS Code',
      ],
    },
  ];

  // Core Areas of Interest
  const areasOfInterest = [
    'Software Engineering',
    'Artificial Intelligence',
    'Cybersecurity',
    'Cloud Computing',
    'Data Science',
    'Blockchain Technology',
    'Technology Entrepreneurship',
  ];

  // Core Tech Stack for Continuous Marquee
  const coreStack = [
    { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'JavaScript (ES6+)', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
    { name: 'Dart', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    { name: 'Git & GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
    { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
    { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
    { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
    { name: 'AI & Machine Learning', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  ];

  // Professional capabilities matching reference structure
  const capabilities = [
    {
      title: 'Leadership & Strategy',
      icon: <Compass className="w-5 h-5" />,
      skills: [
        'Vision Setting',
        'Strategic Architecture',
        'Decision Making',
        'System Ownership',
        'Project Scoping',
      ],
    },
    {
      title: 'Team & Collaboration',
      icon: <Users className="w-5 h-5" />,
      skills: [
        'Client Communication',
        'Developer Mentorship',
        'Technical Training',
        'Code Reviews',
        'Cross-Functional Alignment',
      ],
    },
    {
      title: 'Creative & Analytical',
      icon: <Sparkles className="w-5 h-5" />,
      skills: [
        'Complex Problem-Solving',
        'Critical Thinking',
        'API Design & Optimization',
        'Growth Mindset',
        'Continuous Adaptability',
      ],
    },
  ];

  const fadeVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        delay,
      },
    }),
  };

  const halfIndex = Math.ceil(coreStack.length / 2);
  const row1 = coreStack.slice(0, halfIndex);
  const row2 = coreStack.slice(halfIndex);

  const filteredCategories =
    activeTab === 'all'
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === activeTab);

  return (
    <section
      id="skills"
      className="bg-[#fafafa] dark:bg-[#0c0d0e] py-24 lg:py-48 border-t hairline overflow-x-hidden transition-colors duration-300"
    >
      <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {/* Section Header */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-20 mb-20 lg:mb-32">
            <motion.div className="lg:col-span-3" custom={0} variants={fadeVariants}>
              <span className="text-xs tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 font-medium">
                02 / Skills
              </span>
            </motion.div>
            <motion.div className="lg:col-span-9" custom={0.1} variants={fadeVariants}>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black dark:text-white leading-tight">
                Technologies & <br className="hidden md:block" />
                Expertise.
              </h2>
            </motion.div>
          </div>

          {/* Verified Credentials */}
          <motion.div className="mb-24 lg:mb-32" custom={0.2} variants={fadeVariants}>
            <div className="flex items-center gap-3 mb-8 lg:mb-10">
              <Award className="text-black dark:text-white w-5 h-5" />
              <p className="text-xs tracking-[0.2em] uppercase text-black dark:text-white font-semibold">
                Verified Credentials
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-t hairline">
              {certificates.map((cert) => (
                <button
                  key={cert.name}
                  onClick={() => setSelectedCert(cert)}
                  className="group p-8 lg:p-10 border-r border-b hairline bg-white dark:bg-neutral-900/60 transition-colors duration-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-left focus:outline-none cursor-pointer"
                >
                  <div className="flex flex-col items-start">
                    <img
                      src={cert.icon}
                      alt={cert.name}
                      className="w-8 h-8 lg:w-10 lg:h-10 mb-6 lg:mb-8 object-contain"
                    />
                    <h4 className="text-base lg:text-lg font-medium text-black dark:text-white mb-1">
                      {cert.name}
                    </h4>
                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-widest group-hover:text-black dark:group-hover:text-white transition-colors">
                      View Certificate →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Domain Breakdown: 6 Technical Pillars */}
          <motion.div className="mb-24 lg:mb-32" custom={0.25} variants={fadeVariants}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-xs tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 block mb-3 font-medium">
                  Technical Architecture
                </span>
                <h3 className="text-2xl md:text-3xl font-normal text-black dark:text-white tracking-tight-custom">
                  Domain Competencies
                </h3>
              </div>

              {/* Category Filter Controls */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-200/60 dark:bg-neutral-900 rounded-xl border hairline">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    activeTab === 'all'
                      ? 'bg-white dark:bg-neutral-800 text-black dark:text-white shadow-xs font-semibold'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  All Domains
                </button>
                {skillCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      activeTab === cat.id
                        ? 'bg-white dark:bg-neutral-800 text-black dark:text-white shadow-xs font-semibold'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {cat.title.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((cat) => {
                const IconComponent = cat.icon;
                return (
                  <div
                    key={cat.id}
                    className="p-8 border hairline bg-white dark:bg-neutral-900/60 rounded-2xl hover:border-black dark:hover:border-white transition-all duration-300 group shadow-2xs hover:shadow-md flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-200 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors mb-6">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-semibold text-black dark:text-white mb-5 tracking-tight">
                        {cat.title}
                      </h4>
                      <ul className="space-y-3">
                        {cat.skills.map((skill) => (
                          <li
                            key={skill}
                            className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600 group-hover:bg-black dark:group-hover:bg-white transition-colors" />
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Core Areas of Interest Strip */}
          <motion.div
            className="mb-24 lg:mb-32 p-8 lg:p-12 border hairline bg-white dark:bg-neutral-900/60 rounded-3xl shadow-2xs"
            custom={0.28}
            variants={fadeVariants}
          >
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-5 h-5 text-black dark:text-white" />
              <span className="text-xs tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 font-semibold">
                Strategic Research & Focus
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-normal text-black dark:text-white tracking-tight mb-8">
              Core Areas of Interest
            </h3>

            <div className="flex flex-wrap gap-3">
              {areasOfInterest.map((area) => (
                <div
                  key={area}
                  className="px-5 py-3 border hairline rounded-full bg-neutral-50/80 dark:bg-neutral-800/80 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-black dark:hover:border-white transition-all duration-300 group cursor-default"
                >
                  <span className="text-xs sm:text-sm font-medium tracking-wide text-neutral-700 dark:text-neutral-200 group-hover:text-white dark:group-hover:text-black transition-colors">
                    {area}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Core Stack Marquee */}
          <motion.div
            className="mb-24 lg:mb-32 py-16 border-y hairline bg-white/50 dark:bg-neutral-900/30"
            custom={0.3}
            variants={fadeVariants}
          >
            <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 mb-10 px-0 font-medium text-center md:text-left">
              Core Stack
            </p>

            <div className="relative overflow-hidden -mx-6 md:-mx-12 lg:-mx-20">
              <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-linear-to-r from-[#fafafa] dark:from-[#0c0d0e] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-linear-to-l from-[#fafafa] dark:from-[#0c0d0e] to-transparent z-10 pointer-events-none" />

              {/* Row 1 Marquee */}
              <div className="marquee-container mb-6 overflow-hidden">
                <div className="marquee-content flex">
                  {[...row1, ...row1, ...row1].map((tech, idx) => (
                    <div
                      key={`row1-${tech.name}-${idx}`}
                      className="group flex items-center gap-3 px-6 py-3 lg:px-8 lg:py-4 mx-2 border hairline rounded-full bg-white dark:bg-neutral-900 hover:border-black dark:hover:border-white transition-all duration-300 shadow-2xs"
                    >
                      <img
                        src={tech.icon}
                        alt=""
                        className="w-4 h-4 lg:w-5 lg:h-5 grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all"
                      />
                      <span className="text-xs lg:text-sm font-medium text-neutral-600 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white whitespace-nowrap transition-colors">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2 Reverse Marquee */}
              <div className="marquee-container overflow-hidden">
                <div className="marquee-content-reverse flex">
                  {[...row2, ...row2, ...row2].map((tech, idx) => (
                    <div
                      key={`row2-${tech.name}-${idx}`}
                      className="group flex items-center gap-3 px-6 py-3 lg:px-8 lg:py-4 mx-2 border hairline rounded-full bg-white dark:bg-neutral-900 hover:border-black dark:hover:border-white transition-all duration-300 shadow-2xs"
                    >
                      <img
                        src={tech.icon}
                        alt=""
                        className="w-4 h-4 lg:w-5 lg:h-5 grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all"
                      />
                      <span className="text-xs lg:text-sm font-medium text-neutral-600 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white whitespace-nowrap transition-colors">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Strategic & Team Capabilities */}
          <motion.div custom={0.4} variants={fadeVariants} className="mb-12">
            <div className="mb-12">
              <span className="text-xs tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 block mb-4 font-medium">
                Professional
              </span>
              <h3 className="text-3xl lg:text-4xl font-normal text-black dark:text-white tracking-tight leading-tight">
                Strategic & Team <br className="hidden md:block" />
                Capabilities.
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {capabilities.map((cap, idx) => (
                <div
                  key={idx}
                  className="p-8 border-l hairline group hover:bg-white dark:hover:bg-neutral-900/60 transition-all duration-500 rounded-r-2xl"
                >
                  <div className="text-neutral-400 dark:text-neutral-500 group-hover:text-black dark:group-hover:text-white transition-colors mb-6">
                    {cap.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-black dark:text-white mb-6 tracking-tight">
                    {cap.title}
                  </h4>
                  <ul className="space-y-4">
                    {cap.skills.map((skill) => (
                      <li key={skill} className="flex items-center gap-3">
                        <div className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600 group-hover:bg-black dark:group-hover:bg-white transition-colors" />
                        <span className="text-sm text-neutral-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white font-normal transition-colors">
                          {skill}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
}
