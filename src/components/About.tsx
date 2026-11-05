import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import {
  Layers,
  Globe,
  Database,
  Cpu,
  Server,
  Code2,
  Sparkles,
  Download,
  Eye,
  Briefcase,
  GraduationCap,
  Award,
} from 'lucide-react';
import CvPreviewModal from './CvPreviewModal.tsx';

interface WordSpanProps {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

function WordSpan({ children, progress, range }: WordSpanProps) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="text-black dark:text-white transition-colors duration-200">
      {children}
    </motion.span>
  );
}

function TextReveal({
  text,
  progress,
}: {
  text: string;
  progress: MotionValue<number>;
}) {
  const words = text.split(' ');
  return (
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.3] tracking-tight-custom text-black dark:text-white flex flex-wrap gap-x-[0.25em] gap-y-[0.1em]">
      {words.map((word, i) => {
        const start = (i / words.length) * 0.55;
        const end = start + (1 / words.length) * 0.55;
        return (
          <WordSpan key={i} progress={progress} range={[start, end]}>
            {word}
          </WordSpan>
        );
      })}
    </h2>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showCvModal, setShowCvModal] = useState(false);
  const cvFilePath = '/Muhire_Bagina_Christian_CV.pdf';
  const cvFallbackPath = '/assets/aistudio/Muhire_Bagina_Christian5CV_a0cd1b7f.pdf';

  const handleDownloadCv = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const targetPath = cvFilePath;
      const response = await fetch(targetPath);
      if (!response.ok) throw new Error('Primary not reachable');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Muhire_Bagina_Christian_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
    } catch {
      window.open(cvFallbackPath, '_blank');
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const fadeInVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        delay: custom,
      },
    }),
  };

  const services = [
    {
      title: 'Full-Stack Development',
      desc: 'End-to-end engineering from reactive frontends to high-throughput backend services.',
      icon: Layers,
    },
    {
      title: 'Web Development',
      desc: 'Performant, accessible, and responsive modern web experiences crafted with React & Vite.',
      icon: Globe,
    },
    {
      title: 'Business Management Systems',
      desc: 'Tailored enterprise software, inventory systems, and operational workflow platforms.',
      icon: Server,
    },
    {
      title: 'Database Development',
      desc: 'Robust relational and document schemas utilizing MySQL, PostgreSQL, and MongoDB.',
      icon: Database,
    },
    {
      title: 'API Development',
      desc: 'RESTful architectures, microservices, and secure third-party integrations with Node & Express.',
      icon: Code2,
    },
    {
      title: 'AI-Powered Applications',
      desc: 'Intelligent automation, natural language workflows, and machine learning model integration.',
      icon: Cpu,
    },
  ];

  const experienceTimeline = [
    {
      period: '2026',
      title: 'EjoLabs Summer Talent Program',
      role: 'Selected Participant & Emerging Tech Fellow',
      organization: 'EjoLabs Initiative • Kigali, Rwanda',
      description:
        'Selected for an intensive technology development program focused on applied Artificial Intelligence, neural networks, collaborative hackathons, and practical digital product engineering.',
      icon: Sparkles,
      highlight: 'Applied AI & Emerging Technologies',
    },
    {
      period: '2024 – 2025',
      title: 'Software Development Training & Teaching Experience',
      role: 'Technology Trainer & Facilitator',
      organization: 'CA TechWorks & Technical Training Seminars',
      description:
        'Supported digital literacy and software education for youth. Delivered practical instruction in programming fundamentals, React.js frontend architecture, Express.js REST APIs, and MySQL relational schemas.',
      icon: Briefcase,
      highlight: 'Technical Education & Mentorship',
    },
    {
      period: '2024 – 2025',
      title: 'Technical & Professional Certifications',
      role: 'Certified Competencies',
      organization: 'Cisco Networking Academy & University of Helsinki / MinnaLearn',
      description:
        'Earned accredited qualifications: Cisco Networking & Systems (routing, IP architectures, security) and Elements of AI (foundations of machine learning, neural networks, and probability).',
      icon: Award,
      highlight: 'Networks, Security & AI',
    },
    {
      period: 'Sept 2022 – July 2025',
      title: 'Secondary Technical Education — Software Development',
      role: 'TVET Level 5 Graduate',
      organization: 'Lycee Saint Alexandre Sauli De Muhura',
      description:
        'Three years of intensive technical curriculum in software engineering, data structures, algorithms, relational database design, and object-oriented principles. Graduated with 70% in national examinations with honors.',
      icon: GraduationCap,
      highlight: 'National Examination Honors',
    },
  ];

  const codevSpecializations = [
    {
      title: 'Full-Stack Software Development',
      desc: 'Building responsive, scalable web and desktop applications engineered with React.js, Node.js, Express.js, TypeScript, and modern Tailwind CSS.',
      icon: Layers,
    },
    {
      title: 'AI-Powered Solutions',
      desc: 'Developing intelligent systems, generative AI integrations, and practical machine learning applications tailored to solve tangible problems.',
      icon: Cpu,
    },
    {
      title: 'Business Management Systems',
      desc: 'Designing end-to-end operational software, warehouse inventory tracking, sales automation, and institutional workflows for African SMEs.',
      icon: Server,
    },
    {
      title: 'Digital Innovation',
      desc: 'Leveraging modern software architecture, APIs, and agile practices to replace paper-bound processes with fast, resilient digital tools.',
      icon: Globe,
    },
    {
      title: 'Solutions for African Communities',
      desc: 'Creating accessible, localized technologies that empower Rwandan and regional businesses, foster digital inclusion, and generate youth opportunities.',
      icon: Sparkles,
    },
    {
      title: 'Scalable Databases & Cloud Infrastructure',
      desc: 'Designing secure, normalized database architectures using MySQL, PostgreSQL, and MongoDB alongside resilient cloud APIs.',
      icon: Database,
    },
  ];

  return (
    <section id="about" className="bg-[#fafafa] dark:bg-[#0c0d0e] relative z-10 border-t hairline transition-colors duration-300">
      {/* Desktop 250vh Sticky Text Reveal Section */}
      <div ref={containerRef} className="hidden lg:block" style={{ height: '250vh' }}>
        <div className="sticky top-0 h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.8 }}
            >
              <span className="text-xs tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 font-medium">
                01 / About
              </span>
            </motion.div>
            <div className="lg:col-span-9">
              <TextReveal
                text="Hey there! I'm Muhire Christian, a software developer from Rwanda passionate about building practical digital solutions through software engineering, full-stack development and artificial intelligence."
                progress={scrollYProgress}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Compact About Presentation (Immediate Visibility without Empty Vertical Gaps) */}
      <div className="block lg:hidden pt-12 sm:pt-16 pb-6 px-6 sm:px-10 max-w-[1400px] mx-auto">
        <div className="mb-3">
          <span className="text-xs tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 font-medium">
            01 / About
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.3] tracking-tight-custom text-black dark:text-white">
          Hey there! I&apos;m <span className="font-semibold text-black dark:text-white">Muhire Christian</span>, a software developer from Rwanda passionate about building practical digital solutions through software engineering, full-stack development and artificial intelligence.
        </h2>
      </div>

      {/* Narrative & Details Section */}
      <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto pb-32 lg:pb-48">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid lg:grid-cols-12 gap-12 lg:gap-20"
        >
          <div className="lg:col-span-3 hidden lg:block" />
          <div className="lg:col-span-9">
            {/* Two Narrative Paragraphs */}
            <motion.div
              className="grid md:grid-cols-2 gap-12"
              custom={0.1}
              variants={fadeInVariants}
            >
              <div>
                <p className="text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed">
                  My journey in tech began with intensive studies in Software Development at
                  <strong className="text-black dark:text-white"> Lycee Saint Alexandre Sauli De Muhura</strong> (Technical and Vocational
                  Education and Training &ndash; TVET Level 5, September 2022 – July 2025). There, I built
                  a strong foundation in data structures, algorithms, relational databases, and full-stack
                  engineering, graduating with top honors in national examinations.
                </p>
              </div>
              <div>
                <p className="text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed">
                  Through hands-on software development, technology training at CA TechWorks, and mentoring
                  activities including the <strong className="text-black dark:text-white">EjoLabs Summer Talent Program 2026</strong>, I champion
                  clean code, minimal design, and experiences that feel effortless. Whether deploying React,
                  Node.js, Express, Python, or AI-assisted solutions, I am driven to build practical software
                  that solves real problems.
                </p>
              </div>
            </motion.div>

            {/* Core Services Grid */}
            <motion.div
              className="mt-16 pt-16 border-t hairline"
              custom={0.2}
              variants={fadeInVariants}
            >
              <div className="mb-10">
                <span className="text-xs tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 block mb-3 font-medium">
                  What I Do
                </span>
                <h3 className="text-2xl md:text-3xl font-normal text-black dark:text-white tracking-tight-custom">
                  Services & Solutions
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <div
                      key={service.title}
                      className="p-6 border hairline bg-white dark:bg-neutral-900/70 rounded-xl hover:border-black dark:hover:border-white transition-all duration-300 group shadow-xs hover:shadow-md"
                    >
                      <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-200 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors mb-5">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-medium text-black dark:text-white mb-2">
                        {service.title}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Professional Experience & Achievements Timeline */}
            <motion.div
              className="mt-16 pt-16 border-t hairline"
              custom={0.25}
              variants={fadeInVariants}
            >
              <div className="mb-10">
                <span className="text-xs tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 block mb-3 font-medium">
                  Trajectory & Background
                </span>
                <h3 className="text-2xl md:text-3xl font-normal text-black dark:text-white tracking-tight-custom">
                  Experience & Key Milestones
                </h3>
              </div>

              <div className="relative pl-6 sm:pl-8 border-l hairline space-y-10">
                {experienceTimeline.map((item, index) => {
                  const ItemIcon = item.icon;
                  return (
                    <div key={index} className="relative group">
                      {/* Timeline dot */}
                      <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full border hairline bg-white dark:bg-neutral-900 flex items-center justify-center group-hover:border-black dark:group-hover:border-white transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 group-hover:bg-black dark:group-hover:bg-white transition-colors" />
                      </div>

                      <div className="p-6 rounded-2xl border hairline bg-white dark:bg-neutral-900/70 shadow-xs hover:border-black dark:hover:border-white transition-all duration-300">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                            {item.period}
                          </span>
                          <span className="px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border hairline">
                            {item.highlight}
                          </span>
                        </div>

                        <div className="flex items-center gap-2.5 mb-1.5">
                          <ItemIcon className="w-4 h-4 text-black dark:text-white shrink-0" />
                          <h4 className="text-lg font-medium text-black dark:text-white">
                            {item.title}
                          </h4>
                        </div>

                        <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                          {item.role} &mdash; <span className="text-neutral-500 dark:text-neutral-400">{item.organization}</span>
                        </p>

                        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* My Vision for Codev – Building Technology That Matters */}
            <motion.div
              className="mt-16 pt-16 border-t hairline"
              custom={0.3}
              variants={fadeInVariants}
            >
              <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white relative overflow-hidden border border-neutral-800 shadow-xl">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span className="text-xs tracking-[0.2em] uppercase text-neutral-400 font-medium">
                      Long-Term Entrepreneurial Ambition
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-white mb-6">
                    My Vision for Codev –{' '}
                    <span className="text-neutral-400">
                      Building Technology That Matters
                    </span>
                  </h3>

                  <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-3xl mb-8 font-normal">
                    My long-term ambition is to establish <strong>Codev</strong> as an innovative technology company
                    dedicated to developing high-impact digital solutions that solve real-world problems and
                    advance Rwanda&apos;s and Africa&apos;s digital transformation.
                  </p>

                  <div className="mb-8">
                    <span className="text-xs tracking-[0.15em] uppercase text-neutral-400 font-semibold block mb-4">
                      Strategic Focus Areas I Envision For Codev:
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {codevSpecializations.map((item) => {
                        const ItemIcon = item.icon;
                        return (
                          <div
                            key={item.title}
                            className="p-5 rounded-2xl bg-neutral-800/70 border border-neutral-700/60 hover:border-neutral-500 transition-colors"
                          >
                            <div className="w-8 h-8 rounded-lg bg-neutral-700/50 flex items-center justify-center text-amber-300 mb-3">
                              <ItemIcon className="w-4 h-4" />
                            </div>
                            <h4 className="text-sm font-semibold text-white mb-1.5">
                              {item.title}
                            </h4>
                            <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                              {item.desc}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 rounded-2xl bg-neutral-800/40 border border-neutral-700/50 relative">
                    <p className="text-neutral-300 leading-relaxed text-sm sm:text-base font-normal">
                      &ldquo;My ambition is to grow Codev into a company that empowers businesses,
                      improves people&apos;s lives through technology, creates employment opportunities
                      for young people, and contributes to Rwanda&apos;s digital transformation.
                      <br />
                      <br />
                      I believe education, creativity, innovation, and determination will help me turn
                      this vision into reality. I do not simply want to become a software developer; I
                      want to become a technology entrepreneur who builds solutions that make a
                      difference.&rdquo;
                    </p>
                    <p className="mt-4 text-xs font-mono tracking-widest text-neutral-400 uppercase">
                      &mdash; Muhire Bagina Christian
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Resume & CV Section */}
            <motion.div
              className="mt-12 flex flex-wrap items-center gap-4"
              custom={0.4}
              variants={fadeInVariants}
            >
              {/* Primary Download Button */}
              <button
                type="button"
                onClick={handleDownloadCv}
                className="inline-flex items-center gap-3 px-8 py-4 border border-black dark:border-white rounded-full text-sm font-medium text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 group cursor-pointer"
              >
                <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                <span>Download Official CV (PDF)</span>
              </button>

              {/* In-Browser Preview Button */}
              <button
                type="button"
                onClick={() => setShowCvModal(true)}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full border hairline text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white bg-white dark:bg-neutral-900 transition-all duration-300 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>Preview CV</span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* CV Interactive Preview Modal */}
      <CvPreviewModal
        isOpen={showCvModal}
        onClose={() => setShowCvModal(false)}
        pdfUrl={cvFilePath}
      />
    </section>
  );
}
