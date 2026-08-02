import organickImage from '@/assets/images/organick.png'
import hesImage from '@/assets/images/hes.png'
import educlassImage from '@/assets/images/educlass.png'
import writeflowImage from '@/assets/images/write-ai.png'
import taskflowImage from '@/assets/images/taskflow.png'
import swiftshareImage from '@/assets/images/swiftShare.png'
import storeclothesImage from '@/assets/images/store_clothes.png'
import ellamartImage from '@/assets/images/ellamart.png'
import searchmealsImage from '@/assets/images/search_meals.png'
import swaplyImage from '@/assets/images/sweply.png'

export const projects = [
  {
    id: 1,
    slug: 'hes',
    title: 'HES Connect',
    category: 'Healthcare',
    accent: '#0ea5e9',
    description: 'A comprehensive healthcare management platform connecting patients, healthcare providers, hospitals, clinics, and pharmacies through a unified ecosystem — featuring appointment scheduling, AI-powered assistance, multilingual support, role-based dashboards, and payment integration.',
    overview: `HES Connect is a comprehensive healthcare management platform designed to connect patients, doctors, pharmacies, hospitals, clinics, and healthcare organizations within a unified digital ecosystem. The platform streamlines the entire healthcare journey, from finding the right doctor and booking appointments to managing prescriptions, medications, and patient records.

The system features multiple role-based dashboards, each tailored to the responsibilities of different users, including Super Admin, Facility Administrators, Doctors, Pharmacists, Nurses, and Patients. Every dashboard provides specialized tools for managing daily operations while maintaining strict access control and data security.

Patients can search healthcare facilities, browse doctors by specialty, schedule appointments, manage prescriptions, request medications from pharmacies, save favorite doctors and facilities, communicate with healthcare providers, and review healthcare services. The platform also includes multilingual support (Arabic & English), theme customization, notifications, secure authentication, and profile management.

One of the platform's key features is its AI-powered healthcare assistant, which analyzes patient symptoms, recommends the most appropriate medical specialty, and suggests suitable healthcare providers using the system database instead of generating random recommendations. The AI supports natural conversations in both Arabic and English while ensuring medical recommendations remain safe and reliable.

Healthcare facilities can manage departments, staff members, working schedules, appointments, patient records, medical inventories, articles, stories, reviews, and reports through dedicated management dashboards. The platform also integrates secure online payment gateways and supports donation and fundraising workflows for healthcare campaigns.`,
    image: hesImage,
    technologies: ['Laravel', 'Vue.js', 'Pinia', 'MySQL', 'REST API', 'Sanctum', 'Fortify', 'Docker', 'Vite', 'Tailwind CSS', 'Groq AI', 'Stripe', 'PayPal'],
    highlights: ['Multi Dashboard System', 'AI-Powered Assistance', 'Role-Based Access', 'Appointment Scheduling', 'Payment Integration'],
    metrics: ['Healthcare', 'AI Powered', '3 Dashboards', 'REST API', 'Payment Integration'],
    features: [
      'Multi-role dashboards with advanced permission management',
      'AI-powered healthcare assistant using Groq AI',
      'Doctor recommendation based on symptoms',
      'Appointment booking and schedule management',
      'Prescription and medication request system',
      'Pharmacy inventory management',
      'Hospital, clinic, and pharmacy management',
      'Patient and staff management',
      'Healthcare articles and educational content',
      'Reviews and ratings',
      'Real-time notifications',
      'Secure authentication with Laravel Fortify & Sanctum',
      'RESTful API architecture',
      'Arabic & English localization',
      'Responsive modern interface',
      'Payment gateway integration',
      'Docker-based development environment',
    ],
    status: 'Completed',
    github: 'https://github.com/Ali-Waked/health-ecosystem',
    githubFrontend: 'https://github.com/Ali-Waked/health-ecosystem-vuejs',
    youtube: 'https://youtu.be/51VcDcAO_yU',
    caseStudy: '',
    featured: true,
  },
  {
    id: 2,
    slug: 'organick',
    title: 'Organick',
    category: 'E-Commerce',
    accent: '#22c55e',
    description: 'A modern full-stack e-commerce platform featuring multiple management dashboards, product management, shopping cart, secure checkout, order tracking, blog system, multilingual support, and integrated payment gateways.',
    overview: `Organick is a modern full-stack e-commerce platform designed to deliver a complete online shopping experience for customers while providing powerful management tools for administrators and moderators. The platform focuses on performance, scalability, and user experience, offering an intuitive interface for browsing products, placing orders, and managing online stores.

Customers can explore products through organized categories, search and filter items, add products to their shopping cart, maintain wish lists, complete secure online payments, and monitor the status of their orders from purchase to delivery. The shopping experience is fully responsive and optimized for both desktop and mobile devices.

The system includes three independent dashboards for Administrators, Moderators, and Drivers. Administrators can manage products, users, categories, blogs, subscriptions, payments, and system settings. Moderators are responsible for reviewing content and managing product listings, while Drivers can monitor assigned deliveries and update delivery statuses.

The platform also includes a complete blogging system with subscription functionality, allowing visitors to subscribe and receive updates whenever new articles are published. The application supports multiple payment gateways, multilingual content management, user authentication, role-based permissions, and order tracking.`,
    image: organickImage,
    technologies: ['Laravel', 'Vue.js', 'MySQL', 'Sanctum', 'Fortify', 'Tailwind CSS', 'Stripe', 'PayPal'],
    highlights: ['Multi Dashboard System', 'Product Management', 'Shopping Cart', 'Secure Checkout', 'Order Tracking'],
    metrics: ['E-Commerce', 'Management Dashboards', 'Multilingual', 'Payment Gateways'],
    features: [
      'Three management dashboards',
      'Customer shopping experience',
      'Product catalog and categories',
      'Shopping cart and checkout',
      'Order tracking',
      'Blog management',
      'Blog subscription system',
      'Product search and filtering',
      'Multiple payment gateways',
      'Secure authentication',
      'User management',
      'Responsive UI',
      'Arabic & English support',
    ],
    status: 'Completed',
    github: 'https://github.com/Ali-Waked/organick-laravel',
    githubFrontend: 'https://github.com/Ali-Waked/organick-vuejs',
    youtube: 'https://youtu.be/T1gFWPPtxOQ',
    caseStudy: '',
    featured: true,
  },
  {
    id: 3,
    slug: 'educlass',
    title: 'EduClass',
    category: 'Education',
    accent: '#6366f1',
    description: 'A learning management system inspired by Google Classroom, allowing instructors and students to manage courses, assignments, subscriptions, and educational content through a modern responsive interface.',
    overview: `EduClass is a feature-rich Learning Management System inspired by Google Classroom, built to simplify online education for teachers, students, and educational institutions. The platform provides a complete digital learning environment where instructors can create courses, manage classrooms, publish educational materials, assign homework, and monitor student participation.

Students can enroll in courses, access lessons, submit assignments, communicate with instructors, and track academic progress through a modern and responsive interface. The platform includes secure subscription plans with Stripe integration, multilingual support, customizable themes, and role-based access control.

Designed with scalability and usability in mind, EduClass delivers an experience similar to major online learning platforms while remaining lightweight and highly customizable.`,
    image: educlassImage,
    technologies: ['Laravel', 'Blade', 'MySQL', 'Stripe', 'Fortify'],
    highlights: ['Course Management', 'Assignments', 'Subscriptions', 'Instructor & Student Roles', 'Responsive UI'],
    metrics: ['Education', 'Role-Based Access', 'Subscriptions'],
    features: [
      'Teacher dashboard',
      'Student dashboard',
      'Course management',
      'Classroom management',
      'Assignment submission',
      'Course enrollment',
      'Stripe subscriptions',
      'Theme customization',
      'Arabic & English support',
      'Authentication',
      'Responsive design',
    ],
    status: 'Completed',
    github: 'https://github.com/Ali-Waked/transfer-file',
    youtube: 'https://youtu.be/OOTvFpdsENU',
    caseStudy: '',
    featured: true,
  },
  {
    id: 4,
    slug: 'writeflow',
    title: 'WriteFlow AI',
    category: 'AI Platform',
    accent: '#8b5cf6',
    description: 'An AI-powered writing platform that helps users generate articles, marketing content, blog posts, and professional documents using modern LLM APIs.',
    overview: `WriteFlow AI is an intelligent content generation platform that leverages modern Large Language Models to help users produce high-quality written content in seconds. The application is designed for marketers, bloggers, students, entrepreneurs, and businesses that need professional content creation with minimal effort.

Users can generate blog articles, marketing copy, social media posts, product descriptions, emails, technical documentation, and creative writing through a clean and user-friendly interface. The platform manages AI conversations, stores generated content, and allows users to revisit previous sessions for editing or regeneration.

The application focuses on providing fast, accurate, and customizable AI-powered writing while maintaining an intuitive workflow that simplifies the entire content creation process.`,
    image: writeflowImage,
    technologies: ['Laravel', 'Vue.js', 'Groq AI API', 'REST API', 'MySQL'],
    highlights: ['AI Content Generation', 'Articles & Blog Posts', 'Marketing Content', 'LLM API Integration'],
    metrics: ['AI Powered', 'LLM Integration', 'Content Generation'],
    features: [
      'AI-powered text generation',
      'Multiple content templates',
      'Conversation history',
      'Content management',
      'User authentication',
      'Responsive interface',
      'Secure API integration',
      'Fast generation workflow',
    ],
    status: 'Completed',
    github: 'https://github.com/Ali-Waked/writeFlowWithAi',
    youtube: 'https://youtu.be/51VcDcAO_yU',
    caseStudy: '',
    featured: true,
  },
  {
    id: 5,
    slug: 'taskflow',
    title: 'TaskFlow AI',
    category: 'Productivity',
    accent: '#f97316',
    description: 'An AI-powered task management platform that combines personal task tracking with AI-driven planning, turning feature descriptions into structured tasks, agile backlogs, and sprint plans.',
    overview: `TaskFlow AI is an intelligent productivity platform that combines traditional task management with artificial intelligence. Users can organize personal tasks while utilizing AI to automatically break complex project requirements into actionable development tasks, agile backlogs, and sprint planning.

The platform enables users to create, update, prioritize, and monitor their daily tasks while AI assists in project planning by generating structured task lists from simple feature descriptions. This significantly reduces planning time and improves software development workflows.`,
    image: taskflowImage,
    technologies: ['Laravel', 'Vue.js', 'Groq AI', 'MySQL'],
    highlights: ['Task Management', 'AI Task Generation', 'Sprint Planning', 'Agile Backlog'],
    metrics: ['AI Powered', 'Productivity'],
    features: [
      'Personal task management',
      'AI task generation',
      'Agile backlog creation',
      'Sprint planning',
      'Task prioritization',
      'Status management',
      'User authentication',
      'Responsive dashboard',
    ],
    status: 'Portfolio Project',
    github: 'https://github.com/Ali-Waked/to-do',
    youtube: 'https://youtu.be/D5hmR1fvctM',
    caseStudy: '',
    featured: false,
  },
  {
    id: 6,
    slug: 'swiftshare',
    title: 'SwiftShare',
    category: 'File Sharing',
    accent: '#38bdf8',
    description: 'A secure file transfer platform inspired by WeTransfer, allowing users to upload, manage, and share files through temporary download links with full upload history.',
    overview: `SwiftShare is a secure file transfer platform inspired by WeTransfer, allowing users to upload, manage, and share files through temporary download links. The application provides a clean and intuitive interface for securely transferring large files without requiring complex configurations.

Users can upload files, generate secure sharing links, manage upload history, and monitor download activity. The platform is optimized for speed, simplicity, and reliability while maintaining a modern user experience.`,
    image: swiftshareImage,
    technologies: ['Laravel', 'Blade', 'MySQL'],
    highlights: ['File Upload & Download', 'Shareable Links', 'Upload History', 'File Validation'],
    metrics: ['File Sharing'],
    features: [
      'Secure file uploads',
      'Download link generation',
      'File management',
      'Upload history',
      'Responsive interface',
      'Authentication',
      'File validation',
    ],
    status: 'Portfolio Project',
    github: 'https://github.com/Ali-Waked/transfer-file',
    youtube: 'https://youtu.be/2NSidZVDkvU',
    caseStudy: '',
    featured: false,
  },
  {
    id: 7,
    slug: 'storeclothes',
    title: 'Store Clothes',
    category: 'E-Commerce',
    accent: '#ec4899',
    description: 'An e-commerce store for clothing, featuring product catalogs, categories, shopping cart, and a streamlined checkout flow for a complete online shopping experience.',
    overview: `Store Clothes is an e-commerce store dedicated to clothing, designed to deliver a smooth online shopping experience. Customers can browse a product catalog organized by categories, add items to their cart, and complete orders through a clean and straightforward checkout flow.

The platform covers the full shopping journey with product listings, category browsing, cart management, and order handling, all wrapped in a responsive interface that works across desktop and mobile devices.`,
    image: storeclothesImage,
    technologies: ['Laravel', 'Vue.js', 'PHP', 'MySQL', 'Tailwind CSS'],
    highlights: ['Product Catalog', 'Categories', 'Shopping Cart', 'Checkout Flow'],
    metrics: ['E-Commerce', 'Clothing Store'],
    features: [
      'Product catalog',
      'Category browsing',
      'Shopping cart',
      'Checkout flow',
      'Order management',
      'Responsive interface',
    ],
    status: 'Portfolio Project',
    github: 'https://github.com/Ali-Waked/store-clothes',
    youtube: 'https://youtu.be/51VcDcAO_yU',
    caseStudy: '',
    featured: false,
  },
  {
    id: 8,
    slug: 'ellamart',
    title: 'Ellamart',
    category: 'E-Commerce',
    accent: '#f59e0b',
    description: 'An e-commerce marketplace application with product listings, shopping cart, secure checkout, and order tracking designed for a smooth shopping experience.',
    overview: `Ellamart is an e-commerce marketplace application built around a smooth, end-to-end shopping experience. It provides product listings, a functional shopping cart, secure checkout, and order tracking so customers can move from browsing to delivery with confidence.

The platform handles the core marketplace flows — browsing products, managing cart contents, processing orders, and tracking their status — through a responsive and user-friendly interface.`,
    image: ellamartImage,
    technologies: ['Laravel', 'Vue.js', 'PHP', 'MySQL', 'Tailwind CSS', 'Sanctum'],
    highlights: ['Product Listings', 'Shopping Cart', 'Secure Checkout', 'Order Tracking'],
    metrics: ['E-Commerce', 'Marketplace'],
    features: [
      'Product listings',
      'Shopping cart',
      'Secure checkout',
      'Order tracking',
      'User accounts',
      'Responsive interface',
    ],
    status: 'Portfolio Project',
    github: 'https://github.com/Ali-Waked/ecommerce-vue.js',
    youtube: 'https://youtu.be/IyI3mSNVp08',
    caseStudy: '',
    featured: false,
  },
  {
    id: 9,
    slug: 'searchmeals',
    title: 'Search Meals',
    category: 'Food & Recipes',
    accent: '#ef4444',
    description: 'A meals and recipes search application that lets users browse, filter, and discover dishes with details on ingredients and preparation.',
    overview: `Search Meals is a meals and recipes search application that makes discovering new dishes simple. Users can search for meals, filter by category, and open detailed views showing the ingredients and preparation steps for each recipe.

Built around a public recipes API, the application demonstrates clean API integration, filtering, and responsive presentation of dynamic content across desktop and mobile.`,
    image: searchmealsImage,
    technologies: ['Vue.js', 'JavaScript', 'Tailwind CSS', 'REST API'],
    highlights: ['Meal Search', 'Category Filtering', 'Recipe Details', 'API Integration'],
    metrics: ['Food & Recipes'],
    features: [
      'Meal search',
      'Category filtering',
      'Recipe details',
      'API integration',
      'Responsive interface',
    ],
    status: 'Portfolio Project',
    github: 'https://github.com/Ali-Waked/search-meals-vue.js',
    youtube: 'https://youtu.be/ds95z1rRlgo',
    caseStudy: '',
    featured: false,
  },
  {
    id: 10,
    slug: 'swaply',
    title: 'Swaply',
    category: 'Community',
    accent: '#10b981',
    description: 'A platform that enables users to list and swap items with others, featuring user accounts, item listings, and swap requests between members.',
    overview: `Swaply is a community platform that lets users list items they no longer need and swap them with other members. It combines user accounts, item listings, and a swap request flow so members can discover items, request exchanges, and manage their swaps in one place.

The platform covers the core community flows — registration and profiles, publishing listings, browsing what others offer, and sending or reviewing swap requests — through a clean, responsive interface.`,
    image: swaplyImage,
    technologies: ['Laravel', 'Vue.js', 'PHP', 'MySQL', 'Tailwind CSS', 'Sanctum'],
    highlights: ['Item Listings', 'User Accounts', 'Swap Requests'],
    metrics: ['Community Platform'],
    features: [
      'Item listings',
      'User accounts',
      'Swap requests',
      'Responsive interface',
    ],
    status: 'Portfolio Project',
    github: 'https://github.com/ahmed-al-barbari/nabdh',
    githubFrontend: 'https://github.com/Ali-Waked/Swaply',
    youtube: 'https://youtu.be/NTIHT8mpYYI',
    caseStudy: '',
    featured: false,
  },
]
