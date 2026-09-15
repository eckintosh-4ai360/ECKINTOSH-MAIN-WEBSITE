export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  deliverables: string[];
  idealFor: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  description: string;
  keyFeatures: string[];
  metrics: { label: string; value: string }[];
  status: 'Live in Production' | 'In Beta' | 'Enterprise Ready';
  category: string;
  demoData?: {
    totalStudents?: string;
    feesCollected?: string;
    attendanceRate?: string;
    activeModules?: string[];
  };
}

export interface Industry {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  solutions: string[];
  keyBenefit: string;
  exampleUseCases: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  tags: string[];
  summary: string;
  challenge: string;
  solution: string;
  architecture: string[];
  technologies: string[];
  impact: { metric: string; detail: string }[];
  heroImage: string;
  uiHighlights: { title: string; desc: string }[];
}

export interface InsightArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: { name: string; role: string; avatar: string };
  contentParagraphs: string[];
  keyTakeaways: string[];
}

export const TRUST_STATS = [
  { value: "1+", label: "Live Products", sub: "Flagship School Platform live", highlight: true },
  { value: "1,200+", label: "Users Served", sub: "Students, staff & parents daily", highlight: false },
  { value: "5+", label: "Industries Supported", sub: "Education, Logistics, HR & Retail", highlight: false },
  { value: "Ghana", label: "Built in Africa", sub: "Accra Engineering Hub", highlight: true }
];

export const SERVICES: Service[] = [
  {
    id: "software-engineering",
    title: "Software Engineering",
    shortDesc: "Custom platforms built around your organization's workflows.",
    fullDesc: "We engineer resilient, custom web applications and core management backbones designed specifically to fit your operational logic—eliminating manual bottlenecks and software mismatch.",
    iconName: "Code2",
    features: [
      "Custom Workflow Automation",
      "Role-Based Access Control",
      "Secure RESTful & GraphQL APIs",
      "Database Optimization & Architecture"
    ],
    deliverables: ["Cloud Web Application", "Admin Dashboard", "REST API Documentation", "Source Code Ownership"],
    idealFor: "Mid-to-large businesses needing tailormade internal systems."
  },
  {
    id: "mobile-apps",
    title: "Mobile Applications",
    shortDesc: "Modern Android and iOS experiences designed around your customers.",
    fullDesc: "We craft fast, intuitive mobile apps using Flutter and native frameworks that deliver seamless user journeys, offline synchronization, and instant local mobile money integrations.",
    iconName: "Smartphone",
    features: [
      "Cross-Platform iOS & Android",
      "Integrated Mobile Money (MTN, Telecel, AT)",
      "Push Notifications & Offline Support",
      "Biometric Authentication"
    ],
    deliverables: ["App Store & Play Store Submissions", "Mobile App Source Code", "Analytics Integration"],
    idealFor: "Consumer brands, logistics networks, and service platforms."
  },
  {
    id: "business-systems",
    title: "Business Management Systems",
    shortDesc: "Digitize operations, automate workflows and centralize your data.",
    fullDesc: "Transition your business away from error-prone spreadsheets into a unified management hub that handles inventory, billing, staff activity, and operational reporting in real time.",
    iconName: "LayoutDashboard",
    features: [
      "Automated Invoicing & Billing",
      "Real-Time Operational Analytics",
      "Staff & Resource Scheduling",
      "Centralized Audit Logs"
    ],
    deliverables: ["ERP/CRM System", "Custom Reporting Engine", "Staff Training Sessions"],
    idealFor: "Schools, healthcare clinics, utility providers, and corporate offices."
  },
  {
    id: "ai-automation",
    title: "AI & Automation",
    shortDesc: "Use AI and automation to reduce repetitive work and improve decision-making.",
    fullDesc: "Embed intelligent algorithms, automated document parsing, predictive data reporting, and smart chatbots into your existing workflows to elevate output quality and cut turnaround time.",
    iconName: "Cpu",
    features: [
      "Automated Document Processing",
      "Predictive Analytics & Forecasting",
      "Smart Customer Support Bots",
      "Automated Reconciliation"
    ],
    deliverables: ["AI Workflow Agents", "Automated Pipelines", "Custom Model Tuning"],
    idealFor: "Forward-thinking enterprises looking to streamline heavy administrative tasks."
  },
  {
    id: "web-experiences",
    title: "Websites & Digital Experiences",
    shortDesc: "Fast, responsive web experiences optimized for high conversion and modern brand positioning.",
    fullDesc: "We build ultra-fast, visually striking web experiences that position your organization as an industry leader while driving measurable conversions.",
    iconName: "Globe",
    features: [
      "Next-Gen Front-End Architecture",
      "Search Engine Optimization (SEO)",
      "Interactive Product Demos",
      "CMS Integration"
    ],
    deliverables: ["Production Web Platform", "Content Management System", "SEO Strategy Setup"],
    idealFor: "Corporate entities, institutions, and high-growth technology startups."
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "eckintosh-school",
    name: "Eckintosh School Management",
    subtitle: "A modern platform helping schools manage students, academics, fees, staff and communication from one place.",
    badge: "Flagship Live Product",
    status: "Live in Production",
    category: "EdTech & Institutional",
    description: "Built ground-up for educational institutions in Ghana and across Africa. Eliminates administrative drag by connecting school leadership, teachers, accountants, and parents through one secure system.",
    keyFeatures: [
      "Automated Fee Tracking & Mobile Money Payment Gateway",
      "Digital Terminal Reports & Cumulative Assessment Calculation",
      "Parent SMS & Portal Communication Engine",
      "Staff Attendance & Payroll Integration"
    ],
    metrics: [
      { label: "Active Students", value: "1,248" },
      { label: "Term Fees Processed", value: "₵42,500+" },
      { label: "Fee Collection Efficiency", value: "+94%" },
      { label: "Teacher Hours Saved/Week", value: "18 hrs" }
    ],
    demoData: {
      totalStudents: "1,248",
      feesCollected: "₵42,500",
      attendanceRate: "98.4%",
      activeModules: ["Academic Portal", "Fee Management", "Parent SMS", "Staff Ledger"]
    }
  },
  {
    id: "cleanconnect",
    name: "CleanConnect Waste Management Platform",
    subtitle: "Connecting households, waste collectors and administrators through a unified digital platform.",
    badge: "Public Infrastructure Tech",
    status: "Enterprise Ready",
    category: "Civic & Logistics",
    description: "A smart environmental management ecosystem that coordinates waste collection routes, citizen pickup requests, payment subscriptions, and dispatch fleet tracking.",
    keyFeatures: [
      "GPS Pickup Location Mapping",
      "Automated Subscription Renewal via MoMo",
      "Collector Route Optimization App",
      "Municipal Oversight Admin Console"
    ],
    metrics: [
      { label: "Route Efficiency", value: "+38%" },
      { label: "Payment Adherence", value: "91%" },
      { label: "Dispatch Response Time", value: "< 15 mins" }
    ]
  },
  {
    id: "eckintosh-hr",
    name: "Eckintosh HR & Operations System",
    subtitle: "Streamline employee management, leave, payroll and organizational workflows.",
    badge: "Enterprise SaaS",
    status: "Enterprise Ready",
    category: "Corporate Systems",
    description: "Designed for African corporate environments to manage leave requests, tax compliance (GRA/SSNIT), performance evaluations, and internal company communications.",
    keyFeatures: [
      "Ghana Tax & Pension Deductions Engine",
      "Self-Service Employee Portal",
      "Leave & Overtime Approval Chains",
      "Performance Review Tracking"
    ],
    metrics: [
      { label: "Payroll Processing Time", value: "Reduced by 80%" },
      { label: "Employee Adoption", value: "99%" }
    ]
  },
  {
    id: "adepa-mall",
    name: "Adepa Mall Commerce Engine",
    subtitle: "Multi-merchant digital marketplace ecosystem integrated with Mobile Money and Paystack.",
    badge: "E-Commerce Tech",
    status: "In Beta",
    category: "Retail & FinTech",
    description: "Empowers local merchants to launch digital storefronts while giving buyers a unified mobile shopping checkout with automated escrow and delivery tracking.",
    keyFeatures: [
      "Instant MoMo & Card Checkout",
      "Merchant Inventory Management",
      "Automated Rider Dispatch API",
      "Real-Time Sales Ledger"
    ],
    metrics: [
      { label: "Merchant Onboarding", value: "< 10 mins" },
      { label: "Checkout Completion", value: "96%" }
    ]
  }
];

