import { motion } from 'motion/react';
import dreamImage from '../assets/images/project_dream_ict_1793614255508.jpg';
import asaabeImage from '../assets/images/project_asaabe_cafe_1793614255524.jpg';
import codevImage from '../assets/images/project_codev_system_1793614255524.jpg';

export interface ProjectItem {
  title: string;
  category: string;
  description: string;
  tags: string[];
  year: string;
  image: string;
  link: string;
}

export default function Projects() {
  const projects: ProjectItem[] = [
    {
      title: 'Dream',
      category: 'Web Application',
      description:
        'A comprehensive ICT equipment and technology services platform featuring real-time product catalogs, custom quotation requests, and technical service booking in Kigali.',
      tags: ['React', 'Tailwind CSS', 'TypeScript', 'Vite'],
      year: '2024',
      image: dreamImage,
      link: 'https://dream-webiste.vercel.app/',
    },
    {
      title: 'Asaabe Cozy Corner',
      category: 'Platform',
      description:
        'A cosy café and restaurant experience on the shores of Lake Kivu in Karongi, featuring digital menu exploration, online meal ordering, table reservations, and loyalty perks.',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'TanStack'],
      year: '2026',
      image: asaabeImage,
      link: 'https://asaabe-cozy-corner.vercel.app/',
    },
    {
      title: 'Codev Management System',
      category: 'Enterprise System',
      description:
        'Professional business management and inventory system engineered to streamline warehouse stock tracking, multi-channel sales management, and organizational analytics.',
      tags: ['React', 'TypeScript', 'Node.js', 'Express.js', 'MySQL'],
      year: '2025',
      image: codevImage,
      link: 'https://codev-management-system.vercel.app/',
    },
  ];

  const fadeVariants = {
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

  return (
    <section id="projects" className="bg-[#fafafa] py-32 lg:py-48 border-t hairline">
      <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Section Header */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
            <motion.div className="lg:col-span-3" custom={0} variants={fadeVariants}>
              <span className="text-xs tracking-[0.2em] uppercase text-neutral-400">
                03 / Work
              </span>
            </motion.div>
            <motion.div className="lg:col-span-9" custom={0.1} variants={fadeVariants}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight-custom">
                Selected Projects
              </h2>
            </motion.div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {projects.map((project, idx) => (
              <motion.article
                key={project.title}
                className="group flex flex-col"
                custom={0.1 * (idx + 1)}
                variants={fadeVariants}
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block flex-1"
                >
                  {/* Card Image */}
                  <div className="relative aspect-16/10 bg-neutral-100 rounded-2xl overflow-hidden mb-8 border hairline group-hover:shadow-2xl group-hover:shadow-black/5 transition-all duration-700 ease-[0.22,1,0.36,1]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[0.22,1,0.36,1]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-6 right-6">
                      <span className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-[10px] uppercase tracking-widest font-semibold text-black shadow-xs">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="px-2">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 font-medium">
                        {project.category}
                      </span>
                      <div className="h-[1px] w-8 bg-neutral-200" />
                    </div>

                    <h3 className="text-2xl md:text-3xl font-normal tracking-tight-custom text-black mb-4 group-hover:translate-x-1 transition-transform duration-500">
                      {project.title}
                    </h3>

                    <p className="text-neutral-500/90 font-normal leading-relaxed text-base mb-6 max-w-md line-clamp-2 uppercase">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-[10px] font-medium text-neutral-400 border border-neutral-200 rounded-full group-hover:border-neutral-400 group-hover:text-neutral-600 transition-colors duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
