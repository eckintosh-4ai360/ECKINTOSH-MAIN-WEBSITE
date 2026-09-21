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

export type ProductAccent =
  | 'blue'
  | 'violet'
  | 'cyan'
  | 'teal'
  | 'emerald'
  | 'amber'
  | 'rose'
  | 'fuchsia'
  | 'orange'
  | 'indigo';

export interface ProductModule {
  name: string;
  desc: string;
  iconName: string;
}

export interface Product {
  id: string;
  name: string;
  shortName: string;
  subtitle: string;
  tagline: string;
  badge: string;
  description: string;
  accent: ProductAccent;
  iconName: string;
  keyFeatures: string[];
  metrics: { label: string; value: string }[];
  status: 'Live in Production' | 'In Beta' | 'Enterprise Ready';
  category: string;
  modules: ProductModule[];
  roles: string[];
  integrations: string[];
  outcomes: { value: string; label: string }[];
  stack: string[];
  platforms: string[];
  pricingNote: string;
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
  { value: "9+", label: "Systems Shipped", sub: "Production platforms we own and maintain", highlight: true },
  { value: "1,000+", label: "People Served Daily", sub: "Students, staff, patients, shoppers & clients", highlight: false },
  { value: "8", label: "Industries Supported", sub: "Education, Health, Retail, HR, Beauty & more", highlight: false },
  { value: "Ghana", label: "Built in Africa", sub: "Accra", highlight: true }
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
    id: "school-management",
    name: "Eckintosh School Management System",
    shortName: "School Management",
    subtitle: "One platform for admissions, academics, fees, staff and parent communication.",
    tagline: "Run the entire school from a single screen.",
    badge: "Flagship Live Product",
    status: "Live in Production",
    category: "EdTech & Institutional",
    accent: "blue",
    iconName: "GraduationCap",
    description:
      "Built ground-up for basic and secondary schools in Ghana and across Africa. It removes administrative drag by connecting school leadership, teachers, accountants, students and parents through one secure, audited system that works on any device.",
    keyFeatures: [
      "Automated fee tracking with Mobile Money and card settlement",
      "GES-compliant terminal reports and cumulative assessment engine",
      "Parent SMS broadcast and secure parent portal",
      "Staff attendance, appraisal and payroll integration"
    ],
    metrics: [
      { label: "Active Students", value: "1,248" },
      { label: "Term Fees Processed", value: "GHS 42,500+" },
      { label: "Collection Efficiency", value: "+94%" },
      { label: "Teacher Hours Saved", value: "18 hrs/wk" }
    ],
    modules: [
      { name: "Admissions & Enrolment", desc: "Online application forms, placement shortlists and digital student files.", iconName: "UserPlus" },
      { name: "Academics & Grading", desc: "Class scoresheets, automatic aggregates and printable terminal reports.", iconName: "BookOpen" },
      { name: "Fees & Accounts", desc: "Invoicing, arrears ageing, MoMo reconciliation and receipting.", iconName: "Wallet" },
      { name: "Attendance", desc: "Daily class registers with absence alerts pushed to parents.", iconName: "CalendarCheck" },
      { name: "Staff & Payroll", desc: "Contracts, clock-ins, SSNIT/PAYE deductions and payslips.", iconName: "Users" },
      { name: "Parent Engagement", desc: "SMS, portal announcements and per-child progress timelines.", iconName: "MessageSquare" }
    ],
    roles: ["Head Teacher", "Administrator", "Accountant", "Class Teacher", "Parent", "Student"],
    integrations: ["MTN MoMo", "Telecel Cash", "AT Money", "Paystack", "Hubtel SMS", "Google Workspace"],
    outcomes: [
      { value: "94%", label: "On-time fee collection" },
      { value: "18 hrs", label: "Saved per teacher weekly" },
      { value: "100%", label: "Digital audit trail" }
    ],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Tailwind CSS"],
    platforms: ["Web App", "Parent Mobile Portal", "Offline-tolerant Register"],
    pricingNote: "Per-term licence by enrolment band. Setup, data migration and staff training included.",
    demoData: {
      totalStudents: "1,248",
      feesCollected: "GHS 42,500",
      attendanceRate: "98.4%",
      activeModules: ["Academic Portal", "Fee Management", "Parent SMS", "Staff Ledger"]
    }
  },
  {
    id: "ats-recruitment",
    name: "Applicant Tracking & E-Recruitment System",
    shortName: "Recruitment & ATS",
    subtitle: "Publish roles, screen applicants and run the whole hiring pipeline in one place.",
    tagline: "From job posting to signed offer letter, tracked end to end.",
    badge: "Enterprise Hiring Suite",
    status: "Live in Production",
    category: "HR & Talent Technology",
    accent: "violet",
    iconName: "Users",
    description:
      "An end-to-end recruitment platform for organisations that receive far more applications than they can read. Branded career pages capture applicants, structured screening scores rank them objectively, and every interview, note and offer stays attached to the candidate record.",
    keyFeatures: [
      "Branded career portal with structured application forms",
      "Automatic CV parsing and weighted shortlisting scores",
      "Drag-and-drop hiring pipeline with stage-based automation",
      "Interview scheduling, scorecards and offer letter generation"
    ],
    metrics: [
      { label: "Applications Processed", value: "9,400+" },
      { label: "Screening Time Cut", value: "-72%" },
      { label: "Time to Hire", value: "11 days" },
      { label: "Hiring Managers Onboard", value: "38" }
    ],
    modules: [
      { name: "Career Portal", desc: "Public, branded job board with role filters and applicant accounts.", iconName: "Globe" },
      { name: "CV Parsing", desc: "Extracts skills, education and experience into comparable fields.", iconName: "FileText" },
      { name: "Shortlisting Engine", desc: "Weighted criteria scoring with bias-reducing blind review mode.", iconName: "Filter" },
      { name: "Pipeline Board", desc: "Kanban stages from applied to hired with SLA timers per stage.", iconName: "LayoutDashboard" },
      { name: "Interview Suite", desc: "Panel scheduling, calendar invites and standard scorecards.", iconName: "CalendarCheck" },
      { name: "Offers & Onboarding", desc: "Generated offer letters, e-signature and new-hire checklists.", iconName: "ShieldCheck" }
    ],
    roles: ["HR Director", "Recruiter", "Hiring Manager", "Interview Panel", "Applicant"],
    integrations: ["Google Calendar", "Microsoft 365", "Zoom", "Hubtel SMS", "DocuSign", "LinkedIn Jobs"],
    outcomes: [
      { value: "-72%", label: "Less manual CV screening" },
      { value: "11 days", label: "Average time to hire" },
      { value: "1 record", label: "Single source of truth per candidate" }
    ],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Elasticsearch", "AWS S3"],
    platforms: ["Recruiter Web App", "Public Career Portal", "Applicant Mobile Web"],
    pricingNote: "Licensed per active job requisition or annually for unlimited hiring.",
    demoData: {
      activeModules: ["Career Portal", "Pipeline Board", "Interview Suite", "Offer Desk"]
    }
  },
  {
    id: "ai-assistant",
    name: "EckinDev AI Productivity Platform",
    shortName: "AI Productivity",
    subtitle: "A workspace where projects, sprints, code and standups run together, with AI deciding what matters next.",
    tagline: "Your team's operations hub, with an assistant that has read the backlog.",
    badge: "AI & Automation",
    status: "Live in Production",
    category: "Artificial Intelligence",
    accent: "teal",
    iconName: "Sparkles",
    description:
      "EckinDev pulls a delivery team's whole operation into one workspace \u2014 projects, sprints, tasks, notes, whiteboards, standups and the GitHub repository itself. On top of it sits an assistant that scores every open item for urgency and risk, builds the day's plan, and prepares actions for approval instead of waiting to be asked.",
    keyFeatures: [
      "AI focus ranking that scores every task for urgency and delay risk",
      "Code Ops: browse repositories, edit files and open pull requests in-workspace",
      "Sprints, tasks, standups, notes and whiteboards in one place",
      "Workspace analytics on completion, status mix and overdue pressure"
    ],
    metrics: [
      { label: "Focus Score Accuracy", value: "94%" },
      { label: "Overdue Items Surfaced", value: "Daily" },
      { label: "Commits Tracked", value: "Live" },
      { label: "Actions Need Approval", value: "100%" }
    ],
    modules: [
      { name: "Command Center", desc: "Projects, sprints, deploys and commits with AI focus ranking on top.", iconName: "LayoutDashboard" },
      { name: "AI Assistant", desc: "Prioritises, plans the day, summarises notes and prepares actions.", iconName: "Sparkles" },
      { name: "Code Ops", desc: "Connected repositories, branch snapshots, in-app editing and pull requests.", iconName: "Cpu" },
      { name: "Sprints & Tasks", desc: "Boards, sprint cycles, priorities and status flow across every project.", iconName: "CalendarCheck" },
      { name: "Team & Standups", desc: "Daily standups, blockers, messages and shared team calendar.", iconName: "Users" },
      { name: "Analytics", desc: "Completion trend, status breakdown, priority load and workspace summary.", iconName: "TrendingUp" }
    ],
    roles: ["Workspace Owner", "Engineering Lead", "Developer", "Product Manager", "Reviewer"],
    integrations: ["GitHub", "Claude API", "Groq", "Google Calendar", "Slack", "Webhook API"],
    outcomes: [
      { value: "1 hub", label: "Replaces the board, the repo tab and the standup doc" },
      { value: "Every day", label: "A ranked plan waiting before work starts" },
      { value: "0", label: "Assistant actions saved without confirmation" }
    ],
    stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Groq", "GitHub API"],
    platforms: ["Web Workspace", "Multi-workspace Tenancy", "GitHub Integration"],
    pricingNote: "Per-seat subscription by workspace, with a private deployment option for regulated teams.",
    demoData: {
      activeModules: ["Command Center", "AI Assistant", "Code Ops", "Analytics"]
    }
  },
  {
    id: "pharmacy-management",
    name: "Pharmacy Management System",
    shortName: "Pharmacy",
    subtitle: "Dispensing, prescriptions, stock, expiry control and regulatory reporting.",
    tagline: "Dispense faster. Never lose money to expiry again.",
    badge: "Health & Compliance",
    status: "Live in Production",
    category: "HealthTech",
    accent: "emerald",
    iconName: "Pill",
    description:
      "Purpose-built for community pharmacies and hospital dispensaries. It handles prescription capture, batch-level stock control with expiry alerting, insurance and NHIS claim lines, and produces the records regulators ask for without a paper trail hunt.",
    keyFeatures: [
      "Fast dispensing counter with drug interaction warnings",
      "Batch and expiry tracking with automatic reorder points",
      "Prescription records linked to prescriber and patient history",
      "NHIS / insurance claim lines and controlled-substance register"
    ],
    metrics: [
      { label: "Dispense Time", value: "42s avg" },
      { label: "Expiry Write-offs", value: "-68%" },
      { label: "Stock Accuracy", value: "99.2%" },
      { label: "Daily Scripts", value: "180+" }
    ],
    modules: [
      { name: "Dispensing Counter", desc: "Search, dose check, label print and receipt in one flow.", iconName: "Pill" },
      { name: "Prescriptions", desc: "Digital script capture with prescriber and refill history.", iconName: "FileText" },
      { name: "Batch & Expiry", desc: "FEFO picking, near-expiry dashboards and supplier returns.", iconName: "Boxes" },
      { name: "Procurement", desc: "Reorder suggestions, purchase orders and supplier price history.", iconName: "Truck" },
      { name: "Claims & NHIS", desc: "Claim line building, rejection tracking and reimbursement ageing.", iconName: "ShieldCheck" },
      { name: "Compliance Reports", desc: "Controlled register, audit trail and Pharmacy Council returns.", iconName: "LayoutDashboard" }
    ],
    roles: ["Superintendent Pharmacist", "Dispensing Technician", "Store Keeper", "Cashier", "Auditor"],
    integrations: ["MTN MoMo", "Paystack", "NHIS Claims Export", "Barcode Scanners", "Thermal Label Printers"],
    outcomes: [
      { value: "-68%", label: "Reduction in expiry losses" },
      { value: "42s", label: "Average dispense turnaround" },
      { value: "99.2%", label: "Physical vs system stock match" }
    ],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Offline Cache", "Tailwind CSS"],
    platforms: ["Counter Web App", "Tablet Stock Count", "Manager Mobile Dashboard"],
    pricingNote: "Per-branch licence including barcode hardware setup and pharmacist onboarding.",
    demoData: {
      activeModules: ["Dispensing", "Batch & Expiry", "Claims", "Procurement"]
    }
  },
  {
    id: "inventory-pos",
    name: "Inventory & Point of Sale System",
    shortName: "Inventory & POS",
    subtitle: "Sell at the counter, track every item and see profit per product in real time.",
    tagline: "Know exactly what you sold, what is left and what it earned.",
    badge: "Retail Operations",
    status: "Live in Production",
    category: "Retail & Distribution",
    accent: "amber",
    iconName: "ShoppingCart",
    description:
      "A fast touch-first POS backed by a serious inventory engine. It works during internet outages, syncs the moment connection returns, and gives owners live visibility of sales, margins, shrinkage and staff performance across every branch.",
    keyFeatures: [
      "Offline-first touch POS with barcode scanning and split payments",
      "Multi-branch stock transfers with live variance tracking",
      "Profit-per-product, per-branch and per-cashier reporting",
      "Automatic low-stock alerts and supplier purchase orders"
    ],
    metrics: [
      { label: "Checkout Speed", value: "11s avg" },
      { label: "Stock Shrinkage", value: "-41%" },
      { label: "Branches Supported", value: "Unlimited" },
      { label: "Offline Uptime", value: "100%" }
    ],
    modules: [
      { name: "POS Terminal", desc: "Touch or scanner checkout, holds, returns and split tender.", iconName: "ShoppingCart" },
      { name: "Inventory Control", desc: "Stock counts, adjustments, transfers and variance reasons.", iconName: "Boxes" },
      { name: "Purchasing", desc: "Reorder levels, purchase orders and goods-received notes.", iconName: "Truck" },
      { name: "Customers & Credit", desc: "Account sales, credit limits and statement reminders.", iconName: "Users" },
      { name: "Reporting", desc: "Daily Z-report, margin analysis and dead-stock detection.", iconName: "TrendingUp" },
      { name: "Cash & Shift Control", desc: "Cashier float, blind counts and end-of-shift reconciliation.", iconName: "Wallet" }
    ],
    roles: ["Business Owner", "Branch Manager", "Cashier", "Store Keeper", "Accountant"],
    integrations: ["MTN MoMo", "Telecel Cash", "Paystack", "Barcode Scanners", "Thermal Printers", "Cash Drawers"],
    outcomes: [
      { value: "11s", label: "Average checkout time" },
      { value: "-41%", label: "Reduction in unexplained shrinkage" },
      { value: "Real time", label: "Owner visibility across branches" }
    ],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "IndexedDB Sync", "Tailwind CSS"],
    platforms: ["Counter POS", "Android Tablet POS", "Owner Mobile Dashboard"],
    pricingNote: "Per-terminal monthly licence, with hardware bundles available on request.",
    demoData: {
      activeModules: ["POS Terminal", "Inventory", "Purchasing", "Reports"]
    }
  },
  {
    id: "ecommerce-platform",
    name: "E-Commerce & Online Store Platform",
    shortName: "E-Commerce",
    subtitle: "Branded online stores with Mobile Money checkout, delivery tracking and seller payouts.",
    tagline: "A storefront your customers actually finish checking out on.",
    badge: "Commerce Engine",
    status: "Live in Production",
    category: "Retail & FinTech",
    accent: "indigo",
    iconName: "Store",
    description:
      "Single-merchant storefronts or full multi-vendor marketplaces, engineered around how African customers really buy: Mobile Money first, delivery fees by zone, WhatsApp order support, and payouts that merchants can reconcile to the cedi.",
    keyFeatures: [
      "One-tap MoMo, card and pay-on-delivery checkout",
      "Multi-vendor storefronts with automated split payouts",
      "Zone-based delivery pricing and live rider dispatch",
      "Abandoned cart recovery over SMS and WhatsApp"
    ],
    metrics: [
      { label: "Checkout Completion", value: "96%" },
      { label: "Merchant Setup", value: "< 10 mins" },
      { label: "Repeat Purchase Growth", value: "3.5x" },
      { label: "Page Load", value: "0.9s" }
    ],
    modules: [
      { name: "Storefront", desc: "Fast product catalogue, search, reviews and collections.", iconName: "Store" },
      { name: "Checkout", desc: "MoMo, card, pay-on-delivery and guest checkout in three taps.", iconName: "Wallet" },
      { name: "Order Management", desc: "Fulfilment board, packing slips and returns handling.", iconName: "Boxes" },
      { name: "Delivery & Dispatch", desc: "Zone pricing, rider assignment and customer tracking links.", iconName: "Truck" },
      { name: "Vendors & Payouts", desc: "Seller onboarding, commission rules and settlement runs.", iconName: "Users" },
      { name: "Growth Tools", desc: "Coupons, flash sales, cart recovery and campaign analytics.", iconName: "TrendingUp" }
    ],
    roles: ["Store Owner", "Vendor", "Fulfilment Staff", "Dispatch Rider", "Customer"],
    integrations: ["Paystack", "MTN MoMo", "Telecel Cash", "WhatsApp Business", "Google Maps", "Meta Pixel"],
    outcomes: [
      { value: "96%", label: "Mobile Money checkout completion" },
      { value: "3.5x", label: "Repeat purchases within 60 days" },
      { value: "0.9s", label: "Median storefront load time" }
    ],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Cloudinary"],
    platforms: ["Customer Web Store", "Merchant Console", "Rider Mobile App"],
    pricingNote: "Flat build fee plus optional managed hosting; no commission taken on your sales.",
    demoData: {
      activeModules: ["Storefront", "Checkout", "Orders", "Payouts"]
    }
  },
  {
    id: "beauty-management",
    name: "Beauty & Spa Management System",
    shortName: "Beauty & Spa",
    subtitle: "Online bookings, client history, stylist commissions and product retail in one system.",
    tagline: "Fill the diary, keep the clients, pay the team correctly.",
    badge: "Service Business Suite",
    status: "Live in Production",
    category: "Beauty & Wellness",
    accent: "fuchsia",
    iconName: "Scissors",
    description:
      "For salons, spas and beauty studios that lose money to no-shows and forgotten client preferences. Clients book themselves online, deposits are collected up front, every service is logged against the client record, and commissions calculate themselves at month end.",
    keyFeatures: [
      "Self-service online booking with deposit collection",
      "Client profiles with formulas, allergies and visit photos",
      "Automatic stylist commission and tip splitting",
      "Retail product sales and treatment package tracking"
    ],
    metrics: [
      { label: "No-Show Rate", value: "-63%" },
      { label: "Chair Utilisation", value: "87%" },
      { label: "Rebooking Rate", value: "71%" },
      { label: "Avg. Ticket Growth", value: "+24%" }
    ],
    modules: [
      { name: "Booking Calendar", desc: "Per-stylist diary, colour-coded services and drag-to-move slots.", iconName: "CalendarCheck" },
      { name: "Client Records", desc: "Service history, product formulas, allergies and before/after photos.", iconName: "Users" },
      { name: "Deposits & Payments", desc: "MoMo deposits at booking, balance on completion, refunds.", iconName: "Wallet" },
      { name: "Staff & Commission", desc: "Shift rosters, service targets and automated commission runs.", iconName: "TrendingUp" },
      { name: "Retail & Stock", desc: "Product sales at checkout with back-bar usage deduction.", iconName: "Boxes" },
      { name: "Loyalty & Reminders", desc: "Points, packages and automatic SMS appointment reminders.", iconName: "MessageSquare" }
    ],
    roles: ["Salon Owner", "Receptionist", "Stylist / Therapist", "Client"],
    integrations: ["MTN MoMo", "Paystack", "Hubtel SMS", "Google Calendar", "Instagram Booking Link"],
    outcomes: [
      { value: "-63%", label: "Fewer no-shows with deposits" },
      { value: "87%", label: "Chair and room utilisation" },
      { value: "+24%", label: "Growth in average ticket value" }
    ],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Cloudinary", "Tailwind CSS"],
    platforms: ["Front-Desk Web App", "Client Booking Page", "Stylist Mobile View"],
    pricingNote: "Monthly subscription by number of service providers; booking page included.",
    demoData: {
      activeModules: ["Bookings", "Client Records", "Commissions", "Retail"]
    }
  },
  {
    id: "barbershop-management",
    name: "Barbershop Management System",
    shortName: "Barbershop",
    subtitle: "Walk-in queue, chair status, fast checkout, loyalty and barber earnings.",
    tagline: "Built for walk-in reality, not appointment theory.",
    badge: "Queue & Checkout",
    status: "Live in Production",
    category: "Service Business",
    accent: "orange",
    iconName: "Scissors",
    description:
      "Barbershops run on walk-ins, not neat bookings. This system manages a live queue with realistic wait estimates, shows which chair is busy and for how long, closes a sale in seconds, and settles each barber's cut of the day's takings automatically.",
    keyFeatures: [
      "Live walk-in queue with SMS 'you are next' alerts",
      "Chair board showing barber, client and time in chair",
      "Ten-second checkout with MoMo, cash and loyalty redemption",
      "Automatic daily barber payout and shop-share splitting"
    ],
    metrics: [
      { label: "Avg. Wait Time", value: "-38%" },
      { label: "Daily Cuts Tracked", value: "120+" },
      { label: "Loyalty Signups", value: "64%" },
      { label: "Payout Disputes", value: "0" }
    ],
    modules: [
      { name: "Walk-In Queue", desc: "Join by phone or at the door with live position and wait estimate.", iconName: "Users" },
      { name: "Chair Board", desc: "Real-time view of every chair, barber and service in progress.", iconName: "LayoutDashboard" },
      { name: "Fast Checkout", desc: "Service, extras and tip captured in a single tap flow.", iconName: "Wallet" },
      { name: "Barber Earnings", desc: "Per-barber cut count, commission split and daily settlement.", iconName: "TrendingUp" },
      { name: "Loyalty", desc: "Every tenth cut free, tracked by phone number, no cards.", iconName: "Sparkles" },
      { name: "Shop Analytics", desc: "Peak hour heatmap, service mix and barber leaderboard.", iconName: "CalendarCheck" }
    ],
    roles: ["Shop Owner", "Front Desk", "Barber", "Walk-in Client"],
    integrations: ["MTN MoMo", "Telecel Cash", "Hubtel SMS", "Thermal Printers", "Customer Display Screen"],
    outcomes: [
      { value: "-38%", label: "Shorter perceived wait time" },
      { value: "64%", label: "Clients enrolled in loyalty" },
      { value: "Daily", label: "Automatic barber settlement" }
    ],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "WebSockets", "Tailwind CSS"],
    platforms: ["Front-Desk Tablet", "Waiting Room Display", "Barber Mobile View"],
    pricingNote: "Affordable per-shop monthly plan with an in-shop queue display included.",
    demoData: {
      activeModules: ["Queue", "Chair Board", "Checkout", "Earnings"]
    }
  },
  {
    id: "learning-platform",
    name: "Educational Learning Platform",
    shortName: "Learning Platform",
    subtitle: "Courses, lessons, assessments and certificates with progress analytics.",
    tagline: "Teach at scale without losing sight of a single learner.",
    badge: "Digital Learning",
    status: "Live in Production",
    category: "EdTech & Training",
    accent: "indigo",
    iconName: "BookOpen",
    description:
      "A full learning management platform for schools, training institutes and corporate academies. Instructors publish structured courses with video, notes and quizzes; learners study on low-bandwidth connections; administrators see exactly who is progressing and who has stalled.",
    keyFeatures: [
      "Structured courses with video, notes, downloads and quizzes",
      "Auto-marked assessments with question banks and timed exams",
      "Low-bandwidth mode and downloadable offline lessons",
      "Verifiable certificates and cohort progress analytics"
    ],
    metrics: [
      { label: "Course Completion", value: "78%" },
      { label: "Active Learners", value: "4,300+" },
      { label: "Lesson Load", value: "1.2s" },
      { label: "Marking Time Saved", value: "-85%" }
    ],
    modules: [
      { name: "Course Builder", desc: "Drag-ordered modules, lessons, resources and prerequisites.", iconName: "BookOpen" },
      { name: "Lesson Player", desc: "Video, transcript, notes and inline questions in one view.", iconName: "Sparkles" },
      { name: "Assessments", desc: "Question banks, randomised papers, timers and auto-marking.", iconName: "FileText" },
      { name: "Learner Progress", desc: "Per-learner mastery, streaks and at-risk flags for tutors.", iconName: "TrendingUp" },
      { name: "Certificates", desc: "Branded, QR-verifiable certificates issued on completion.", iconName: "ShieldCheck" },
      { name: "Cohorts & Tutors", desc: "Class groups, discussion threads and tutor announcements.", iconName: "Users" }
    ],
    roles: ["Training Director", "Instructor", "Tutor", "Learner", "Examiner"],
    integrations: ["Paystack", "MTN MoMo", "Zoom", "YouTube / Vimeo", "Google Drive", "Hubtel SMS"],
    outcomes: [
      { value: "78%", label: "Course completion rate" },
      { value: "-85%", label: "Less time spent marking" },
      { value: "1.2s", label: "Lesson load on 3G" }
    ],
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "HLS Streaming", "Cloudinary"],
    platforms: ["Learner Web App", "Instructor Studio", "Offline Lesson Pack"],
    pricingNote: "Priced per active learner per month, or a one-off build for institution ownership.",
    demoData: {
      activeModules: ["Course Builder", "Lesson Player", "Assessments", "Certificates"]
    }
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
  },
  {
    id: "pharmacy-case",
    title: "Pharmacy Management System",
    client: "Community Pharmacy Group",
    industry: "Health • Compliance • Retail",
    tags: ["Health", "Retail", "Compliance"],
    summary: "Dispensing, batch-level stock control and NHIS claims for a multi-branch pharmacy group losing money to expiry.",
    challenge: "Stock was tracked on a spreadsheet with no batch or expiry visibility, so drugs regularly expired on the shelf. NHIS claim files were assembled by hand at month end, and rejected lines were rarely chased because nobody could tell which ones had failed.",
    solution: "We built a dispensing counter that enforces first-expiry-first-out picking, warns on interactions against the patient file, and prints labels and receipts in one action. Claim lines now build themselves from what was actually dispensed, and a near-expiry dashboard flags stock while it can still be sold or returned.",
    architecture: [
      "React counter application with offline cache for outages",
      "PostgreSQL batch ledger with FEFO picking rules",
      "Automated reorder point calculation per branch",
      "NHIS claim file export with rejection tracking"
    ],
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Barcode Scanners", "Thermal Printers"],
    impact: [
      { metric: "-68%", detail: "Reduction in expiry write-offs within two quarters" },
      { metric: "42s", detail: "Average dispensing turnaround at the counter" },
      { metric: "99.2%", detail: "Match between physical stock counts and system" }
    ],
    heroImage: "/images/case-pharmacy.jpg",
    uiHighlights: [
      { title: "Dispensing Counter", desc: "Search, interaction check, label print and receipt in a single flow." },
      { title: "Near-Expiry Dashboard", desc: "Surfaces at-risk batches early enough to discount or return them." }
    ]
  },
  {
    id: "retail-pos-case",
    title: "Inventory & Point of Sale Rollout",
    client: "Six-Branch Retail Chain",
    industry: "Retail • Multi-branch • Payments",
    tags: ["Retail", "Mobile Money", "E-Commerce"],
    summary: "An offline-first POS and stock engine deployed across six branches, giving the owner live visibility for the first time.",
    challenge: "Each branch kept its own book. Head office learned what had been sold days later, stock counts never reconciled, and a single internet outage stopped trading entirely because the previous system was cloud-only.",
    solution: "We deployed a touch POS that writes locally first and syncs when connectivity returns, so tills keep working through outages. Stock transfers, variance reasons and cashier shift reconciliation are all captured at the point of action, and owners see consolidated takings on their phone as they happen.",
    architecture: [
      "IndexedDB write-ahead queue with conflict-safe sync",
      "Node.js sync service with per-branch reconciliation",
      "Mobile Money and card tender with split payments",
      "Consolidated owner dashboard across all branches"
    ],
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "IndexedDB", "Paystack"],
    impact: [
      { metric: "11s", detail: "Average checkout time, scan to receipt" },
      { metric: "-41%", detail: "Reduction in unexplained stock shrinkage" },
      { metric: "100%", detail: "Trading uptime maintained during internet outages" }
    ],
    heroImage: "/images/case-pos.jpg",
    uiHighlights: [
      { title: "Offline-First Till", desc: "Sales continue during outages and reconcile automatically on reconnect." },
      { title: "Owner Mobile Report", desc: "Consolidated takings, margins and cashier performance across branches." }
    ]
  },
  {
    id: "ats-case",
    title: "Applicant Tracking & E-Recruitment",
    client: "Corporate HR Department",
    industry: "HR • Talent • Automation",
    tags: ["HR", "Automation", "Enterprise"],
    summary: "A hiring pipeline that took 214 applications per role from an unreadable inbox to a ranked shortlist in minutes.",
    challenge: "Applications arrived as email attachments in a shared inbox. Screening meant opening CVs one at a time, shortlists were argued rather than evidenced, and candidates were left without status updates for weeks.",
    solution: "We built a branded career portal feeding a structured pipeline. CVs are parsed into comparable fields and scored against weighted criteria the panel agrees up front, with a blind review mode that hides identity during the first pass. Interviews, scorecards and offers all stay attached to the candidate record.",
    architecture: [
      "Public career portal with structured application capture",
      "CV parsing service normalising skills and experience",
      "Weighted scoring engine with configurable criteria",
      "Calendar-integrated panel scheduling and scorecards"
    ],
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Elasticsearch", "Google Calendar API"],
    impact: [
      { metric: "-72%", detail: "Less time spent on manual CV screening" },
      { metric: "11 days", detail: "Average time from application to signed offer" },
      { metric: "9,400+", detail: "Applications processed through the platform" }
    ],
    heroImage: "/images/case-ats.jpg",
    uiHighlights: [
      { title: "Ranked Shortlisting", desc: "Weighted, evidence-backed scores replace opinion-led screening." },
      { title: "Pipeline Board", desc: "Every candidate sits in one stage with an SLA timer running." }
    ]
  },
  {
    id: "learning-platform-case",
    title: "Educational Learning Platform",
    client: "Professional Training Institute",
    industry: "Education • Training • Assessment",
    tags: ["Education", "SaaS", "Assessment"],
    summary: "Courses, auto-marked assessments and verifiable certificates for 4,300 learners on unreliable connections.",
    challenge: "Course material lived in WhatsApp groups and shared drives. Tutors marked every script by hand, nobody knew which learners had stalled until they failed, and certificates were Word documents that could not be verified.",
    solution: "We built a structured learning platform with a low-bandwidth lesson player, downloadable offline packs, randomised assessments drawn from question banks, and instant auto-marking. Cohort analytics flag at-risk learners early so tutors can intervene while it still matters.",
    architecture: [
      "Adaptive lesson player with low-bandwidth and offline modes",
      "Question bank with randomised, timed paper generation",
      "Auto-marking with per-question difficulty analytics",
      "QR-verifiable certificate issuing on completion"
    ],
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "HLS Streaming", "Cloudinary"],
    impact: [
      { metric: "78%", detail: "Course completion rate after early-intervention nudges" },
      { metric: "-85%", detail: "Reduction in tutor time spent marking" },
      { metric: "1.2s", detail: "Median lesson load time on a 3G connection" }
    ],
    heroImage: "/images/case-learning.jpg",
    uiHighlights: [
      { title: "Cohort Analytics", desc: "Shows exactly who has stalled and needs a tutor call today." },
      { title: "Auto-Marked Assessments", desc: "Results and per-question difficulty land the moment a learner submits." }
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
    summary: "Clarify the opportunity.",
    details: "We map workflows, priorities and success measures."
  },
  {
    step: "02",
    title: "Design",
    summary: "Shape the right solution.",
    details: "We turn findings into focused flows and technical plans."
  },
  {
    step: "03",
    title: "Build",
    summary: "Build with confidence.",
    details: "We ship in short cycles with testing built in."
  },
  {
    step: "04",
    title: "Launch",
    summary: "Go live smoothly.",
    details: "We deploy, migrate data and train your team."
  },
  {
    step: "05",
    title: "Grow",
    summary: "Improve as you grow.",
    details: "We monitor, support and evolve the product with you."
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

export const CONTENT_VERSION = 3;

export interface SiteContent {
  contentVersion?: number;
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
  contentVersion: CONTENT_VERSION,
  brand: {
    name: 'ECKINTOSH',
    suffix: '',
    tagline: 'Engineering Digital Solutions',
    adminTitle: 'Eckintosh. Admin',
  },
  navigation: {
    links: [
      { label: 'Home', href: '#hero' },
      { label: 'Systems', href: '#systems' },
      { label: 'Services', href: '#services' },
      { label: 'Industries', href: '#industries' },
      { label: 'About', href: '#why-us' },
      { label: 'Contact', href: '#contact' },
    ],
    ctaLabel: "Let's Talk",
    ctaTopic: 'General Inquiry',
  },
  hero: {
    eyebrow: 'Intelligent Digital Engineering',
    title: 'Technology that makes',
    highlight: 'complexity simple.',
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
      { label: 'Commerce & POS', color: 'bg-rose-400' },
    ],
    dashboardWindowLabel: 'eckintosh-core-v2.6 // live production',
    dashboardStatusLabel: 'Active Systems',
    dashboardTabs: [
      {
        id: 'school',
        label: 'School',
        iconName: 'GraduationCap',
        title: 'School Management System',
        subtitle: 'Grace Academy Portal - Live Academic Term',
        badge: '100% Operational',
        badgeTone: 'green',
        productId: 'school-management',
        stats: [
          { iconName: 'Users', label: 'Active Enrolled', value: '1,248', suffix: 'Students' },
          { iconName: 'DollarSign', label: 'Fees Collected', value: 'GHS 42,500' },
        ],
        note: 'GES terminal assessment and parent SMS gateway integrated',
        actionLabel: 'Open System',
      },
      {
        id: 'pos',
        label: 'Retail POS',
        iconName: 'ShoppingCart',
        title: 'Inventory & Point of Sale',
        subtitle: 'Multi-branch retail operations engine',
        badge: 'Offline Ready',
        badgeTone: 'amber',
        productId: 'inventory-pos',
        stats: [
          { iconName: 'TrendingUp', label: 'Today Sales', value: 'GHS 18,420' },
          { iconName: 'Boxes', label: 'Checkout Speed', value: '11s', suffix: 'avg' },
        ],
        note: 'Keeps selling through internet outages, then syncs automatically',
        actionLabel: 'Open System',
      },
      {
        id: 'ai',
        label: 'AI Productivity',
        iconName: 'Sparkles',
        title: 'EckinDev AI Productivity Platform',
        subtitle: 'Projects, sprints, code and standups in one workspace',
        badge: 'AI Powered',
        badgeTone: 'blue',
        productId: 'ai-assistant',
        stats: [
          { iconName: 'Sparkles', label: 'Tasks Ranked by AI', value: 'Every day' },
          { iconName: 'Cpu', label: 'Repositories Connected', value: 'Live' },
        ],
        note: 'The assistant prepares actions, but nothing saves without approval',
        actionLabel: 'Open System',
      },
    ],
    floatingCards: [
      { title: 'GHS 42,500 Collected', subtitle: 'MTN MoMo auto-settled', iconName: 'DollarSign' },
      { title: '9 Systems Live', subtitle: 'Built, shipped and maintained', iconName: 'TrendingUp' },
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
    eyebrow: 'Systems We Have Built',
    title: 'Nine production systems. All ours, end to end.',
    description:
      'These are not concept slides. Each one is a working platform we designed, engineered, deployed and still maintain. Open any of them below and use the real interface.',
    items: PRODUCTS,
    ctaLabel: 'Build a Custom System',
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
    filters: ['All', 'Education', 'Health', 'Retail', 'HR', 'E-Commerce', 'Mobile Money', 'Civic Tech'],
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
    description: 'A clear five-step path from a focused brief to a product that keeps improving.',
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
    whatsappLabel: 'Chat via WhatsApp · 053 115 2121',
    whatsappUrl: 'https://wa.me/233531152121',
    contactCards: [
      { iconName: 'PhoneCall', label: 'Direct Call: 053 115 2121' },
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
      { label: 'Contact', href: '#contact' },
    ],
    solutionLinks: [
      { label: 'Business Systems', href: '#services' },
      { label: 'Mobile Apps', href: '#services' },
      { label: 'Web Platforms', href: '#services' },
      { label: 'AI & Automation', href: '#services' },
    ],
    productLinks: [
      { label: 'School Management', href: '#systems' },
      { label: 'Recruitment & ATS', href: '#systems' },
      { label: 'AI Productivity Assistant', href: '#systems' },
      { label: 'Pharmacy Management', href: '#systems' },
      { label: 'Inventory & POS', href: '#systems' },
      { label: 'E-Commerce Platform', href: '#systems' },
      { label: 'Beauty & Spa', href: '#systems' },
      { label: 'Barbershop', href: '#systems' },
      { label: 'Learning Platform', href: '#systems' },
    ],
    copyright: 'Copyright 2026 Eckintosh Technologies. All rights reserved.',
    whatsappLabel: 'WhatsApp',
    whatsappUrl: 'https://wa.me/233531152121',
    directConnectLabel: 'Direct Connect',
    directConnectTopic: 'General Connect',
    locationLabel: 'Accra, Ghana',
  },
  planner: {
    eyebrow: 'Project Planner & Quote',
    title: "Let's Build Something Smarter",
    projectTypePrompt: 'Select the primary focus for your project:',
    projectTypeOptions: [
      { title: 'School Management System', desc: 'Admissions, academics, fees and parent portal', iconName: 'GraduationCap' },
      { title: 'Recruitment & ATS', desc: 'Career portal, screening and hiring pipeline', iconName: 'Users' },
      { title: 'AI Productivity Platform', desc: 'Team workspace with AI task ranking and Code Ops', iconName: 'Sparkles' },
      { title: 'Pharmacy Management', desc: 'Dispensing, batch expiry and claims', iconName: 'Pill' },
      { title: 'Inventory & POS', desc: 'Offline-first retail checkout and stock control', iconName: 'ShoppingCart' },
      { title: 'E-Commerce Platform', desc: 'Online store with Mobile Money checkout', iconName: 'Store' },
      { title: 'Beauty & Spa System', desc: 'Bookings, client records and commissions', iconName: 'Scissors' },
      { title: 'Barbershop System', desc: 'Walk-in queue, checkout and barber earnings', iconName: 'Scissors' },
      { title: 'Learning Platform', desc: 'Courses, assessments and certificates', iconName: 'BookOpen' },
      { title: 'Custom Software Build', desc: 'Something none of the above covers', iconName: 'Code2' },
    ],
    timelineOptions: ['Urgent (< 1 Month)', '1 - 2 Months', '3+ Months'],
    budgetOptions: ['GHS 10,000 - GHS 25,000', 'GHS 25,000 - GHS 60,000', 'GHS 60,000+ / Enterprise'],
    defaultProjectType: 'School Management System',
    defaultTimeline: '1 - 2 Months',
    defaultBudget: 'GHS 15,000 - GHS 35,000',
    whatsappNumber: '233531152121',
    successTitle: 'Inquiry Received!',
    successDescription:
      'Our lead software architect in Accra will review your requirements and reach out within 2 hours.',
  },
};