export const INDUSTRIES: Industry[] = [
  {
    id: "education",
    name: "Education",
    tagline: "School management • LMS • Parent portals",
    description: "Transforming how primary, secondary, and tertiary institutions manage academic records, finances, and communication.",
    iconName: "GraduationCap",
    keyBenefit: "Eliminates administrative paper trails and accelerates tuition fee collection through automated digital channels.",
    solutions: [
      "Eckintosh School Management Portal",
      "Parent Mobile Application",
      "E-Learning & Digital Assignment Portal",
      "Automated Report Card Generators"
    ],
    exampleUseCases: [
      "Processing terminal exams and automated GPA/grade calculation",
      "Direct mobile money tuition payment with instant digital receipt",
      "Real-time SMS notification to parents when student arrives at school"
    ]
  },
  {
    id: "healthcare",
    name: "Healthcare",
    tagline: "Patient systems • Health platforms • Digital records",
    description: "Secure, compliant digital systems for clinics, diagnostic centers, and community health networks.",
    iconName: "Activity",
    keyBenefit: "Reduces patient waiting times and secures patient history with instant digital lookup.",
    solutions: [
      "Patient Electronic Health Records (EHR)",
      "Clinic Appointment & Scheduling Engine",
      "Pharmacy Inventory & Prescription System",
      "Telemedicine & Consultation Apps"
    ],
    exampleUseCases: [
      "Instant lookup of patient medical histories across multiple clinic branches",
      "SMS appointment reminders and prescription refill notifications",
      "Inventory tracking for drugs with automatic expiry warnings"
    ]
  },
  {
    id: "retail",
    name: "Retail & Commerce",
    tagline: "POS • Inventory • E-commerce",
    description: "Digital tools enabling merchants and distributors to manage inventory, process payments, and reach customers online.",
    iconName: "ShoppingBag",
    keyBenefit: "Prevents inventory leakage and gives business owners real-time visibility over multi-location sales.",
    solutions: [
      "Cloud Point-of-Sale (POS)",
      "Multi-Store Inventory Management",
      "Mobile Commerce Applications",
      "Loyalty & Customer Rewards Engine"
    ],
    exampleUseCases: [
      "Unified inventory syncing across physical store and online shop",
      "Accepting MoMo payments at checkout with instant receipt printing",
      "Daily profit and loss automated summary sent to owner's WhatsApp"
    ]
  },
  {
    id: "logistics",
    name: "Logistics & Transport",
    tagline: "Fleet • Delivery • Route Tracking",
    description: "Digital coordination tools for haulers, last-mile delivery providers, and municipal transport systems.",
    iconName: "Truck",
    keyBenefit: "Optimizes fuel usage and route timing while giving customers live delivery visibility.",
    solutions: [
      "Fleet Tracking & Maintenance Hub",
      "Driver Mobile Dispatch App",
      "Customer Package Tracking Portal",
      "Automated Waybill & Billing"
    ],
    exampleUseCases: [
      "Dynamic route optimization for garbage and parcel collection",
      "Digital proof of delivery with signature and GPS snapshot",
      "Automated vehicle maintenance reminders based on distance logged"
    ]
  },
  {
    id: "finance",
    name: "Finance & Microfinance",
    tagline: "Payment platforms • Financial dashboards • Savings portals",
    description: "Secure digital infrastructure for micro-credit, savings schemes, and fintech ventures.",
    iconName: "Landmark",
    keyBenefit: "Automates loan disbursement, interest calculation, and repayment tracking.",
    solutions: [
      "Micro-Loan Application & Credit Scoring",
      "Susu & Savings Collection Platform",
      "Financial Analytics Dashboard",
      "Paystack & Hubtel Gateway Integration"
    ],
    exampleUseCases: [
      "Automated field agent deposit logging via offline mobile app",
      "SMS alerts for loan repayment due dates",
      "Real-time liquidity and audit trail dashboards"
    ]
  },
  {
    id: "corporate",
    name: "Corporate Enterprises",
    tagline: "ERP • HR • Workflow automation",
    description: "Custom enterprise software for mid-market and corporate entities needing tailored digital operations.",
    iconName: "Building2",
    keyBenefit: "Connects departmental silos into one clear executive decision framework.",
    solutions: [
      "Custom Enterprise Resource Planning (ERP)",
      "HR & GRA/SSNIT Compliant Payroll",
      "Vendor Procurement & Approval System",
      "Document Archival & Search"
    ],
    exampleUseCases: [
      "Multi-level purchase order approval workflows on mobile",
      "Automated payroll slip generation and bank file exports",
      "Centralized policy document repository"
    ]
  },
  {
    id: "startups",
    name: "Startups & Innovators",
    tagline: "MVPs • SaaS • Mobile products",
    description: "Rapid high-quality product engineering for founders turning ambitious concepts into market-validated products.",
    iconName: "Rocket",
    keyBenefit: "Accelerates time-to-market with scalable code architecture built to attract investment.",
    solutions: [
      "Minimum Viable Product (MVP) Engineering",
      "SaaS Multi-Tenant Architecture",
      "API & Integrations Platform",
      "Product Strategy & Technical Specs"
    ],
    exampleUseCases: [
      "Launching a working mobile MVP in 6 weeks",
      "Scaling SaaS database architecture for thousands of concurrent users",
      "Setting up payment rails and recurring subscription billing"
    ]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "school-management-case",
    title: "Eckintosh School Management System",
    client: "Partner Schools in Ghana",
    industry: "Education • SaaS • Management",
    tags: ["Education", "SaaS", "Mobile Money"],
    summary: "Digitizing student administration, academic management, and school fee collection for educational institutions in Ghana.",
    challenge: "The school relied on manual ledger books, printed receipts, and paper-based result compilation. Parents frequently stood in long bank queues to pay fees, and staff spent over 30 hours per term compiling terminal report cards by hand, leading to accounting errors and delayed report distribution.",
    solution: "We engineered the Eckintosh School Management System—a centralized web application integrated with Mobile Money payment APIs and automated SMS notification engines. Teachers input marks digitally, grades auto-calculate based on WAEC/GES standards, and parents receive instant fee receipts and digital result slips on their mobile phones.",
    architecture: [
      "React + TypeScript modern dashboard interface",
      "Node.js microservices with PostgreSQL relational schema",
      "Paystack & Hubtel Mobile Money API integration",
      "Automated SMS gateway for instant parent notification"
    ],
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Paystack API", "SMS Gateway", "Tailwind CSS"],
    impact: [
      { metric: "94%", detail: "On-time fee collection achieved within the first term" },
      { metric: "18 hrs/wk", detail: "Saved per teacher in report preparation and grading" },
      { metric: "100%", detail: "Digital audit trail created for all school expenditures and revenue" }
    ],
    heroImage: "/images/case-school.jpg",
    uiHighlights: [
      { title: "Student Academic Ledger", desc: "Instant GPA and cumulative grade calculation with GES curriculum compliance." },
      { title: "Mobile Money Fee Portal", desc: "Parents pay tuition via MTN MoMo / Telecel Cash with instant automated SMS receipts." },
      { title: "Staff & Payroll Hub", desc: "Automated teacher attendance tracking and salary distribution records." }
    ]
  },
  {
    id: "cleanconnect-case",
    title: "CleanConnect Waste Management Ecosystem",
    client: "CleanConnect Operations",
    industry: "Waste Management • Mobile • Payments",
    tags: ["Civic Tech", "Mobile", "Logistics"],
    summary: "A digital waste-management platform connecting customers, collectors, and municipal administrators through a unified mobile & web workflow.",
    challenge: "Urban waste collection was hampered by erratic pickup schedules, manual cash collection on delivery, unmapped route paths, and poor communication between municipal operators and residential clients.",
    solution: "Eckintosh designed CleanConnect—a multi-sided digital product comprising a customer service booking mobile app, a driver dispatch app with GPS mapping, and an administrative control panel for real-time operations monitoring.",
    architecture: [
      "Flutter cross-platform app for drivers & residents",
      "Firebase real-time geolocation tracking engine",
      "Node.js backend with route clustering logic",
      "Direct Mobile Money subscription billing"
    ],
    technologies: ["Flutter", "Firebase", "Node.js", "Google Maps API", "Paystack", "Tailwind CSS"],
    impact: [
      { metric: "+38%", detail: "Increase in daily driver collection route efficiency" },
      { metric: "91%", detail: "Digital automated subscription payment retention" },
      { metric: "15 mins", detail: "Average dispatch time for special pickup requests" }
    ],
    heroImage: "/images/case-cleanconnect.jpg",
    uiHighlights: [
      { title: "Live Fleet Tracking", desc: "Admins view exact truck locations and route completion percentages live on map." },
      { title: "Resident Booking Mobile App", desc: "Citizens schedule waste pickups and pay monthly subscriptions effortlessly." }
    ]
  },
  {
    id: "adepa-mall-case",
    title: "Adepa Mall Digital Marketplace",
    client: "Adepa Retail Group",
    industry: "E-commerce • Mobile • Payments",
    tags: ["E-Commerce", "Flutter", "Paystack"],
    summary: "A digital marketplace connecting customers and local merchants through a unified mobile shopping and instant delivery experience.",
    challenge: "Local brick-and-mortar merchants struggled to sell online due to fragmented delivery logistics, lack of trustworthy digital payment mechanisms, and complex e-commerce software.",
    solution: "We built the Adepa Mall mobile platform with zero-friction merchant store onboarding, single-tap Mobile Money payment integration, and real-time rider assignment.",
    architecture: [
      "Flutter high-performance cross-platform mobile frontend",
      "Laravel REST API backend with elastic search",
      "Paystack multi-split payment engine for merchant payouts",
      "Rider tracking API"
    ],
    technologies: ["Flutter", "Laravel", "MySQL", "Paystack Multi-Split API", "Redis", "Vercel"],
    impact: [
      { metric: "10 mins", detail: "Average time for a new merchant to set up store & list products" },
      { metric: "96%", detail: "Payment completion rate via Mobile Money checkout" },
      { metric: "3.5x", detail: "Growth in repeat purchases within 60 days of launch" }
    ],
    heroImage: "/images/case-adepa.jpg",
    uiHighlights: [
      { title: "Instant Merchant Onboarding", desc: "Sellers list products straight from smartphone cameras with automated pricing catalog." },
      { title: "Unified MoMo Checkout", desc: "One-click checkout supporting MTN MoMo, Telecel Cash, and Visa/Mastercard." }
    ]
  }
];

