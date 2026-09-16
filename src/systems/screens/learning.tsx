import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookMarked,
  BookOpen,
  Briefcase,
  Calculator,
  Download,
  FileText,
  House,
  Mail,
  Moon,
  Pencil,
  Play,
  Search,
  ShoppingCart,
  Star,
  Trophy,
  Users,
} from 'lucide-react';
import type { SystemDefinition } from '../types';

/* ------------------------------------------------------------------ *
 * ReadAfrik — educational learning platform, modelled on the live
 * product. Design, navigation, copy and figures are kept as they run.
 * ------------------------------------------------------------------ */

type IconLike = React.ComponentType<{ className?: string }>;

const NAV: { label: string; icon: IconLike }[] = [
  { label: 'Home', icon: House },
  { label: 'Literacy', icon: BookOpen },
  { label: 'Numeracy', icon: Calculator },
  { label: 'Career Development', icon: Briefcase },
  { label: 'Store', icon: ShoppingCart },
  { label: 'About', icon: BookMarked },
  { label: 'Contact Us', icon: Mail },
];

/** The product's own chrome: white top nav, orange wordmark, light canvas. */
const ReadAfrikShell: React.FC<{ active: string; children: React.ReactNode }> = ({ active, children }) => (
  <div className="flex flex-col h-full min-h-0 bg-white text-[10px]">
    <header className="h-9 shrink-0 flex items-center gap-2 px-2.5 bg-white border-b border-slate-200/70 shadow-sm">
      <span className="flex items-center gap-1 shrink-0">
        <span className="w-4 h-4 rounded-sm bg-gradient-to-br from-amber-600 to-orange-700 grid place-items-center shrink-0">
          <BookOpen className="w-2 h-2 text-white" />
        </span>
        <span className="text-[11px] font-black text-orange-500">ReadAfrik</span>
      </span>

      <nav className="flex items-center gap-0.5 ml-1">
        {NAV.map((row) => {
          const Icon = row.icon;
          const isActive = row.label === active;
          return (
            <span
              key={row.label}
              className={`flex items-center gap-1 px-1.5 py-1 rounded-md text-[7.5px] font-semibold whitespace-nowrap ${
                isActive ? 'bg-amber-50 text-orange-500 border-b-2 border-orange-400' : 'text-orange-400'
              }`}
            >
              <Icon className="w-2 h-2 shrink-0" />
              {row.label}
            </span>
          );
        })}
      </nav>

      <span className="ml-auto flex items-center gap-2 shrink-0">
        <Moon className="w-2.5 h-2.5 text-slate-600" />
        <ShoppingCart className="w-2.5 h-2.5 text-slate-800" />
      </span>
    </header>

    <div className="flex-1 min-h-0 overflow-hidden">{children}</div>
  </div>
);

/* ----------------------------- Home -------------------------------- */

const HERO_STATS: { value: string; label: string; icon: IconLike }[] = [
  { value: '1000+', label: 'Learning Resources', icon: BookOpen },
  { value: '50K+', label: 'Active Learners', icon: Users },
  { value: '500+', label: 'Success Stories', icon: Trophy },
  { value: '10K+', label: 'Free Downloads', icon: Download },
];

