import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
}

function AnimatedCounter({ from = 0, to, duration = 2 }: CounterProps) {
  const [val, setVal] = useState(from);

  useEffect(() => {
    let startTime: number | null = null;
    let animId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setVal(Math.floor(progress * (to - from) + from));
      if (progress < 1) {
        animId = window.requestAnimationFrame(step);
      }
    };

    animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [from, to, duration]);

  return <>{val}</>;
}

export default function Hero() {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 1000);

    if (typeof document !== 'undefined') {
      if (showIntro) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
        let count = 0;
        const resizeInterval = setInterval(() => {
          window.dispatchEvent(new Event('resize'));
          count++;
          if (count > 5) clearInterval(resizeInterval);
        }, 200);
      }
    }

    return () => {
      clearTimeout(timer);
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'unset';
      }
    };
  }, [showIntro]);

  const statVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        delay: custom + 1.2,
      },
    }),
  };

  const stats = [
    { value: 50, suffix: '+', label: 'Projects Completed' },
    { value: 3, suffix: '+', label: 'Years Experience' },
  ];

  return (
    <>
      {/* Intro Hello Overlay */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#fafafa]"
            exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
          >
            <motion.div
              layoutId="hello-box"
              className={`flex items-center justify-center ${
                isDesktop ? '' : 'bg-[#0a0a0a] px-8 py-4'
              }`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.h1
                layoutId="hello-text"
                className={`whitespace-nowrap w-max text-[clamp(10rem,30vw,24rem)] font-thin tracking-[-0.03em] ${
                  isDesktop ? 'hello-premium-glass' : 'hello-mobile-glass'
                }`}
              >
                Hello
              </motion.h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Main Section */}
      <section className="relative h-screen max-sm:h-[90vh] overflow-hidden bg-[#fafafa] bg-grid-pattern">
        <div className="relative flex h-full flex-col lg:flex-row">
          {/* Portrait Image (Right Half on Desktop) - Authentic 100% User Photo */}
          <motion.div
            className="order-1 absolute inset-0 z-[5] h-full w-full lg:static lg:inset-auto lg:order-2 lg:h-full lg:w-1/2 relative lg:z-[10] overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 1.2,
            }}
          >
            {/* Subtle left blend scrim on desktop for seamless contrast transition */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-28 bg-linear-to-r from-[#fafafa] to-transparent z-10 pointer-events-none" />

            <img
              src="/assets/aistudio/IMG-20260120-WA0019_1__a7d1fd51.jpg"
              alt="Muhire Christian"
              className="w-full h-full object-cover object-[center_38%] lg:object-[center_60%] transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Mobile Top Stats */}
          <motion.div
            className="lg:hidden absolute top-0 left-0 right-0 z-[2] flex justify-between px-6 sm:px-10 pt-20"
            initial="hidden"
            animate="visible"
          >
            {stats.map((item, idx) => (
              <motion.div
                key={item.label}
                className="flex flex-col items-center"
                custom={0.3 + idx * 0.1}
                variants={statVariants}
              >
                <span className="text-[3rem] sm:text-5xl font-normal tracking-tight text-black">
                  <AnimatedCounter from={0} to={item.value} />
                  {item.suffix}
                </span>
                <p className="text-[10px] sm:text-xs text-black/60 mt-0.5 uppercase tracking-[0.12em]">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Desktop Top Stats */}
          <motion.div
            className="hidden lg:flex absolute top-0 right-0 w-1/2 z-[2] justify-center gap-20 pt-32"
            initial="hidden"
            animate="visible"
          >
            {stats.map((item, idx) => (
              <motion.div
                key={item.label}
                className="flex flex-col items-center"
                custom={0.3 + idx * 0.1}
                variants={statVariants}
              >
                <span className="text-6xl lg:text-7xl font-normal tracking-tight text-black">
                  <AnimatedCounter from={0} to={item.value} />
                  {item.suffix}
                </span>
                <p className="text-xs text-black/55 mt-1 uppercase tracking-[0.14em]">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Hero Content (Left Half on Desktop, Anchored to Bottom on Mobile) */}
          <div className="order-2 absolute inset-0 z-10 w-full h-full lg:relative lg:inset-auto lg:z-[20] lg:order-1 lg:w-1/2 flex flex-col justify-end px-6 sm:px-10 lg:px-20 pt-24 lg:pt-0 pb-6 sm:pb-8 lg:pb-24 bg-transparent pointer-events-none lg:pointer-events-auto">
            <motion.div
              className="mt-6 lg:mt-16 pointer-events-auto"
              initial="hidden"
              animate="visible"
            >
              <div className="relative">
                {/* Phantom spacer to reserve layout height */}
                <h1 className="whitespace-nowrap w-max text-[clamp(4.5rem,15vw,16rem)] lg:text-[clamp(7rem,20vw,16rem)] font-thin leading-[0.82] tracking-[-0.03em] opacity-0 pointer-events-none">
                  Hello
                </h1>

                {!showIntro && (
                  <motion.div
                    layoutId="hello-box"
                    className="absolute top-0 left-0 flex items-center justify-center bg-transparent px-0 py-0"
                    transition={{
                      type: 'spring',
                      damping: 30,
                      stiffness: 80,
                      mass: 1,
                    }}
                  >
                    <motion.h1
                      layoutId="hello-text"
                      className={`whitespace-nowrap w-max text-[clamp(4.5rem,15vw,16rem)] lg:text-[clamp(7rem,20vw,16rem)] font-thin leading-[0.82] tracking-[-0.03em] ${
                        isDesktop ? 'hello-premium-glass' : 'hello-mobile-glass'
                      }`}
                      transition={{
                        type: 'spring',
                        damping: 30,
                        stiffness: 80,
                        mass: 1,
                      }}
                    >
                      Hello
                    </motion.h1>
                  </motion.div>
                )}
              </div>

              {/* Subtitle Words - Positioned down at bottom with clean white frosted backdrop card */}
              <motion.div
                className="mt-2 lg:mt-6 bg-white/90 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 md:p-5 border border-white/80 shadow-md inline-block max-w-full lg:max-w-xl"
                custom={0.18}
                variants={statVariants}
              >
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-[1.25] tracking-tight-custom text-black">
                  I am <span className="text-black font-bold">Muhire Christian</span>
                  <span className="block mt-1 text-black font-semibold text-base sm:text-lg md:text-2xl lg:text-3xl tracking-tight">
                    Software Engineer | Full-Stack Developer | AI Enthusiast
                  </span>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Curved gradient overlay on mobile anchored at the bottom edge */}
        <div
          className="absolute bottom-0 pointer-events-none lg:hidden"
          style={{
            left: '-5%',
            width: '110%',
            height: '240px',
            borderRadius: '50% 50% 0 0 / 90px 90px 0 0',
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(250,250,250,0.55) 30%, rgba(250,250,250,0.92) 75%, #fafafa 100%)',
          }}
        />

        {/* Animated vertical scroll indicator line */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[1px] h-12 bg-neutral-300"
          />
        </motion.div>
      </section>
    </>
  );
}