export const WHY_US_PILLARS = [
  {
    title: "Business-first thinking",
    description: "We understand the problem before writing the code. Every architectural choice we make is aligned with your revenue, efficiency, and organizational goals.",
    iconName: "Target"
  },
  {
    title: "Built for scale",
    description: "Our systems are designed to grow smoothly with your organization—from your first 100 users to hundreds of thousands without re-engineering.",
    iconName: "TrendingUp"
  },
  {
    title: "Modern technology",
    description: "We utilize modern development practices, secure cloud backbones, and battle-tested frameworks like React, Flutter, and Node.js.",
    iconName: "Layers"
  },
  {
    title: "Human support",
    description: "You work directly with the senior engineers building your product. No confusing middle management or slow ticket queues.",
    iconName: "Users"
  },
  {
    title: "Long-term partnership",
    description: "We don't disappear after deployment. We continuous support, monitor, update, and scale your technology as your business evolves.",
    iconName: "ShieldCheck"
  }
];

export const HOW_WE_WORK_STEPS = [
  {
    step: "01",
    title: "Discover",
    summary: "Understand your business and identify the real problem.",
    details: "We conduct deep discovery sessions to analyze your existing workflows, identify operational friction, define success metrics, and map out clear technical requirements before writing a single line of code."
  },
  {
    step: "02",
    title: "Design",
    summary: "Create the experience and architecture.",
    details: "Our UI/UX designers and systems architects collaborate to create interactive wireframes, seamless user journeys, and robust database schemas that feel natural and intuitive."
  },
  {
    step: "03",
    title: "Build",
    summary: "Develop and test the solution.",
    details: "Using iterative agile sprints, our engineers build your platform with clean, documented code, rigorous security testing, mobile money payment integrations, and automated quality assurance."
  },
  {
    step: "04",
    title: "Launch",
    summary: "Deploy and train your team.",
    details: "We handle cloud infrastructure deployment, data migration, domain setup, and conduct comprehensive hands-on training for your administrators, staff, and end-users."
  },
  {
    step: "05",
    title: "Grow",
    summary: "Maintain, improve and scale.",
    details: "Post-launch, we actively monitor performance, maintain security protocols, provide quick technical support, and regularly roll out feature enhancements as your operational needs expand."
  }
];