const HomeScene: React.FC = () => (
  <ReadAfrikShell active="Home">
    <div className="h-full flex flex-col px-4 py-2 min-h-0">
      <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
      {/* Copy */}
      <div className="flex flex-col justify-center min-h-0">
        <h1 className="text-[26px] font-black leading-[1.05] text-slate-900">
          Empower Your
          <br />
          <span className="text-orange-500">Learning</span>
          <br />
          Journey
        </h1>
        <p className="text-[7.5px] text-slate-500 leading-relaxed mt-2 max-w-[92%]">
          Discover comprehensive literacy and numeracy resources, advance your career, and access premium teaching
          materials. Join thousands of learners transforming their educational experience.
        </p>

        <div className="flex items-center gap-1.5 mt-3">
          <span className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-400 text-white text-[8px] font-black">
            Explore Store <ArrowRight className="w-2 h-2" />
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-orange-300 text-orange-500 text-[8px] font-black">
            <Download className="w-2 h-2" /> Free Resources
          </span>
        </div>

        <div className="grid grid-cols-4 gap-1 mt-4">
          {HERO_STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center" style={{ animation: `rowIn 420ms ${i * 80}ms both` }}>
                <Icon className="w-3 h-3 text-orange-500 mx-auto" />
                <div className="text-[12px] font-black text-slate-900 mt-1">{stat.value}</div>
                <div className="text-[5.5px] text-slate-500 leading-tight">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Promo card */}
      <div className="grid place-items-center min-h-0">
        <div className="relative w-[86%]">
          <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 p-2.5">
            <div className="rounded-xl bg-[#fdfaf5] px-3 py-3 text-center">
              <div className="text-[18px] leading-none">📚</div>
              <div className="text-[11px] font-black text-slate-900 mt-1.5">Start Learning Today</div>
              <div className="text-[6.5px] text-slate-500 mt-0.5">Join our community of learners and educators</div>

              <div className="mt-2.5 space-y-1.5 text-left">
                {[
                  ['Literacy Skills', '85%', 85, 'from-orange-500 to-orange-400'],
                  ['Numeracy Skills', '78%', 78, 'from-amber-500 to-amber-400'],
                ].map(([label, pct, value, tone], i) => (
                  <div key={label as string}>
                    <div className="flex justify-between text-[6.5px] mb-0.5">
                      <span className="text-slate-700 font-semibold">{label}</span>
                      <span className="text-slate-600">{pct}</span>
                    </div>
                    <div className="h-[4px] rounded-full bg-orange-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${tone}`}
                        style={{
                          width: `${value}%`,
                          animation: `barGrow 800ms ${i * 140}ms cubic-bezier(.2,.8,.2,1) both`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white shadow-md grid place-items-center">
            <BookOpen className="w-3 h-3 text-orange-500" />
          </span>
          <span className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-white shadow-md grid place-items-center">
            <Trophy className="w-3 h-3 text-amber-500" />
          </span>
        </div>
      </div>
      </div>

      {/* Explore Our Learning Sections */}
      <div className="shrink-0 text-center border-t border-slate-100 pt-2.5 pb-1">
        <div className="text-[15px] font-black text-slate-900">Explore Our Learning Sections</div>
        <p className="text-[7px] text-slate-500 mt-1 max-w-[70%] mx-auto leading-relaxed">
          Discover comprehensive resources designed to enhance your educational journey across literacy, numeracy,
          career development, and premium materials.
        </p>
      </div>
    </div>
  </ReadAfrikShell>
);

/* ---------------------------- Literacy ----------------------------- */

const LITERACY_CARDS: {
  title: string;
  desc: string;
  icon: IconLike;
  stats: [string, string][];
}[] = [
  {
    title: 'Interactive Blog',
    desc: 'Expert insights, teaching strategies, and literacy research',
    icon: FileText,
    stats: [
      ['150+', 'Posts'],
      ['25K+', 'Readers'],
    ],
  },
  {
    title: 'Reading Resources',
    desc: 'Comprehensive guides for all reading levels',
    icon: BookOpen,
    stats: [
      ['200+', 'Resources'],
      ['50K+', 'Downloads'],
    ],
  },
  {
    title: 'Writing Tools',
    desc: 'Templates, prompts, and assessment tools',
    icon: Pencil,
    stats: [
      ['75+', 'Tools'],
      ['15K+', 'Users'],
    ],
  },
];

const LiteracyScene: React.FC = () => (
  <ReadAfrikShell active="Literacy">
    <div className="h-full flex flex-col items-center px-4 py-3 min-h-0">
      <span className="w-8 h-8 rounded-full bg-blue-100 grid place-items-center shrink-0">
        <BookOpen className="w-4 h-4 text-blue-600" />
      </span>
      <h1 className="text-[22px] font-black text-slate-900 mt-2 shrink-0">Literacy Excellence</h1>
      <p className="text-[7.5px] text-slate-500 text-center leading-relaxed mt-1.5 max-w-[68%] shrink-0">
        Comprehensive resources, expert insights, and proven strategies to enhance reading and writing skills for
        learners of all ages.
      </p>

      <div className="grid grid-cols-3 gap-2 mt-4 w-full flex-1 min-h-0 content-center">
        {LITERACY_CARDS.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="rounded-xl bg-white border border-slate-200 p-2.5 flex flex-col"
              style={{ animation: `rowIn 450ms ${i * 90}ms both` }}
            >
              <span className="w-6 h-6 rounded-full bg-blue-100 grid place-items-center shrink-0">
                <Icon className="w-3 h-3 text-blue-600" />
              </span>
              <div className="text-[11px] font-black text-slate-900 mt-2">{card.title}</div>
              <p className="text-[7px] text-slate-500 leading-relaxed mt-1">{card.desc}</p>

              <div className="grid grid-cols-2 gap-1 mt-2 rounded-lg bg-slate-50 px-2 py-1.5 text-center">
                {card.stats.map(([value, label]) => (
                  <span key={label}>
                    <span className="block text-[8.5px] font-black text-slate-900">{value}</span>
                    <span className="block text-[5.5px] text-slate-500">{label}</span>
                  </span>
                ))}
              </div>

              <span className="mt-2.5">
                <span className="flex items-center justify-center gap-1 py-1.5 rounded-lg bg-blue-600 text-white text-[8px] font-black">
                  Explore <ArrowRight className="w-2 h-2" />
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  </ReadAfrikShell>
);

/* ----------------------------- Store ------------------------------- */

const PRODUCTS: [string, string, string][] = [
  ['Complete Literacy Assessment Toolkit', '📊', 'Comprehensive assessment tools for every reading level'],
  ['Interactive Phonics Workbook Series', '📚', 'Structured phonics practice with printable worksheets'],
  ['Writing Workshop Curriculum', '✍️', 'Complete curriculum for implementing effective writing'],
];

const StoreScene: React.FC = () => (
  <ReadAfrikShell active="Store">
    <div className="h-full flex flex-col items-center px-4 py-2.5 min-h-0">
      <span className="w-7 h-7 rounded-full bg-orange-100 grid place-items-center shrink-0">
        <ShoppingCart className="w-3.5 h-3.5 text-orange-500" />
      </span>
      <h1 className="text-[20px] font-black text-slate-900 mt-1.5 shrink-0">Educational Store</h1>
      <p className="text-[7.5px] text-slate-500 text-center leading-relaxed mt-1 max-w-[66%] shrink-0">
        Discover premium teaching materials, digital books, and free resources designed to enhance your educational
        practice and student outcomes.
      </p>

      <div className="mt-2.5 rounded-xl bg-white border border-slate-200 shadow-sm px-2 py-1.5 flex items-center gap-1.5 shrink-0">
        <span className="flex items-center gap-1 px-1.5 py-1 rounded-lg border border-slate-200 w-20">
          <Search className="w-2 h-2 text-slate-400 shrink-0" />
          <span className="text-[6.5px] text-slate-400">Search</span>
        </span>
        {[
          ['All Products (156)', true],
          ['Digital Books (45)', false],
          ['Teaching Materials (67)', false],
          ['Free Resources (44)', false],
        ].map(([label, selected]) => (
          <span
            key={label as string}
            className={`px-1.5 py-1 rounded-lg text-[7px] font-bold whitespace-nowrap ${
              selected ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="mt-3 text-center shrink-0">
        <div className="text-[14px] font-black text-slate-900">Featured Products</div>
        <div className="text-[7px] text-slate-500 mt-0.5">Our most popular and highly-rated educational resources.</div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-2 w-full flex-1 min-h-0 content-center">
        {PRODUCTS.map(([title, emoji, desc], i) => (
          <div
            key={title}
            className="rounded-xl bg-white border border-slate-200 p-2.5 flex flex-col"
            style={{ animation: `rowIn 450ms ${i * 90}ms both` }}
          >
            <div className="flex items-start justify-between gap-1">
              <span className="px-1.5 py-[2px] rounded-full bg-orange-100 text-orange-600 text-[6px] font-bold">
                Featured
              </span>
              <span className="text-[13px] leading-none">{emoji}</span>
            </div>
            <div className="text-[10px] font-black text-slate-900 leading-tight mt-2">{title}</div>
            <p className="text-[6.5px] text-slate-500 leading-relaxed mt-1">{desc}</p>
            <span className="mt-2.5 flex items-center justify-between gap-1">
              <span className="flex items-center gap-0.5 text-[6.5px] text-slate-500">
                <Star className="w-2 h-2 text-amber-400 fill-amber-400" /> 4.9
              </span>
              <span className="px-2 py-1 rounded-lg bg-orange-500 text-white text-[7px] font-black">Add to Cart</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  </ReadAfrikShell>
);

/* ------------------------- Visual Gallery -------------------------- */

const GALLERY: {
  title: string;
  emoji: string;
  desc: string;
  tag: string;
  level: string;
  levelTone: string;
  rating: string;
  users: string;
  minutes: string;
}[] = [
  {
    title: 'Fraction Visualization',
    emoji: '🥧',
    desc: 'Interactive pie charts and bar models for understanding fractions. Explore equivalent fractions, operations, and conversions.',
    tag: 'Fractions',
    level: 'Elementary',
    levelTone: 'bg-emerald-50 text-emerald-700',
    rating: '4.9',
    users: '2500',
    minutes: '15 min',
  },
  {
    title: 'Geometric Shapes Explorer',
    emoji: '📐',
    desc: '3D models and interactive geometry tools to understand shapes, angles, and spatial relationships.',
    tag: 'Geometry',
    level: 'Middle School',
    levelTone: 'bg-amber-50 text-amber-700',
    rating: '4.8',
    users: '1800',
    minutes: '20 min',
  },
  {
    title: 'Number Line Adventures',
    emoji: '📏',
    desc: 'Dynamic number lines for addition, subtraction, and understanding integers with visual representations.',
    tag: 'Number Sense',
    level: 'Elementary',
    levelTone: 'bg-emerald-50 text-emerald-700',
    rating: '5',
    users: '3200',
    minutes: '10 min',
  },
];

const GalleryScene: React.FC = () => (
  <ReadAfrikShell active="Numeracy">
    <div className="h-full flex flex-col px-4 py-2 min-h-0">
      <span className="flex items-center gap-1 text-[7.5px] font-semibold text-emerald-600 shrink-0">
        <ArrowLeft className="w-2.5 h-2.5" /> Back to Numeracy
      </span>

      <div className="text-center shrink-0 mt-1">
        <h1 className="text-[20px] font-black text-slate-900">Visual Gallery</h1>
        <p className="text-[7.5px] text-slate-500 mt-1">
          Interactive visual representations of mathematical concepts to enhance learning
        </p>
      </div>

      <span className="mx-auto mt-2 flex items-center gap-1.5 px-2 py-1.5 rounded-lg border border-slate-200 w-[52%] shrink-0">
        <Search className="w-2.5 h-2.5 text-slate-400 shrink-0" />
        <span className="text-[7px] text-slate-400">Search gallery items…</span>
      </span>

      <div className="mt-2 text-center shrink-0">
        <div className="text-[7.5px] font-black text-slate-800">Category</div>
        <div className="flex items-center justify-center gap-1 flex-wrap mt-1">
          {['All', 'Fractions', 'Geometry', 'Number Sense', 'Algebra', 'Statistics', 'Probability', 'Measurement'].map(
            (chip, i) => (
              <span
                key={chip}
                className={`px-1.5 py-[3px] rounded-full text-[6.5px] font-semibold ${
                  i === 0 ? 'bg-emerald-600 text-white' : 'border border-slate-200 text-slate-600'
                }`}
              >
                {chip}
              </span>
            )
          )}
        </div>
      </div>

      <div className="mt-1.5 text-center shrink-0">
        <div className="text-[7.5px] font-black text-slate-800">Difficulty Level</div>
        <div className="flex items-center justify-center gap-1 mt-1">
          {['All', 'Elementary', 'Middle School', 'High School'].map((chip, i) => (
            <span
              key={chip}
              className={`px-1.5 py-[3px] rounded-full text-[6.5px] font-semibold ${
                i === 0 ? 'bg-emerald-600 text-white' : 'border border-slate-200 text-slate-600'
              }`}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      <div className="text-center text-[6.5px] text-slate-500 mt-1.5 shrink-0">Showing 12 of 12 items</div>

      <div className="grid grid-cols-3 gap-2 mt-1.5 flex-1 min-h-0 content-center">
        {GALLERY.map((item, i) => (
          <div
            key={item.title}
            className="rounded-xl bg-white border border-slate-200 p-2 flex flex-col"
            style={{ animation: `rowIn 450ms ${i * 90}ms both` }}
          >
            <div className="flex items-start justify-between gap-1">
              <span className="text-[13px] leading-none">{item.emoji}</span>
              <span className={`px-1.5 py-[2px] rounded-full text-[6px] font-bold ${item.levelTone}`}>
                {item.level}
              </span>
            </div>
            <div className="text-[10px] font-black text-slate-900 mt-1.5">{item.title}</div>
            <p className="text-[6.5px] text-slate-500 leading-relaxed mt-1">{item.desc}</p>
            <span className="inline-block self-start px-1.5 py-[2px] rounded-md bg-slate-100 text-[6px] text-slate-600 mt-1.5">
              {item.tag}
            </span>

            <div className="flex items-center justify-between gap-1 mt-1.5 pt-1.5 border-t border-slate-100 text-[6.5px] text-slate-600">
              <span className="flex items-center gap-1">
                <span className="flex items-center gap-0.5 font-bold">
                  <Star className="w-2 h-2 text-amber-400 fill-amber-400" /> {item.rating}
                </span>
                <span className="flex items-center gap-0.5 text-slate-400">
                  <Users className="w-2 h-2" /> {item.users}
                </span>
              </span>
              <span className="text-slate-400">{item.minutes}</span>
            </div>

            <span className="mt-1.5 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-emerald-600 text-white text-[7.5px] font-black">
              <Play className="w-2 h-2 fill-white" /> Launch Interactive
            </span>
          </div>
        ))}
      </div>
    </div>
  </ReadAfrikShell>
);

/* ----------------------------- Export ------------------------------ */

export const learningSystem: SystemDefinition = {
  productId: 'learning-platform',
  appName: 'ReadAfrik',
  appInitials: 'RA',
  url: 'readafrik.com',
  scenes: [
    {
      id: 'home',
      label: 'Home',
      caption: 'The learner front door: literacy and numeracy resources, career paths and the store.',
      duration: 7,
      render: () => <HomeScene />,
    },
    {
      id: 'literacy',
      label: 'Literacy',
      caption: 'Blog, reading resources and writing tools, each with its own library and audience.',
      duration: 6,
      render: () => <LiteracyScene />,
    },
    {
      id: 'gallery',
      label: 'Visual Gallery',
      caption: 'Interactive maths visualisations, filtered by topic and difficulty, launched in one click.',
      duration: 7,
      render: () => <GalleryScene />,
    },
    {
      id: 'store',
      label: 'Store',
      caption: 'Premium teaching materials, digital books and free downloads in one catalogue.',
      duration: 6,
      render: () => <StoreScene />,
    },
  ],
};
