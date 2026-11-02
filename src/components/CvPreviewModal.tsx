import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Download,
  ExternalLink,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface CvPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

export default function CvPreviewModal({
  isOpen,
  onClose,
  pdfUrl,
}: CvPreviewModalProps) {
  const [viewMode, setViewMode] = useState<'digital' | 'pdf'>('digital');
  const [downloading, setDownloading] = useState(false);

  // Keyboard escape listener & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch(pdfUrl);
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
      // Fallback: direct window open
      window.open(pdfUrl, '_blank');
    } finally {
      setTimeout(() => setDownloading(false), 800);
    }
  };

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          className="relative w-full max-w-4xl h-[92vh] sm:h-[88vh] bg-[#fafafa] dark:bg-[#0c0d0e] rounded-3xl shadow-2xl border hairline flex flex-col overflow-hidden z-20 my-auto transition-colors duration-300"
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b hairline bg-white dark:bg-neutral-900 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-black dark:text-white">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white leading-tight">
                  Muhire Bagina Christian &mdash; Official CV
                </h3>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
                  Kigali, Rwanda &bull; Software Developer &bull; Level 5 TVET
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Tab Switcher */}
              <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setViewMode('digital')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    viewMode === 'digital'
                      ? 'bg-white dark:bg-neutral-700 text-black dark:text-white shadow-xs font-semibold'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  Digital View
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('pdf')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    viewMode === 'pdf'
                      ? 'bg-white dark:bg-neutral-700 text-black dark:text-white shadow-xs font-semibold'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  Raw PDF
                </button>
              </div>

              {/* Download Button */}
              <button
                type="button"
                onClick={handleDownload}
                disabled={downloading}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors cursor-pointer"
                title="Download PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {downloading ? 'Downloading...' : 'Download'}
                </span>
              </button>

              {/* Open in Tab */}
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                title="Open PDF in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-10">
            {viewMode === 'digital' ? (
              /* High-fidelity responsive CV paper layout matching user PDF 100% */
              <div className="max-w-3xl mx-auto bg-white dark:bg-neutral-900/90 rounded-2xl p-6 sm:p-10 shadow-sm border hairline font-sans text-neutral-900 dark:text-neutral-100 space-y-8">
                {/* Header */}
                <div className="border-b hairline pb-6 text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-1">
                    MUHIRE BAGINA CHRISTIAN
                  </h1>
                  <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-600 dark:text-neutral-400 mb-3">
                    ASPIRING COMPUTER SCIENTIST | SOFTWARE DEVELOPER | AI ENTHUSIAST
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                    <span>Kigali, Rwanda</span>
                    <span>&bull;</span>
                    <a href="tel:+250790865408" className="hover:text-black dark:hover:text-white font-mono">
                      +250 790 865 408
                    </a>
                    <span>&bull;</span>
                    <a href="mailto:christianbagina@gmail.com" className="hover:text-black dark:hover:text-white">
                      christianbagina@gmail.com
                    </a>
                    <span>&bull;</span>
                    <a
                      href="https://github.com/muhirechristian"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-black dark:hover:text-white font-medium"
                    >
                      github.com/muhirechristian
                    </a>
                  </div>
                </div>

                {/* Professional Summary */}
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 dark:text-white border-b-2 border-black dark:border-white pb-1 mb-3">
                    PROFESSIONAL SUMMARY
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    Motivated Rwandan software developer and aspiring Computer Science and
                    Artificial Intelligence student with a strong interest in building
                    technology-driven solutions to real-world challenges. Experienced in
                    developing web applications, working with modern JavaScript technologies,
                    relational databases, and AI-assisted development tools. Demonstrates
                    initiative through independent software projects, technology education,
                    and participation in emerging technology programs. Particularly interested in
                    artificial intelligence, software engineering, cybersecurity, and digital
                    transformation. Aspires to pursue undergraduate studies internationally,
                    develop advanced technical and research capabilities, and contribute to
                    Rwanda&apos;s growing digital economy through innovative technology solutions.
                  </p>
                </div>

                {/* Technical Expertise */}
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 border-b-2 border-black pb-1 mb-3">
                    TECHNICAL EXPERTISE
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-neutral-800">
                    <div>
                      <strong className="text-black">Programming:</strong> JavaScript, Python, Dart, HTML5, CSS3
                    </div>
                    <div>
                      <strong className="text-black">Frontend:</strong> React.js, React Native, Tailwind CSS, Bootstrap, TypeScript
                    </div>
                    <div>
                      <strong className="text-black">Backend:</strong> Node.js, Express.js, REST API development
                    </div>
                    <div>
                      <strong className="text-black">Databases:</strong> MySQL, SQL, MongoDB, Supabase
                    </div>
                    <div>
                      <strong className="text-black">Mobile Development:</strong> Flutter, React Native
                    </div>
                    <div>
                      <strong className="text-black">AI & Emerging Tech:</strong> AI fundamentals, Machine Learning, Generative AI
                    </div>
                    <div className="sm:col-span-2">
                      <strong className="text-black">Tools & Workflow:</strong> Git, GitHub, Postman, Figma, Visual Studio Code
                    </div>
                  </div>
                </div>

                {/* Selected Technical Projects */}
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 border-b-2 border-black pb-1 mb-4">
                    SELECTED TECHNICAL PROJECTS
                  </h2>
                  <div className="space-y-4 text-xs sm:text-sm">
                    {/* Project 1 */}
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-1 font-semibold text-neutral-900">
                        <span>SchoolOS – School Management Platform</span>
                        <span className="text-neutral-500 font-normal text-xs">
                          Independent Developer &bull; Rwanda
                        </span>
                      </div>
                      <ul className="list-disc list-inside text-neutral-700 mt-1.5 space-y-1 text-xs sm:text-sm leading-relaxed">
                        <li>Developing a digital school management platform designed to support educational institutions in Rwanda.</li>
                        <li>Designing a multi-school management architecture and developing interfaces with React, TypeScript, and Tailwind CSS.</li>
                        <li>Exploring database integration, secure authentication, and role-based access for administrators, teachers, parents, and students.</li>
                        <li>Developing concepts for student records, attendance, academic performance, and school fee management.</li>
                      </ul>
                    </div>

                    {/* Project 2 */}
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-1 font-semibold text-neutral-900">
                        <span>Dream – Web Development Project</span>
                        <span className="text-neutral-500 font-normal text-xs">
                          Live: dream-webiste.vercel.app
                        </span>
                      </div>
                      <ul className="list-disc list-inside text-neutral-700 mt-1.5 space-y-1 text-xs sm:text-sm leading-relaxed">
                        <li>Built and deployed a modern commercial ICT equipment platform with product discovery and quotes.</li>
                        <li>Applied responsive web development and modern interface design principles with React & Vite.</li>
                        <li>Used AI-assisted development workflows to support implementation and practiced independent problem-solving.</li>
                      </ul>
                    </div>

                    {/* Project 3 */}
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-1 font-semibold text-neutral-900">
                        <span>Independent Software Development</span>
                        <span className="text-neutral-500 font-normal text-xs">Personal Technical Development</span>
                      </div>
                      <ul className="list-disc list-inside text-neutral-700 mt-1.5 space-y-1 text-xs sm:text-sm leading-relaxed">
                        <li>Developed practical skills through independent coding, MERN ecosystem exploration, and REST APIs.</li>
                        <li>Explored cross-platform mobile application development using Flutter and React Native.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Leadership & Professional Experience */}
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 border-b-2 border-black pb-1 mb-4">
                    LEADERSHIP & PROFESSIONAL EXPERIENCE
                  </h2>
                  <div className="space-y-4 text-xs sm:text-sm">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-1 font-semibold text-neutral-900">
                        <span>EjoLabs Summer Talent Program</span>
                        <span className="text-neutral-500 font-normal text-xs">Selected Participant | 2026</span>
                      </div>
                      <ul className="list-disc list-inside text-neutral-700 mt-1 space-y-1 text-xs leading-relaxed">
                        <li>Selected for a technology development program focused on Artificial Intelligence and emerging technologies.</li>
                        <li>Engaged in practical technology learning and innovation-oriented activities.</li>
                        <li>Participated in collaborative learning and hackathon-related development.</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-1 font-semibold text-neutral-900">
                        <span>CA TechWorks</span>
                        <span className="text-neutral-500 font-normal text-xs">Technology Trainer / Instructor</span>
                      </div>
                      <ul className="list-disc list-inside text-neutral-700 mt-1 space-y-1 text-xs leading-relaxed">
                        <li>Supported technology education for children and introduced learners to programming and technology concepts.</li>
                        <li>Encouraged practical learning, problem-solving, and communication skills.</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-1 font-semibold text-neutral-900">
                        <span>Technical Training – React, Express & MySQL</span>
                        <span className="text-neutral-500 font-normal text-xs">Training Facilitator</span>
                      </div>
                      <ul className="list-disc list-inside text-neutral-700 mt-1 space-y-1 text-xs leading-relaxed">
                        <li>Delivered practical instruction in frontend and backend web development technologies.</li>
                        <li>Supported hands-on learning involving React, Express.js, and MySQL schemas.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 border-b-2 border-black pb-1 mb-3">
                    EDUCATION
                  </h2>
                  <div className="text-xs sm:text-sm text-neutral-800">
                    <p className="font-semibold text-black">Lycee Saint Alexandre Sauli De Muhura | Rwanda</p>
                    <p className="text-neutral-600">Secondary Education &ndash; Software Development (TVET Level 5)</p>
                    <p className="text-neutral-500 text-xs">
                      September 2022 – July 2025 &bull; Qualification: High School Diploma &bull; National examination result: 70%
                    </p>
                  </div>
                </div>

                {/* Certifications & Additional Learning */}
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 border-b-2 border-black pb-1 mb-3">
                    CERTIFICATIONS & ADDITIONAL LEARNING
                  </h2>
                  <ul className="list-disc list-inside text-xs sm:text-sm text-neutral-700 space-y-1">
                    <li>Cisco Technology Training Certificate.</li>
                    <li>Elements of AI – Introduction to Artificial Intelligence (University of Helsinki & MinnaLearn).</li>
                    <li>Blockchain-related training and applied smart contract research.</li>
                    <li>Independent professional development in full-stack software engineering and emerging technologies.</li>
                  </ul>
                </div>

                {/* Languages */}
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 border-b-2 border-black pb-1 mb-2">
                    LANGUAGES
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-700">
                    Kinyarwanda &ndash; Native &bull; English &ndash; Working proficiency &bull; French &ndash; Basic proficiency
                  </p>
                </div>

                {/* Personal Motivation */}
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 border-b-2 border-black pb-1 mb-2">
                    PERSONAL MOTIVATION
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic">
                    &ldquo;My ambition is to become a technology innovator capable of developing solutions
                    that address meaningful challenges in society. Growing up in Rwanda has strengthened
                    my interest in the role of technology in education, economic development, and social
                    transformation. I believe studying Computer Science and Artificial Intelligence in an
                    international academic environment will allow me to expand my knowledge, gain research
                    experience, collaborate with people from different backgrounds, and contribute to
                    Rwanda&apos;s technological future.&rdquo;
                  </p>
                </div>
              </div>
            ) : (
              /* Raw PDF Viewer */
              <div className="w-full h-full min-h-[500px] flex flex-col">
                <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center justify-between gap-3">
                  <span>
                    Note: If your mobile browser cannot preview raw PDF files directly in an iframe, use the <strong>Digital View</strong> tab above or tap <strong>Download</strong>.
                  </span>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="underline font-semibold shrink-0 cursor-pointer"
                  >
                    Download PDF
                  </button>
                </div>
                <iframe
                  src={pdfUrl}
                  title="Muhire Christian CV PDF"
                  className="w-full flex-1 min-h-[500px] rounded-2xl border hairline bg-white"
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