export const TECH_CATEGORIES = [
  {
    category: "Frontend",
    items: [
      { name: "React / Next.js", level: "Primary Web Stack", desc: "High-performance web apps & dashboards" },
      { name: "Flutter", level: "Mobile Platform", desc: "Cross-platform iOS & Android mobile apps" },
      { name: "Tailwind CSS", level: "Styling", desc: "Modern, responsive UI design systems" },
      { name: "TypeScript", level: "Language", desc: "Type-safe robust web applications" }
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js / Express", level: "Primary API", desc: "Fast, event-driven web servers & APIs" },
      { name: "Laravel", level: "Enterprise PHP", desc: "Robust backend engines & complex web portals" },
      { name: "Firebase", level: "Real-Time Engine", desc: "Instant sync, auth & live data streams" }
    ]
  },
  {
    category: "Data & Storage",
    items: [
      { name: "PostgreSQL", level: "Relational DB", desc: "ACID-compliant enterprise databases" },
      { name: "MySQL", level: "Relational DB", desc: "Proven structured data storage" },
      { name: "MongoDB", level: "NoSQL", desc: "Flexible document-based data management" },
      { name: "Redis", level: "Caching", desc: "In-memory speed caching & session storage" }
    ]
  },
  {
    category: "Cloud & Infrastructure",
    items: [
      { name: "Vercel", level: "Frontend Hosting", desc: "Edge deployment & high availability" },
      { name: "Google Cloud Platform", level: "Cloud Hosting", desc: "Scalable server instances & microservices" },
      { name: "AWS", level: "Storage & CDN", desc: "Secure cloud assets & automated backups" }
    ]
  },
  {
    category: "Payments & Telecom",
    items: [
      { name: "Paystack API", level: "Card & MoMo", desc: "Automated checkout & settlement" },
      { name: "Mobile Money (MTN / Telecel / AT)", level: "Telco Payments", desc: "Direct consumer mobile payments in Africa" },
      { name: "Hubtel SMS / Payments", level: "Messaging & Gateway", desc: "Institutional SMS notifications & payouts" }
    ]
  }
];

