import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  AlertCircle,
  Code,
} from 'lucide-react';

export interface ProjectCaseStudyData {
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  link: string;
  githubUrl?: string;
  problem: string;
  technologies: string[];
  contribution: string[];
  metricsOrHighlights?: string[];
}

interface ProjectCaseStudyModalProps {
  project: ProjectCaseStudyData | null;
  onClose: () => void;
}

export default function ProjectCaseStudyModal({
  project,
  onClose,
}: ProjectCaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project || typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
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
          className="relative w-full max-w-3xl max-h-[90vh] bg-[#fafafa] dark:bg-[#0c0d0e] rounded-3xl shadow-2xl border hairline flex flex-col overflow-hidden z-20 my-auto transition-colors duration-300"
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b hairline bg-white dark:bg-neutral-900 shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-neutral-400 dark:text-neutral-500">
                Case Study
              </span>
              <span className="text-neutral-300 dark:text-neutral-700">&bull;</span>
              <span className="text-xs font-medium text-black dark:text-white">
                {project.category}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
            {/* Title & Banner */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                <h3
                  id="case-study-title"
                  className="text-2xl sm:text-3xl font-normal tracking-tight text-black dark:text-white"
                >
                  {project.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-[11px] font-medium text-neutral-600 dark:text-neutral-300 border hairline">
                    <Calendar className="w-3 h-3" />
                    {project.year}
                  </span>
                </div>
              </div>

              <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Project Hero Image */}
            <div className="aspect-16/9 rounded-2xl overflow-hidden border hairline bg-neutral-100 dark:bg-neutral-900">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* 1. Problem Addressed */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900/80 border hairline">
              <div className="flex items-center gap-2.5 mb-3 text-neutral-900 dark:text-white font-medium">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <h4 className="text-sm uppercase tracking-wider font-semibold">
                  Problem Addressed
                </h4>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                {project.problem}
              </p>
            </div>

            {/* 2. Technologies Used */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900/80 border hairline">
              <div className="flex items-center gap-2.5 mb-4 text-neutral-900 dark:text-white font-medium">
                <Code className="w-4 h-4 text-neutral-700 dark:text-neutral-300 shrink-0" />
                <h4 className="text-sm uppercase tracking-wider font-semibold">
                  Technologies Used & Architecture
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 text-xs font-medium rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border hairline"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* 3. Implementation & Christian's Contribution */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900/80 border hairline">
              <div className="flex items-center gap-2.5 mb-4 text-neutral-900 dark:text-white font-medium">
                <Layers className="w-4 h-4 text-neutral-700 dark:text-neutral-300 shrink-0" />
                <h4 className="text-sm uppercase tracking-wider font-semibold">
                  My Contribution & Implementation
                </h4>
              </div>
              <ul className="space-y-2.5">
                {project.contribution.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Bar with Live Links */}
          <div className="px-6 py-4 border-t hairline bg-white dark:bg-neutral-900 shrink-0 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
              Designed & Engineered by Muhire Christian
            </span>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border hairline text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-colors cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
