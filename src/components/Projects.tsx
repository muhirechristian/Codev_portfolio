import { useState } from 'react';
import { motion } from 'motion/react';
import dreamImage from '../assets/images/project_dream_ict_1793614255508.jpg';
import asaabeImage from '../assets/images/project_asaabe_cafe_1793614255524.jpg';
import codevImage from '../assets/images/project_codev_system_1793614255524.jpg';
import ProjectCaseStudyModal, {
  ProjectCaseStudyData,
} from './ProjectCaseStudyModal.tsx';

export interface ProjectItem extends ProjectCaseStudyData {
  tags: string[];
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

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
      githubUrl: 'https://github.com/muhirechristian',
      problem:
        'In Kigali, procurement of enterprise ICT equipment and IT maintenance services was fragmented across physical storefronts with inconsistent pricing and no centralized availability or formal quotation flow.',
      technologies: [
        'React.js',
        'TypeScript',
        'Tailwind CSS',
        'Vite',
        'Modern State Hooks',
        'Responsive UI Architecture',
      ],
      contribution: [
        'Engineered responsive catalog with real-time category filtering and hardware spec sheets.',
        'Architected a quotation basket permitting commercial buyers to assemble items and submit requests directly.',
        'Implemented modern accessible UI with crisp contrast ratios and high-performance image rendering.',
        'Leveraged AI-assisted development workflows to accelerate iterative delivery and code quality.',
      ],
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
      githubUrl: 'https://github.com/muhirechristian',
      problem:
        'Scenic hospitality venues along Lake Kivu faced dining bottlenecks during busy tourist influxes—lengthy physical menu handoffs, delays for travellers in transit, and manual paper booking management.',
      technologies: [
        'React.js',
        'TypeScript',
        'Tailwind CSS',
        'TanStack Query',
        'Component Architecture',
      ],
      contribution: [
        'Created an interactive digital menu featuring categorized dishes, allergen notices, and custom beverage orders.',
        'Built an intuitive table reservation and transit pre-order module to minimize dining delays.',
        'Integrated theme support matching Lake Kivu day and evening ambiences.',
        'Optimized client-side bundle performance for reliable access across mobile cell data.',
      ],
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
      githubUrl: 'https://github.com/muhirechristian',
      problem:
        'Growing African enterprises frequently suffer from inventory shrinkage, delayed stock reorders, and disconnected accounting ledgers caused by manual paperwork and spreadsheet silos.',
      technologies: [
        'React.js',
        'TypeScript',
        'Node.js',
        'Express.js',
        'MySQL Database',
        'RESTful APIs',
      ],
      contribution: [
        'Designed normalized relational MySQL database schemas for warehouses, stock items, suppliers, and sales orders.',
        'Developed secure REST API endpoints in Express.js with input validation and transactional consistency.',
        'Constructed interactive dashboard analytics highlighting inventory velocity and threshold alerts.',
        'Demonstrated Christian’s enterprise software engineering standards and scalable data design.',
      ],
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
    <section id="projects" className="bg-[#fafafa] dark:bg-[#0c0d0e] py-32 lg:py-48 border-t hairline transition-colors duration-300">
      <div className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Section Header */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
            <motion.div className="lg:col-span-3" custom={0} variants={fadeVariants}>
              <span className="text-xs tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 font-medium">
                03 / Work
              </span>
            </motion.div>
            <motion.div className="lg:col-span-9" custom={0.1} variants={fadeVariants}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight-custom text-black dark:text-white">
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
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveProject(project)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveProject(project);
                    }
                  }}
                  className="block flex-1 text-left cursor-pointer focus:outline-none"
                  aria-label={`View Case Study for ${project.title}`}
                >
                  {/* Card Image */}
                  <div className="relative aspect-16/10 bg-neutral-100 dark:bg-neutral-900 rounded-2xl overflow-hidden mb-8 border hairline group-hover:shadow-2xl group-hover:shadow-black/10 dark:group-hover:shadow-white/5 transition-all duration-700 ease-[0.22,1,0.36,1]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[0.22,1,0.36,1]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-6 right-6">
                      <span className="px-4 py-2 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md text-[10px] uppercase tracking-widest font-semibold text-black dark:text-white border hairline shadow-xs">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="px-2">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 font-medium">
                        {project.category}
                      </span>
                      <div className="h-[1px] w-8 bg-neutral-200 dark:bg-neutral-800" />
                      <span className="text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 group-hover:text-black dark:group-hover:text-white transition-colors">
                        Case Study &rarr;
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-normal tracking-tight-custom text-black dark:text-white mb-4 group-hover:translate-x-1 transition-transform duration-500">
                      {project.title}
                    </h3>

                    <p className="text-neutral-500/90 dark:text-neutral-400 font-normal leading-relaxed text-base mb-6 max-w-md line-clamp-2 uppercase">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-[10px] font-medium text-neutral-400 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 rounded-full group-hover:border-neutral-400 dark:group-hover:border-neutral-600 group-hover:text-neutral-600 dark:group-hover:text-neutral-200 transition-colors duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Project Case Study Modal */}
      <ProjectCaseStudyModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
