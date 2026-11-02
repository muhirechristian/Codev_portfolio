import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Trash2, User, Mail, Clock, ArrowLeft, MessageSquare } from 'lucide-react';

interface InquiryMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
}

interface InquiriesDashboardProps {
  onClose: () => void;
}

export default function InquiriesDashboard({ onClose }: InquiriesDashboardProps) {
  const [messages, setMessages] = useState<InquiryMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = () => {
    setLoading(true);
    try {
      const stored = localStorage.getItem('portfolio_messages');
      if (stored) {
        setMessages(JSON.parse(stored));
      } else {
        const cache = localStorage.getItem('sent_messages_cache');
        if (cache) {
          const parsed = JSON.parse(cache);
          setMessages(Array.isArray(parsed) ? parsed : [parsed]);
        } else {
          setMessages([]);
        }
      }
    } catch (err) {
      console.error('Failed to parse inquiries:', err);
      setMessages([]);
    } finally {
      setTimeout(() => setLoading(false), 200);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    const updated = messages.filter((m) => m._id !== id);
    setMessages(updated);
    localStorage.setItem('portfolio_messages', JSON.stringify(updated));
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (idx: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: idx * 0.08,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    }),
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#fafafa]">
        <div className="min-h-screen pt-12 pb-24 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-12">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portfolio</span>
            </button>

            <span className="text-[10px] tracking-[0.2em] uppercase font-mono px-3 py-1 rounded-full bg-neutral-200 text-neutral-700">
              Admin &middot; Inquiries
            </span>
          </div>

          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
            <div>
              <span className="text-xs tracking-[0.2em] uppercase text-neutral-400 block mb-2 font-medium">
                Received Messages
              </span>
              <h1 className="text-4xl md:text-5xl font-normal tracking-tight text-black">
                Inquiries
              </h1>
            </div>

            <button
              onClick={fetchMessages}
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:scale-105 transition-transform cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

          {/* Messages Content */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-neutral-300 rounded-3xl bg-white/50 p-8">
              <MessageSquare className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-neutral-800 mb-2">
                No inquiries yet
              </h3>
              <p className="text-neutral-500 text-sm max-w-sm mx-auto">
                New inquiries submitted through the contact form will appear here in real time.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {messages.map((item, idx) => (
                <motion.div
                  key={item._id || idx}
                  custom={idx}
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                  className="bg-white border hairline p-8 md:p-10 rounded-2xl hover:border-black transition-all duration-500 shadow-xs hover:shadow-xl hover:shadow-black/5"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-6 mb-6">
                        <div className="flex items-center gap-2 text-xs font-bold text-black uppercase tracking-wider">
                          <User className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                          <Mail className="w-3.5 h-3.5 text-neutral-300" />
                          <a
                            href={`mailto:${item.email}`}
                            className="hover:text-black transition-colors"
                          >
                            {item.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-300 uppercase tracking-[0.2em] ml-auto">
                          <Clock className="w-3 h-3" />
                          <span>
                            {item.createdAt
                              ? new Date(item.createdAt).toLocaleDateString(undefined, {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })
                              : 'Recent'}
                          </span>
                        </div>
                      </div>

                      <p className="text-neutral-600 text-lg leading-relaxed font-normal whitespace-pre-wrap">
                        {item.message}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="self-start p-3 text-neutral-300 hover:text-red-500 transition-colors cursor-pointer"
                      title="Delete inquiry"
                      aria-label="Delete inquiry"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
}
