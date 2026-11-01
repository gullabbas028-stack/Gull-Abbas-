import { Project, SkillCategory, TimelineItem, ServiceItem, Testimonial } from '../types';

export const DEVELOPER_PROFILE = {
  name: 'Gull Abbas',
  monogram: 'GA',
  handle: '@gullabbas028',
  title: 'Full Stack MERN Developer & Frontend Engineer',
  tagline: 'Building beautiful, performant web experiences',
  roles: [
    'MERN Developer',
    'Full Stack Developer',
    'React.js Developer',
    'UI/UX of Websites',
    'Problem Solver',
  ],
  bio: `I'm a passionate Full Stack MERN & Frontend Developer currently pursuing my BSCS at Virtual University of Pakistan, Lahore. I specialize in building responsive, modern, and scalable web interfaces using MongoDB, Express.js, React.js, and Node.js. I love turning ideas into polished digital products.`,
  extendedBio: `Skilled across frontend interfaces, backend services, REST APIs, authentication, database management, Git/GitHub, and cloud deployment with Vercel. Currently gaining hands-on industry experience as a Full Stack Developer Intern at CodAlpha and Oasis Infobyte, collaborating on real-world software projects with a focus on clean code, responsive design, and continuous learning.`,
  portraitImage: '/Ahsaanpic.png',
  cvPdfUrl: '/CV.pdf',
  cvImageUrl: '/CV.png',
  stats: [
    { label: 'Years Experience', value: 1, suffix: '+' },
    { label: 'Projects Completed', value: 11, suffix: '+' },
    { label: 'Technologies Mastered', value: 14, suffix: '+' },
    { label: 'Live Vercel Deployments', value: 100, suffix: '%' },
  ],
  contact: {
    email: 'gullabbas028@gmail.com',
    location: 'Lahore, Canal Breeze Ali Town, 64000, Pakistan',
    shortLocation: 'Lahore, Pakistan',
    phone: '+92 347 1426033',
    rawPhone: '03471426033',
    github: 'https://github.com/gullabbas028-stack',
    linkedin: 'https://www.linkedin.com/in/gull-abbas-122255381',
    oldPortfolio: 'https://portfolio-final-2026-nu.vercel.app/',
    availability: 'Open to Full-Stack / Frontend Roles & Freelance Projects',
  },
  languages: ['English', 'Urdu'],
  strengths: [
    'Clean Code Architecture',
    'Problem Solving',
    'Team Collaboration',
    'Continuous Learning',
  ],
};