export const TESTIMONIALS = [
  {
    id: "test-1",
    quote: "Switching to Eckintosh School Management completely eliminated our end-of-term chaos. Parents can now pay fees directly via Mobile Money without standing in bank queues, and our teachers save nearly 20 hours every term compiling report cards.",
    author: "Rev. Emmanuel Osei",
    role: "Head Administrator & Principal",
    organization: "Grace Academy International",
    location: "Accra, Ghana",
    highlight: "94% fee collection efficiency achieved in Term 1"
  },
  {
    id: "test-2",
    quote: "Eckintosh engineered our custom waste management platform from scratch. The clarity of their software architecture and their hands-on support in training our field staff made the transition effortless. They truly understand business operations.",
    author: "Kwadwo Amankwah",
    role: "Chief Operating Officer",
    organization: "CleanConnect Systems",
    location: "Greater Accra, Ghana",
    highlight: "Optimized driver routes by 38%"
  },
  {
    id: "test-3",
    quote: "What sets Eckintosh apart is their business-first engineering approach. They don't just build code; they deeply analyze the problem, challenge our assumptions, and build systems that scale cleanly.",
    author: "Abena Mansa Kyei",
    role: "Managing Director",
    organization: "Aura Health & Retail",
    location: "Kumasi, Ghana",
    highlight: "Zero downtime during seasonal peak traffic"
  }
];

export const INSIGHTS: InsightArticle[] = [
  {
    id: "insight-1",
    title: "5 ways Ghanaian schools can reduce administrative workload",
    category: "EdTech & Operations",
    readTime: "4 min read",
    date: "Feb 2026",
    excerpt: "Discover how digital terminal reports, automated SMS notifications, and mobile money tuition payments eliminate paper chaos in school administration.",
    author: {
      name: "Engineering Lead",
      role: "Eckintosh EdTech Unit",
      avatar: "E"
    },
    keyTakeaways: [
      "Eliminate manual paper tallying for terminal reports.",
      "Integrate MTN MoMo / Telecel Cash direct into fee collection ledgers.",
      "Automate attendance alerts to parents via SMS."
    ],
    contentParagraphs: [
      "For decades, school administrators in Ghana spent weeks at the close of every academic term tallying paper assessment sheets, manually writing terminal reports, and reconciling bank receipts.",
      "By adopting a unified school management platform, institutions can digitize grade input. GES/WAEC weightings auto-calculate grade point averages in real-time, eliminating human calculation error.",
      "Furthermore, when tuition fees are collected via integrated Mobile Money gateways, parents receive instant digital receipts on their mobile phones while the school bursar sees automated real-time settlement without manual bank reconciliation."
    ]
  },
  {
    id: "insight-2",
    title: "Why businesses should move from spreadsheets to custom management systems",
    category: "Enterprise Systems",
    readTime: "5 min read",
    date: "Jan 2026",
    excerpt: "Spreadsheets work fine for small teams, but as your business grows, version mismatches, data loss, and lack of role security create expensive operational blind spots.",
    author: {
      name: "Product Strategy Team",
      role: "Eckintosh Technologies",
      avatar: "E"
    },
    keyTakeaways: [
      "Excel sheets lack role-based data security and audit trails.",
      "Custom web platforms centralize live inventory and financial analytics.",
      "Automated alerts prevent inventory stockouts and delayed invoicing."
    ],
    contentParagraphs: [
      "Every growing company starts on Microsoft Excel or Google Sheets. It is accessible and quick. However, once you cross 10 employees or multiple business locations, spreadsheets begin to crack.",
      "Staff overwrite critical cells, pricing discrepancies creep into customer quotes, and business owners lose real-time oversight over inventory stock levels.",
      "A tailormade web-based management system provides role-based access control, automated audit logging, real-time analytics dashboards, and automated WhatsApp/email alerts when key business thresholds are crossed."
    ]
  },
  {
    id: "insight-3",
    title: "How AI is changing business operations in Ghana",
    category: "AI & Innovation",
    readTime: "6 min read",
    date: "Feb 2026",
    excerpt: "From automated invoice reading to predictive inventory restocking, artificial intelligence is no longer just for global tech giants—it is solving everyday operational challenges in West Africa.",
    author: {
      name: "AI Solutions Architect",
      role: "Eckintosh Technologies",
      avatar: "E"
    },
    keyTakeaways: [
      "Document parsing AI reduces manual data entry time by up to 85%.",
      "AI chatbots trained on local business workflows improve customer response time.",
      "Predictive analytics help merchants anticipate seasonal demand spikes."
    ],
    contentParagraphs: [
      "Artificial Intelligence in 2026 is practical, fast, and highly targeted. In Ghana, forward-thinking organizations are embedding lightweight AI workflows into their day-to-day operations.",
      "For instance, logistics and retail businesses use Optical Character Recognition (OCR) and AI parsing to scan supplier receipts and instantly populate inventory systems without manual typing.",
      "By combining AI with robust cloud engineering, local enterprises can deliver customer experiences that rival international software standards."
    ]
  },
  {
    id: "insight-4",
    title: "Building software for African businesses: What actually matters",
    category: "Software Architecture",
    readTime: "5 min read",
    date: "Jan 2026",
    excerpt: "Designing digital products for Africa requires prioritizing mobile-first responsiveness, local mobile money integration, offline resilience, and straightforward user interface design.",
    author: {
      name: "Founder & Lead Architect",
      role: "Eckintosh Technologies",
      avatar: "E"
    },
    keyTakeaways: [
      "Mobile Money is the non-negotiable payment standard across Ghana and West Africa.",
      "Data conservation and fast load speeds dictate user adoption.",
      "Software must accommodate intermittent network connectivity with offline sync."
    ],
    contentParagraphs: [
      "Importing software built for North American or European markets often leads to friction when applied to local business realities in Africa.",
      "In West Africa, over 80% of digital transactions occur via Mobile Money. Systems built here must place MoMo integrations at the absolute core of checkout workflows.",
      "Furthermore, interfaces must be designed for mobile screens first, with lightweight payload footprints that load rapidly even on 3G connections, and resilient local storage that syncs seamlessly when connection is restored."
    ]
  }
];

