import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Award, CheckCircle2, Calendar, ShieldCheck } from 'lucide-react';

export interface CertificateData {
  id: string;
  name: string;
  issuer: string;
  icon: string;
  issueDate: string;
  credentialId: string;
  certLink?: string;
  skills: string[];
  description: string;
}

interface CertificateModalProps {
  certificate: CertificateData | null;
  onClose: () => void;
}

export default function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (certificate) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [certificate, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {certificate && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          />

          {/* Modal Card Window */}
          <motion.div
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border hairline overflow-hidden z-20 my-auto pointer-events-auto"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b hairline bg-neutral-50/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border hairline flex items-center justify-center shadow-xs">
                  <img
                    src={certificate.icon}
                    alt={certificate.name}
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 font-semibold block">
                    Verified Credential
                  </span>
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-900 leading-tight">
                    {certificate.name}
                  </h3>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="w-10 h-10 rounded-full bg-neutral-200/70 hover:bg-neutral-300 flex items-center justify-center text-neutral-700 hover:text-black transition-colors cursor-pointer z-30 focus:outline-none"
                aria-label="Close certificate modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Certificate Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Certificate Preview Card */}
              <div className="relative p-6 sm:p-8 rounded-2xl border-2 border-neutral-100 bg-linear-to-b from-neutral-50 to-white text-center">
                <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Officially Verified Certificate</span>
                </div>

                <h4 className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-1">
                  {certificate.name}
                </h4>
                <p className="text-sm font-medium text-neutral-500 mb-4">
                  Issued by {certificate.issuer}
                </p>

                <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-2.5 px-5 bg-white border hairline rounded-full shadow-xs text-xs text-neutral-600">
                  <span className="flex items-center gap-1.5 font-mono">
                    <Award className="w-3.5 h-3.5 text-neutral-400" />
                    ID: {certificate.credentialId}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    Issued: {certificate.issueDate}
                  </span>
                </div>

                <p className="text-sm text-neutral-600 leading-relaxed mt-6 max-w-lg mx-auto">
                  {certificate.description}
                </p>
              </div>

              {/* Skills Covered */}
              <div>
                <h5 className="text-xs tracking-[0.15em] uppercase text-neutral-400 font-semibold mb-3">
                  Competencies & Domain Skills
                </h5>
                <div className="flex flex-wrap gap-2">
                  {certificate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 text-xs font-medium text-neutral-700"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verification & Action Bar */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t hairline">
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Verified in institutional record registers</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  {certificate.certLink && (
                    <a
                      href={certificate.certLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-xs font-medium hover:bg-neutral-800 transition-colors"
                    >
                      <span>Verify Issuer</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
                    }}
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-medium transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