export const PROJECTS: Project[] = [
  {
    id: 'dukalink',
    title: 'DukaLink (E-Commerce Web App)',
    tagline: 'Full-Stack MERN E-Commerce Platform built at CodAlpha',
    category: 'ecommerce',
    featured: true,
    accentColor: '#EC4899',
    description:
      'A modern e-commerce platform that provides a seamless online shopping experience, allowing users to explore products, manage their shopping cart, and enjoy a user-friendly interface.',
    fullOverview:
      'Developed as a flagship Full-Stack MERN project, DukaLink delivers a complete modern online retail workflow. Users can browse curated product catalogs, filter items dynamically, manage cart quantities in real time, and experience a responsive interface deployed on Vercel.',
    keyFeatures: [
      'Dynamic product catalog with instant search and category filtering',
      'Interactive shopping cart state management and price calculation',
      'Mobile-first responsive layout engineered with Tailwind CSS & Vite',
      'Optimized production build deployed on Vercel with fast page loads',
    ],
    techStack: ['React', 'Vite', 'Tailwind CSS', 'MERN Stack', 'Vercel'],
    image: 'dukalink.png',
    metrics: 'Full-Stack MERN · Live on Vercel',
    liveUrl: 'https://code-alpha-dukalink.vercel.app',
    githubUrl: 'https://github.com/gullabbas028-stack',
  },
  {
    id: 'foodiehub',
    title: 'FoodieHub',
    tagline: 'Full-featured food delivery app with Context API & AOS animations',
    category: 'food',
    featured: false,
    accentColor: '#FF6B6B',
    description:
      'A full-featured food delivery app with cart/wishlist context, parallax hero, AOS animations, and a reusable component architecture.',
    fullOverview:
      'FoodieHub reimagines online restaurant ordering with a rich, interactive frontend architecture. Built using React, React Router, and the Context API, it provides global cart and wishlist state persistence, smooth parallax hero sections, and scroll-triggered AOS animations.',
    keyFeatures: [
      'Global Cart and Wishlist state management using React Context API',
      'Multi-page SPA navigation powered by React Router',
      'Parallax hero banner and scroll-triggered AOS animations',
      'Modular, reusable UI component library for menu items and categories',
    ],
    techStack: ['React', 'React Router', 'Context API', 'AOS', 'CSS3'],
    image: 'foodiehub.png',
    metrics: 'React + Context API · Smooth UX',
    liveUrl: 'https://arbaz-rasturant.vercel.app/',
    githubUrl: 'https://github.com/gullabbas028-stack',
  },
  {
    id: 'faisaldildar',
    title: 'Faisal Dildar Real Estate Website',
    tagline: 'Modern real estate portal showcasing properties for sale and rent',
    category: 'webapp',
    featured: false,
    accentColor: '#10B981',
    description:
      'A modern real estate website showcasing properties for sale and rent with sleek property cards, location highlights, and client inquiry flows.',
    fullOverview:
      'Built for Faisal Dildar Associates, this real estate platform presents residential and commercial listings with high-clarity photography, property specifications, and direct contact channels for buyers and tenants.',
    keyFeatures: [
      'Showcase of featured properties for sale and rent with detailed specs',
      'Responsive grid architecture built with Next.js, Vite, and Tailwind CSS',
      'Fast client-side filtering and smooth property exploration',
      'Direct inquiry and consultation booking layout',
    ],
    techStack: ['Next.js', 'Vite', 'Tailwind CSS', 'Vercel'],
    image: 'faisaldildar.png',
    metrics: 'Real Estate Portal · Production Client Site',
    liveUrl: 'https://faisal-dildar-associates.vercel.app/',
    githubUrl: 'https://github.com/gullabbas028-stack',
  },
  {
    id: 'playnexus',
    title: 'PlayNexus Gaming Website',
    tagline: 'Dynamic gaming platform for latest releases, reviews & community',
    category: 'webapp',
    featured: false,
    accentColor: '#8B5CF6',
    description:
      'A dynamic gaming website featuring the latest game releases, reviews, and a vibrant community for gamers.',
    fullOverview:
      'PlayNexus brings an immersive dark-themed gaming aesthetic to the browser, highlighting trending titles, community ratings, game trailers, and interactive catalog browsing powered by Next.js, Tailwind CSS, and MongoDB.',
    keyFeatures: [
      'High-impact gaming UI with trending releases and review scorecards',
      'Full-stack integration with MongoDB for game catalog data',
      'Responsive cyber-themed cards and interactive filtering',
      'Deployed on Vercel for instant global access',
    ],
    techStack: ['Next.js', 'Vite', 'Tailwind CSS', 'MongoDB', 'Vercel'],
    image: 'playnexus.png',
    metrics: 'Next.js + MongoDB · Gaming Hub',
    liveUrl: 'https://playnexus-two.vercel.app/',
    githubUrl: 'https://github.com/gullabbas028-stack',
  },
  {
    id: 'linkedin-clone',
    title: 'LinkedIn Clone',
    tagline: 'Professional networking platform with profiles, feeds & connections',
    category: 'webapp',
    featured: false,
    accentColor: '#3B82F6',
    description:
      'A responsive LinkedIn clone built with React, featuring user profiles, connections, and a modern interface for professional networking.',
    fullOverview:
      'Engineered to replicate the core experience of LinkedIn, this application features a clean social feed, user profile cards, connection management, and post creation backed by React, Tailwind CSS, and MongoDB.',
    keyFeatures: [
      'Interactive professional feed for sharing posts and updates',
      'User profile overview with experience, skills, and connection metrics',
      'Responsive three-column desktop layout and mobile navigation',
      'MongoDB integration with fast Vite + React frontend',
    ],
    techStack: ['React', 'Vite', 'Tailwind CSS', 'MongoDB', 'Vercel'],
    image: 'linkedin.png',
    metrics: 'Full-Stack Social App · React & MongoDB',
    liveUrl: 'https://linkdin-full-project-frontand.vercel.app/',
    githubUrl: 'https://github.com/gullabbas028-stack',
  },
  {
    id: 'arbaz-shoes',
    title: 'Arbaz Shoes (E-Commerce Web App)',
    tagline: 'Modern online footwear store with interactive cart & catalog',
    category: 'ecommerce',
    featured: false,
    accentColor: '#10B981',
    description:
      'Arbaz Shoes is a modern online store offering stylish, affordable, and comfortable footwear with a smooth shopping experience, product listings, and shopping cart.',
    fullOverview:
      'Designed for footwear enthusiasts, Arbaz Shoes pairs bold product photography with a fast, intuitive shopping flow. Users can inspect shoe collections, add sizes to their cart, and browse seamlessly across mobile and desktop devices.',
    keyFeatures: [
      'Curated footwear collections with size and price displays',
      'Interactive shopping cart and instant item management',
      'Clean, high-contrast product cards with hover animations',
      'Responsive layout across mobile, tablet, and desktop screens',
    ],
    techStack: ['React', 'Vite', 'JavaScript', 'HTML5', 'CSS3'],
    image: 'arbaz-shoes.png',
    metrics: 'Footwear E-Commerce · Responsive Store',
    liveUrl: 'https://arbaz-shoes.vercel.app/',
    githubUrl: 'https://github.com/gullabbas028-stack',
  },
  {
    id: 'foodpanda-clone',
    title: 'Foodpanda by Me',
    tagline: 'Responsive food delivery platform with restaurant & menu browsing',
    category: 'food',
    featured: false,
    accentColor: '#EC4899',
    description:
      'A responsive food delivery web app built with modern frontend technologies, featuring restaurant browsing, smooth navigation, and a clean user interface for an enhanced ordering experience.',
    fullOverview:
      'Inspired by Foodpanda, this application focuses on speed and usability for hungry customers—showcasing local restaurants, featured deals, cuisine categories, and a streamlined ordering interface.',
    keyFeatures: [
      'Restaurant discovery grid with ratings, delivery times, and deals',
      'Smooth category navigation and dish selection workflow',
      'Built with React and Vite for instantaneous page transitions',
      'Pixel-perfect responsive styling for mobile and desktop users',
    ],
    techStack: ['React', 'Vite', 'CSS3', 'JavaScript'],
    image: 'foodpanda.png',
    metrics: 'Food Delivery UI · React + Vite',
    liveUrl: 'https://foodpandabyyme.vercel.app/',
    githubUrl: 'https://github.com/gullabbas028-stack',
  },
  {
    id: 'amazon-clone',
    title: 'Amazon Clone (E-Commerce Web App)',
    tagline: 'Full-featured marketplace UI with persistent localStorage cart',
    category: 'ecommerce',
    featured: false,
    accentColor: '#F59E0B',
    description:
      'A responsive e-commerce web app built with React and Vite, featuring product listings, navigation, and modern UI design. Deployed on Vercel to demonstrate real-world frontend skills.',
    fullOverview:
      'Replicating the core shopping workflow of Amazon, this project implements multi-category product grids, star ratings, promotional banners, and persistent shopping cart storage using browser localStorage.',
    keyFeatures: [
      'Persistent cart state utilizing browser localStorage APIs',
      'Multi-category product browsing and price totals calculation',
      'Amazon-inspired header navigation, search bar, and hero sliders',
      'Deployed on Vercel with optimized asset delivery',
    ],
    techStack: ['React', 'Vite', 'CSS3', 'localStorage'],
    image: 'amazon-clone.png',
    metrics: 'Marketplace Clone · Persistent Cart',
    liveUrl: 'https://amazone-clone-by-me.vercel.app/',
    githubUrl: 'https://github.com/gullabbas028-stack',
  },
  {
    id: 'unity-assets',
    title: 'Assets 4 Unity by Me',
    tagline: 'Digital resource showcase & marketplace for Unity game developers',
    category: 'webapp',
    featured: false,
    accentColor: '#7C3AED',
    description:
      'A modern and responsive web platform designed to showcase and explore Unity assets, built with React and Vite. Focuses on clean UI, smooth navigation, and an optimized user experience for browsing digital resources.',
    fullOverview:
      'Created for indie game developers and 3D creators, Assets 4 Unity provides an organized digital library to preview, filter, and download Unity engine packages, shaders, 3D models, and UI kits.',
    keyFeatures: [
      'Dedicated showcase cards for 3D models, textures, and Unity packages',
      'Clean dark UI tailored for game developers and digital artists',
      'Fast search and category navigation for rapid asset discovery',
      'Responsive layout built with HTML5, CSS3, JavaScript, and React',
    ],
    techStack: ['React', 'Vite', 'HTML5', 'CSS3', 'JavaScript'],
    image: 'unity-assets.png',
    metrics: 'Game Dev Asset Hub · Clean UI',
    liveUrl: 'https://assects4unitybyme.vercel.app/',
    githubUrl: 'https://github.com/gullabbas028-stack',
  },
  {
    id: 'ecommerce-store',
    title: 'E-Commerce Store',
    tagline: 'Amazon/Myntra-inspired online shopping platform with checkout flow',
    category: 'ecommerce',
    featured: false,
    accentColor: '#00D4FF',
    description:
      'Amazon/Myntra-inspired online shopping platform with product listings, filters, cart management, and a clean checkout flow.',
    fullOverview:
      'Built from the ground up with vanilla HTML5, CSS3, and JavaScript to master core DOM manipulation, event delegation, dynamic product filtering, and cart checkout state without external framework overhead.',
    keyFeatures: [
      'Pure JavaScript DOM rendering and dynamic category filtering',
      'Interactive shopping bag with quantity adjustments and order summary',
      'Myntra & Amazon inspired fashion and electronics catalog layout',
      'Zero-dependency lightweight bundle with instant load times',
    ],
    techStack: ['HTML5', 'CSS3', 'JavaScript'],
    image: 'ecommerce-store.png',
    metrics: 'Vanilla JS Mastery · Fast Checkout Flow',
    liveUrl: 'https://ecomrance.vercel.app/',
    githubUrl: 'https://github.com/gullabbas028-stack',
  },
  {
    id: 'workflow-automation',
    title: 'Workflow Automation',
    tagline: 'CI/CD & automated development pipeline dashboard',
    category: 'automation',
    featured: false,
    accentColor: '#8B5CF6',
    description:
      'Streamline your development process with automated workflows for building, testing, and deploying your applications.',
    fullOverview:
      'Developed during the CodeAlpha fellowship, Workflow Automation visualizes and streamlines continuous integration, automated testing, and deployment pipelines so engineering teams can ship faster with confidence.',
    keyFeatures: [
      'Visual pipeline stages for build, test, and production deployment',
      'GitHub Actions & CI/CD workflow configuration templates',
      'Clean developer dashboard with status indicators and logs',
      'Hosted on Vercel with responsive dark-mode interface',
    ],
    techStack: ['GitHub Actions', 'CI/CD', 'Automation', 'React', 'Vercel'],
    image: 'workflow.png',
    metrics: 'CI/CD DevOps · CodeAlpha Project',
    liveUrl: 'https://code-alpha-workflow.vercel.app/',
    githubUrl: 'https://github.com/gullabbas028-stack',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend Development',
    skills: [
      { name: 'HTML5 & Semantic Markup', level: 90, iconName: 'Code', experience: 'Advanced' },
      { name: 'CSS3 & Responsive Web Design', level: 85, iconName: 'Palette', experience: 'Advanced' },
      { name: 'JavaScript (ES6+)', level: 78, iconName: 'FileCode', experience: 'Proficient' },
      { name: 'React.js & Context API', level: 75, iconName: 'Layers', experience: 'Proficient' },
      { name: 'Tailwind CSS & Modern UI', level: 85, iconName: 'Monitor', experience: 'Advanced' },
      { name: 'Next.js & Vite SPA', level: 72, iconName: 'Zap', experience: 'Proficient' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & MERN Stack',
    skills: [
      { name: 'Node.js Runtime', level: 65, iconName: 'Server', experience: 'MERN Stack' },
      { name: 'Express.js Framework', level: 60, iconName: 'Terminal', experience: 'MERN Stack' },
      { name: 'MongoDB Database', level: 60, iconName: 'Database', experience: 'MERN Stack' },
      { name: 'REST APIs & Integration', level: 75, iconName: 'Share2', experience: 'Proficient' },
      { name: 'User Authentication & JWT', level: 70, iconName: 'Shield', experience: 'Practical' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Deployment',
    skills: [
      { name: 'VS Code & DevTools', level: 90, iconName: 'Terminal', experience: 'Daily Driver' },
      { name: 'Git & GitHub Workflows', level: 75, iconName: 'GitBranch', experience: 'Proficient' },
      { name: 'Vercel & Cloud Deployment', level: 88, iconName: 'Cloud', experience: 'Advanced' },
      { name: 'Vite / Create React App', level: 75, iconName: 'Box', experience: 'Proficient' },
      { name: 'Figma (UI/UX Basics)', level: 55, iconName: 'Figma', experience: 'Foundational' },
      { name: 'GitHub Actions & CI/CD', level: 65, iconName: 'Cpu', experience: 'Practical' },
    ],
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description:
      'End-to-end responsive websites built with clean HTML5, CSS3, and modern JavaScript — or full-stack MERN applications.',
    iconName: 'Monitor',
    deliverables: ['Semantic HTML5 & CSS3', 'Full-Stack MERN Apps', 'Clean & Maintainable Code'],
  },
  {
    id: 'react-apps',
    title: 'React Applications',
    description:
      'Component-based React & Next.js apps with Context API state management, client routing, and smooth animations for great UX.',
    iconName: 'Layers',
    deliverables: ['Reusable React Components', 'React Router & Context API', 'Next.js & Vite Builds'],
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    description:
      'Clean, modern interfaces with attention to spacing, typography, color harmony, and intuitive visual hierarchy.',
    iconName: 'Palette',
    deliverables: ['Tailwind CSS Styling', 'Interactive Micro-Animations', 'Modern Glassmorphic UI'],
  },
  {
    id: 'responsive',
    title: 'Responsive Design',
    description:
      'Mobile-first layouts that look and work flawlessly across smartphones, tablets, laptops, and ultra-wide desktops.',
    iconName: 'Smartphone',
    deliverables: ['Mobile-First Breakpoints', 'Cross-Browser Compatibility', 'Touch-Friendly Controls'],
  },
  {
    id: 'performance',
    title: 'Performance Optimization',
    description:
      'Fast-loading websites with optimized assets, lazy loading, and best-practice bundle structure deployed on Vercel.',
    iconName: 'Zap',
    deliverables: ['Fast Core Web Vitals', 'Asset & Image Optimization', 'Edge Vercel Deployment'],
  },
  {
    id: 'api-integration',
    title: 'API Integration',
    description:
      'Connecting React frontends to Node/Express REST APIs, MongoDB databases, authentication flows, and third-party services.',
    iconName: 'Share2',
    deliverables: ['RESTful API Consumption', 'Auth & Database Binding', 'Form & Webhook Integration'],
  },
];

export const TIMELINE_EXPERIENCE: TimelineItem[] = [
  {
    period: '2025 — Present',
    role: 'Full Stack Developer Intern',
    organization: 'CodAlpha',
    location: 'Remote / Lahore, Pakistan',
    type: 'experience',
    description:
      'Developing full-stack web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js) and collaborating on real-world software engineering tasks.',
    achievements: [
      'Working across frontend React interfaces, backend Node/Express services, REST APIs, and database-driven features',
      'Built and deployed DukaLink Full-Stack E-Commerce Web App (code-alpha-dukalink.vercel.app)',
      'Engineered CodeAlpha Workflow Automation dashboard (code-alpha-workflow.vercel.app)',
    ],
    skills: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'Vercel'],
  },
  {
    period: 'Sep — Oct 2026',
    role: 'Full Stack Web Development Intern',
    organization: 'Oasis Infobyte',
    location: 'Remote',
    type: 'experience',
    description:
      'Completed an intensive online internship focused on full-stack web development, UI/UX design, and practical project-based deliverables.',
    achievements: [
      'Worked on full-stack web development, responsive layout designing, and interactive frontend engineering',
      'Delivered production-ready web applications deployed on Vercel with clean, modular code',
    ],
    skills: ['React.js', 'JavaScript ES6+', 'HTML5 & CSS3', 'REST APIs', 'Git & GitHub'],
  },
  {
    period: 'Aug 2025 — Present',
    role: 'MERN Stack Web Developer',
    organization: 'Self-Employed & Freelance Projects',
    location: 'Lahore, Pakistan',
    type: 'experience',
    description:
      'Building real-world inspired web applications and client platforms to sharpen frontend and full-stack skills across HTML, CSS, JavaScript, React, Next.js, and MongoDB.',
    achievements: [
      'Food Delivery Websites (FoodieHub & Foodpanda Clone with cart and restaurant browsing)',
      'E-Commerce Platforms (Amazon Clone, Myntra-inspired Store, Arbaz Shoes Footwear Store)',
      'Faisal Dildar Real Estate Website, PlayNexus Gaming Hub, LinkedIn Clone & Unity Assets Store',
      'Task Manager Web App, Pomodoro Timer Application & Multiple Portfolio Versions',
    ],
    skills: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'JavaScript', 'MongoDB'],
  },
  {
    period: 'Sep 2025 — Present',
    role: 'Bachelor of Science in Computer Science (BSCS)',
    organization: 'Virtual University of Pakistan',
    location: 'Lahore, Pakistan (2nd Semester)',
    type: 'education',
    description:
      'Pursuing BS Computer Science focused on programming fundamentals, data structures, software engineering, full-stack web development, and core computer science concepts.',
    achievements: [
      'Actively applying university computer science theory to 11+ real-world web engineering projects',
      'Specializing in modern JavaScript ecosystems and MERN stack application architecture',
    ],
    skills: ['Computer Science', 'Programming', 'Web Development', 'Data Structures', 'Algorithms'],
  },
  {
    period: 'Completed',
    role: 'Intermediate in Computer Science (ICS)',
    organization: 'Higher Secondary Education',
    location: 'Lahore, Pakistan',
    type: 'education',
    description:
      'Completed Intermediate with specialization in Physics, Mathematics, and Computer Science, establishing a strong analytical and problem-solving foundation.',
    achievements: [
      'Core concentration in Mathematics, Physics, and Computer Science',
      'Developed early passion for software programming and web technologies',
    ],
    skills: ['Mathematics', 'Physics', 'Computer Science', 'Analytical Problem Solving'],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote:
      'Gull Abbas delivered our Faisal Dildar Associates real estate platform with remarkable speed and visual polish. The responsive layout works seamlessly on mobile phones and desktops alike.',
    author: 'Faisal Dildar',
    role: 'Managing Director',
    company: 'Faisal Dildar Associates',
    avatar: 'FD',
    metric: '100% Responsive Client Delivery',
  },
  {
    id: 'test-2',
    quote:
      'During his internship at CodAlpha, Gull Abbas consistently demonstrated strong ownership across the MERN stack—shipping DukaLink and Workflow Automation with clean React components and reliable deployments.',
    author: 'Project Mentor',
    role: 'Senior Full-Stack Reviewer',
    company: 'CodAlpha Internship Program',
    avatar: 'CA',
    metric: 'Full-Stack MERN Excellence',
  },
  {
    id: 'test-3',
    quote:
      'From Arbaz Shoes to FoodieHub, Gull turns e-commerce and food delivery concepts into fast, engaging web applications. His dedication to clean code and user experience stands out.',
    author: 'Arbaz Khan',
    role: 'Founder',
    company: 'Arbaz Footwear & Restaurant',
    avatar: 'AK',
    metric: '11+ Live Vercel Apps',
  },
];

export const TECH_MARQUEE = [
  'HTML5',
  'CSS3',
  'JavaScript ES6+',
  'React.js',
  'Next.js',
  'Node.js',
  'Express.js',
  'MongoDB',
  'Tailwind CSS',
  'Vite',
  'REST APIs',
  'Git & GitHub',
  'Vercel',
  'Context API',
  'Figma',
  'Responsive Web Design',
];