export interface NavLink {
  label: string;
  href: string;
}

export interface SectionHeaderContent {
  eyebrow: string;
  title: string;
  description: string;
}

export interface HeroDashboardTab {
  id: string;
  label: string;
  iconName: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeTone: 'green' | 'blue' | 'amber';
  productId?: string;
  stats: { iconName: string; label: string; value: string; suffix?: string }[];
  note: string;
  actionLabel?: string;
  footerRight?: string;
}

export interface PlannerOption {
  title: string;
  desc: string;
  iconName: string;
}

export interface SiteContent {
  brand: {
    name: string;
    suffix: string;
    tagline: string;
    adminTitle: string;
  };
  navigation: {
    links: NavLink[];
    ctaLabel: string;
    ctaTopic: string;
  };
  hero: SectionHeaderContent & {
    highlight: string;
    primaryCtaLabel: string;
    primaryCtaTopic: string;
    secondaryCtaLabel: string;
    disciplinesLabel: string;
    disciplines: { label: string; color: string }[];
    dashboardWindowLabel: string;
    dashboardStatusLabel: string;
    dashboardTabs: HeroDashboardTab[];
    floatingCards: { title: string; subtitle: string; iconName: string }[];
  };
  trustBar: SectionHeaderContent & {
    stats: typeof TRUST_STATS;
    footnote: string;
    policy: string;
  };
  services: SectionHeaderContent & {
    items: Service[];
    detailEyebrow: string;
    featuresHeading: string;
    deliverablesHeading: string;
    selectedLabel: string;
    unselectedLabel: string;
    ctaPrefix: string;
  };
  products: SectionHeaderContent & {
    items: Product[];
    ctaLabel: string;
    ctaTopic: string;
  };
  industries: SectionHeaderContent & {
    items: Industry[];
  };
  caseStudies: SectionHeaderContent & {
    filters: string[];
    bannerTitle: string;
    bannerDescription: string;
    bannerCtaLabel: string;
    bannerCtaTopic: string;
  };
  whyUs: SectionHeaderContent & {
    items: typeof WHY_US_PILLARS;
    commitmentLabel: string;
  };
  howWeWork: SectionHeaderContent & {
    items: typeof HOW_WE_WORK_STEPS;
    ctaLabel: string;
    ctaTopic: string;
  };
  techStack: SectionHeaderContent & {
    items: typeof TECH_CATEGORIES;
  };
  testimonials: SectionHeaderContent & {
    items: typeof TESTIMONIALS;
  };
  insights: SectionHeaderContent & {
    items: InsightArticle[];
    ctaLabel: string;
    ctaTopic: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    highlight: string;
    description: string;
    primaryLabel: string;
    primaryTopic: string;
    whatsappLabel: string;
    whatsappUrl: string;
    contactCards: { iconName: string; label: string }[];
  };
  footer: {
    description: string;
    statusLine: string;
    companyLinks: NavLink[];
    solutionLinks: NavLink[];
    productLinks: NavLink[];
    copyright: string;
    whatsappLabel: string;
    whatsappUrl: string;
    directConnectLabel: string;
    directConnectTopic: string;
    locationLabel: string;
  };
  planner: {
    title: string;
    eyebrow: string;
    projectTypePrompt: string;
    projectTypeOptions: PlannerOption[];
    timelineOptions: string[];
    budgetOptions: string[];
    defaultProjectType: string;
    defaultTimeline: string;
    defaultBudget: string;
    whatsappNumber: string;
    successTitle: string;
    successDescription: string;
  };
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  brand: {
    name: 'Eckintosh',
    suffix: '.',
    tagline: 'Technologies',
    adminTitle: 'Eckintosh. Admin',
  },
  navigation: {
    links: [
      { label: 'Home', href: '#hero' },
      { label: 'Solutions', href: '#solutions' },
      { label: 'Services', href: '#services' },
      { label: 'Industries', href: '#industries' },
      { label: 'Our Work', href: '#work' },
      { label: 'About', href: '#why-us' },
      { label: 'Insights', href: '#insights' },
      { label: 'Contact', href: '#contact' },
    ],
    ctaLabel: "Let's Talk",
    ctaTopic: 'General Inquiry',
  },
  hero: {
    eyebrow: 'Intelligent Digital Engineering',
    title: 'Technology that turns complex problems into',
    highlight: 'simple experiences.',
    description:
      'We design and build intelligent software, digital platforms and management systems that help organizations operate smarter, serve customers better and grow with confidence.',
    primaryCtaLabel: 'Start a Project',
    primaryCtaTopic: 'Hero Primary Request',
    secondaryCtaLabel: 'Explore Our Work',
    disciplinesLabel: 'Core Engineering Disciplines',
    disciplines: [
      { label: 'Software Development', color: 'bg-blue-400' },
      { label: 'Mobile Apps', color: 'bg-indigo-400' },
      { label: 'Business Systems', color: 'bg-emerald-400' },
      { label: 'AI & Automation', color: 'bg-amber-400' },
    ],
    dashboardWindowLabel: 'eckintosh-core-v2.6 // live production',
    dashboardStatusLabel: 'Active Systems',
    dashboardTabs: [
      {
        id: 'school',
        label: 'School System',
        iconName: 'GraduationCap',
        title: 'Eckintosh School Management',
        subtitle: 'Grace Academy Portal - Live Academic Term',
        badge: '100% Operational',
        badgeTone: 'green',
        productId: 'eckintosh-school',
        stats: [
          { iconName: 'Users', label: 'Active Enrolled', value: '1,248', suffix: 'Students' },
          { iconName: 'DollarSign', label: 'Fees Collected', value: 'GHS 42,500' },
        ],
        note: 'GES Terminal Assessment & Parent SMS Gateway Integrated',
        actionLabel: 'Inspect Product',
      },
      {
        id: 'business',
        label: 'Dashboard',
        iconName: 'TrendingUp',
        title: 'Business Dashboard',
        subtitle: 'Enterprise Operations & Revenue Engine',
        badge: 'Live Analytics',
        badgeTone: 'blue',
        stats: [{ iconName: 'TrendingUp', label: 'Quarterly Operational Revenue', value: 'Revenue up 24.8%' }],
        note: 'Automated reconciliation with GRA tax rules & Paystack API',
        footerRight: 'Sync: 0.04s',
      },
      {
        id: 'mobile',
        label: 'Mobile App',
        iconName: 'Smartphone',
        title: 'Mobile Application',
        subtitle: 'iOS & Android Ecosystem',
        badge: 'iOS & Android',
        badgeTone: 'amber',
        stats: [{ iconName: 'Smartphone', label: 'Active Mobile Ecosystem', value: '12,480', suffix: 'Active Users' }],
        note: 'MTN Mobile Money, Telecel Cash & AT Pay built-in',
        footerRight: '99.9% Uptime',
      },
    ],
    floatingCards: [
      { title: 'GHS 42,500 Collected', subtitle: 'MTN MoMo Auto-Settled', iconName: 'DollarSign' },
      { title: 'Revenue up 24.8%', subtitle: 'Verified System Analytics', iconName: 'TrendingUp' },
    ],
  },
  trustBar: {
    eyebrow: 'Proven In Production',
    title: 'Technology built for real-world impact',
    description: 'Grounded in genuine operational deployment, verified performance, and continuous iteration.',
    stats: TRUST_STATS,
    footnote: 'Headquartered in Accra, Ghana - Engineering systems for West Africa and global scale',
    policy: 'Transparent metrics policy: No inflated numbers.',
  },
  services: {
    eyebrow: 'What We Do',
    title: 'From idea to intelligent digital product.',
    description:
      'We partner with organizations to eliminate operational friction and engineer reliable software systems tailored to unique institutional logic.',
    items: SERVICES,
    detailEyebrow: 'Service Details',
    featuresHeading: 'Core Engineering Features',
    deliverablesHeading: 'Key Deliverables',
    selectedLabel: 'Viewing Capabilities',
    unselectedLabel: 'Explore Service',
    ctaPrefix: 'Discuss',
  },
  products: {
    eyebrow: 'Our Software Products',
    title: 'Products built to solve real problems.',
    description:
      'We design and own repeatable software systems built ground-up for African institutions, municipalities, and enterprise businesses.',
    items: PRODUCTS,
    ctaLabel: 'Build a Custom Product',
    ctaTopic: 'Custom Product Engineering',
  },
  industries: {
    eyebrow: 'Sector Expertise',
    title: 'Technology for every kind of organization.',
    description:
      "Whether you manage an educational institution, a logistics network, or a financial services enterprise, our engineering patterns adapt to your industry's exact regulatory and operational demands.",
    items: INDUSTRIES,
  },
  caseStudies: {
    eyebrow: 'Case Studies & Systems',
    title: "We don't just show screenshots. We show what we solved.",
    description:
      'Explore how we analyze operational bottlenecks, architect robust software backbones, and deliver measurable outcomes for our enterprise clients.',
    filters: ['All', 'Education', 'Mobile Money', 'Civic Tech', 'E-Commerce'],
    bannerTitle: 'Have a unique system operational challenge?',
    bannerDescription: 'We write clean code engineered specifically around your organizational workflows.',
    bannerCtaLabel: 'Schedule Technical Consultation',
    bannerCtaTopic: 'Custom Work Request',
  },
  whyUs: {
    eyebrow: 'Why Choose Eckintosh',
    title: 'Technology built around your business.',
    description:
      'We operate as an extension of your leadership team, bringing technical clarity, strict accountability, and long-term systems reliability to every partnership.',
    items: WHY_US_PILLARS,
    commitmentLabel: 'Standard Engineering Commitment',
  },
  howWeWork: {
    eyebrow: 'Our Delivery Process',
    title: 'How we turn vision into production technology.',
    description: 'A structured, predictable 5-stage lifecycle designed for corporate clarity, speed to launch, and minimal risk.',
    items: HOW_WE_WORK_STEPS,
    ctaLabel: 'Start Stage 01: Discover Your System Requirements',
    ctaTopic: 'Process & Discovery Call',
  },
  techStack: {
    eyebrow: 'Battle-Tested Architecture',
    title: 'Built with modern technology.',
    description:
      'We use industry-standard, secure frameworks and local telecom payment infrastructure to ensure zero downtime, rapid mobile response, and data security.',
    items: TECH_CATEGORIES,
  },
  testimonials: {
    eyebrow: 'Real Feedback',
    title: "Trusted by organizations building what's next.",
    description:
      'Hear directly from school leaders, operations managers, and business executives who run their core systems on Eckintosh software.',
    items: TESTIMONIALS,
  },
  insights: {
    eyebrow: 'Thought Leadership',
    title: 'Ideas, technology & digital transformation.',
    description:
      'Practical analysis on software engineering, institutional management, and digital strategy built for African business contexts.',
    items: INSIGHTS,
    ctaLabel: 'Book Strategy Session',
    ctaTopic: 'Technical Advisory Session',
  },
  cta: {
    eyebrow: 'Transform Operational Bottlenecks Into High-Performing Systems',
    title: 'Have a problem worth solving?',
    highlight: "Let's turn it into a digital product.",
    description:
      "Tell us what you're trying to build. We'll help you figure out the next step, from technical architecture to rapid deployment.",
    primaryLabel: 'Start a Conversation',
    primaryTopic: 'CTA Section Inquiry',
    whatsappLabel: 'Chat via WhatsApp',
    whatsappUrl: 'https://wa.me/233240000000',
    contactCards: [
      { iconName: 'PhoneCall', label: 'Direct Call: +233 24 000 0000' },
      { iconName: 'MapPin', label: 'Engineering Hub: Accra, Ghana' },
      { iconName: 'ShieldCheck', label: 'Response Time: < 2 Hours' },
    ],
  },
  footer: {
    description:
      'Designing and engineering intelligent software, digital platforms, and business systems for forward-thinking institutions and enterprises across West Africa and globally.',
    statusLine: 'All Systems Operational - Accra Engineering Hub',
    companyLinks: [
      { label: 'About', href: '#why-us' },
      { label: 'Services', href: '#services' },
      { label: 'Industries', href: '#industries' },
      { label: 'Our Work', href: '#work' },
      { label: 'Contact', href: '#contact' },
    ],
    solutionLinks: [
      { label: 'Business Systems', href: '#services' },
      { label: 'Mobile Apps', href: '#services' },
      { label: 'Web Platforms', href: '#services' },
      { label: 'AI & Automation', href: '#services' },
    ],
    productLinks: [
      { label: 'School Management', href: '#solutions' },
      { label: 'Adepa Mall', href: '#solutions' },
      { label: 'CleanConnect Waste', href: '#solutions' },
      { label: 'HR & Payroll Portal', href: '#solutions' },
    ],
    copyright: 'Copyright 2026 Eckintosh Technologies. All rights reserved.',
    whatsappLabel: 'WhatsApp',
    whatsappUrl: 'https://wa.me/233240000000',
    directConnectLabel: 'Direct Connect',
    directConnectTopic: 'General Connect',
    locationLabel: 'Accra, Ghana',
  },
  planner: {
    eyebrow: 'Project Planner & Quote',
    title: "Let's Build Something Smarter",
    projectTypePrompt: 'Select the primary focus for your project:',
    projectTypeOptions: [
      { title: 'Business Systems', desc: 'Custom operations, ERP, HR & Fee Ledgers', iconName: 'Building2' },
      { title: 'School Management System', desc: 'Flagship Eckintosh School SaaS Platform', iconName: 'Sparkles' },
      { title: 'Mobile Applications', desc: 'iOS & Android with Mobile Money payments', iconName: 'Smartphone' },
      { title: 'Software Engineering', desc: 'Custom enterprise web portals & REST APIs', iconName: 'Code2' },
      { title: 'AI & Automation', desc: 'Document parsing, chatbots & workflow automation', iconName: 'Cpu' },
      { title: 'Websites & Web Apps', desc: 'High-conversion modern web presence', iconName: 'Globe' },
    ],
    timelineOptions: ['Urgent (< 1 Month)', '1 - 2 Months', '3+ Months'],
    budgetOptions: ['GHS 10,000 - GHS 25,000', 'GHS 25,000 - GHS 60,000', 'GHS 60,000+ / Enterprise'],
    defaultProjectType: 'Business Systems',
    defaultTimeline: '1 - 2 Months',
    defaultBudget: 'GHS 15,000 - GHS 35,000',
    whatsappNumber: '233240000000',
    successTitle: 'Inquiry Received!',
    successDescription:
      'Our lead software architect in Accra will review your requirements and reach out within 2 hours.',
  },
};
