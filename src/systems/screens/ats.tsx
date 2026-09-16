import React from 'react';
import {
  Briefcase,
  Calendar,
  ClipboardCheck,
  Clock,
  Eye,
  FileText,
  LayoutDashboard,
  LogIn,
  LogOut,
  Mail,
  Phone,
  Plus,
  Sparkles,
  Trash2,
  Upload,
  User,
  UserPlus,
  Users,
  Video,
} from 'lucide-react';
import type { SystemDefinition } from '../types';

/* ------------------------------------------------------------------ *
 * Eckintosh Institute Job Portal — recruitment platform, modelled on
 * the live product. Design, navigation and copy are kept as they run;
 * the institution name is renamed from the original throughout, and
 * the signed-in candidate is a fabricated demo profile.
 * ------------------------------------------------------------------ */

/** Small inline glyphs for the footer's social row (kept brand-neutral). */
const SocialDot: React.FC<{ path: string }> = ({ path }) => (
  <span className="w-4 h-4 rounded-md bg-blue-600 grid place-items-center shrink-0">
    <svg viewBox="0 0 24 24" className="w-2 h-2" fill="white">
      <path d={path} />
    </svg>
  </span>
);

const SOCIAL_PATHS = [
  'M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z',
  'M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4 4 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5v.1a4.1 4.1 0 0 0 3.3 4 4.2 4.2 0 0 1-1.8.1 4.1 4.1 0 0 0 3.8 2.9A8.3 8.3 0 0 1 2 18.4a11.6 11.6 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z',
  'M12 2c-2.7 0-3.1 0-4.1.1-1.1 0-1.8.2-2.4.5a4.9 4.9 0 0 0-1.8 1.8c-.3.6-.5 1.3-.5 2.4C3.1 7.9 3 8.3 3 11s0 3.1.1 4.1c0 1.1.2 1.8.5 2.4a4.9 4.9 0 0 0 1.8 1.8c.6.3 1.3.5 2.4.5C8.9 20.9 9.3 21 12 21s3.1 0 4.1-.1c1.1 0 1.8-.2 2.4-.5a4.9 4.9 0 0 0 1.8-1.8c.3-.6.5-1.3.5-2.4.1-1 .1-1.4.1-4.1s0-3.1-.1-4.1c0-1.1-.2-1.8-.5-2.4a4.9 4.9 0 0 0-1.8-1.8c-.6-.3-1.3-.5-2.4-.5C15.1 2.1 14.7 2 12 2zm0 2.9a5.1 5.1 0 1 1 0 10.2 5.1 5.1 0 0 1 0-10.2zm0 8.4a3.3 3.3 0 1 0 0-6.6 3.3 3.3 0 0 0 0 6.6zm6.5-8.6a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z',
  'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.3 18.3V9.9H5.7v8.4h2.6zM7 8.8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm11.3 9.5v-4.6c0-2.5-1.3-3.7-3.1-3.7-1.4 0-2 .8-2.4 1.3V9.9h-2.6v8.4h2.6v-4.7c0-1.2.9-1.6 1.4-1.6.8 0 1.5.5 1.5 1.7v4.6h2.6z',
  'M23 6.2a3 3 0 0 0-2.1-2.1C19.1 3.5 12 3.5 12 3.5s-7.1 0-8.9.6A3 3 0 0 0 1 6.2 31 31 0 0 0 .4 12 31 31 0 0 0 1 17.8 3 3 0 0 0 3.1 20c1.8.5 8.9.5 8.9.5s7.1 0 8.9-.5a3 3 0 0 0 2.1-2.2 31 31 0 0 0 .6-5.8 31 31 0 0 0-.6-5.8zM9.7 15.4V8.6L15.6 12z',
];

/** The product's own chrome: light teal band, white nav, badge pill. */
const AtsShell: React.FC<{
  navLabel: string;
  navItems: { label: string; icon: React.ComponentType<{ className?: string }> }[];
  children: React.ReactNode;
}> = ({ navLabel, navItems, children }) => (
  <div className="flex flex-col h-full min-h-0 bg-gradient-to-b from-[#f0f9f6] to-white text-[10px]">
    <header className="h-9 shrink-0 flex items-center gap-2 px-2.5 bg-white border-b border-slate-100">
      <span className="flex items-center gap-1.5 shrink-0">
        <span className="w-6 h-6 rounded-full bg-white border-2 border-emerald-600 grid place-items-center shrink-0 overflow-hidden">
          <span className="text-[9px]">🛡️</span>
        </span>
        <span className="leading-none">
          <span className="block text-[6px] font-black tracking-[0.14em] text-emerald-600">CAREER PLATFORM</span>
          <span className="block text-[9px] font-black text-slate-900">Eckintosh Institute Job Portal</span>
        </span>
      </span>

      <nav className="flex items-center gap-2.5 ml-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.label === navLabel;
          return (
            <span
              key={item.label}
              className={`flex items-center gap-1 text-[7.5px] font-bold whitespace-nowrap ${
                isActive ? 'text-slate-900' : 'text-slate-500'
              }`}
            >
              <Icon className="w-2.5 h-2.5" />
              {item.label}
            </span>
          );
        })}
      </nav>

      <span className="ml-auto flex items-center gap-1 px-2 py-1 rounded-lg border border-slate-200 text-[7px] font-bold text-slate-600 shrink-0">
        <LogOut className="w-2 h-2" /> Logout
      </span>
    </header>

    <div className="flex-1 min-h-0 overflow-hidden p-2.5">{children}</div>
  </div>
);

/* -------------------------- Admin dashboard ------------------------- */

const ADMIN_NAV = [
  { label: 'Admin Dashboard', icon: LayoutDashboard },
  { label: 'Manage Jobs', icon: Briefcase },
];

const ADMIN_METRICS: { tag: string; tagTone: string; label: string; value: string; caption: string; icon: React.ComponentType<{ className?: string }>; iconTone: string }[] = [
  { tag: 'CANDIDATES', tagTone: 'text-cyan-600 bg-cyan-50', label: 'TOTAL USERS', value: '4', caption: 'Candidate profiles in the talent pool', icon: Users, iconTone: 'bg-blue-50 text-blue-600' },
  { tag: 'OPEN ROLES', tagTone: 'text-emerald-600 bg-emerald-50', label: 'ACTIVE JOBS', value: '2', caption: 'Hiring across 2 departments', icon: Briefcase, iconTone: 'bg-emerald-50 text-emerald-600' },
  { tag: 'PIPELINE', tagTone: 'text-violet-600 bg-violet-50', label: 'APPLICATIONS', value: '3', caption: '0 submitted this month', icon: FileText, iconTone: 'bg-violet-50 text-violet-600' },
  { tag: 'READINESS', tagTone: 'text-amber-600 bg-amber-50', label: 'RESUMES ON FILE', value: '4', caption: '100.0% of candidates have resumes', icon: FileText, iconTone: 'bg-amber-50 text-amber-600' },
];

const QUICK_ACTIONS: { label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { label: 'Create Job', icon: Plus },
  { label: 'Review Applications', icon: ClipboardCheck },
  { label: 'Manage Jobs', icon: Briefcase },
  { label: 'Manage Events', icon: Calendar },
  { label: 'Email Settings', icon: Mail },
];

const DASHBOARD_CHIPS: { value: string; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: '2', label: 'live roles', icon: Briefcase },
  { value: '2', label: 'departments', icon: Users },
  { value: '0.0%', label: 'acceptance rate', icon: ClipboardCheck },
  { value: '100.0%', label: 'resume coverage', icon: FileText },
];

const AdminDashboardScene: React.FC = () => (
  <AtsShell navLabel="Admin Dashboard" navItems={ADMIN_NAV}>
    <div className="h-full flex flex-col gap-1.5 min-h-0">
      {/* Hero banner */}
      <div className="rounded-xl bg-gradient-to-r from-slate-50 to-blue-50/60 border border-slate-100 p-2.5 shrink-0">
        <div className="flex items-start justify-between gap-2">
          <span className="min-w-0">
            <span className="inline-flex items-center gap-1 px-1.5 py-[2px] rounded-full bg-emerald-50 border border-emerald-100 text-[6px] font-black tracking-wider text-emerald-700">
              <span className="w-1 h-1 rounded-full bg-emerald-500" /> RECRUITMENT COMMAND CENTER
            </span>
            <div className="text-[17px] font-black text-slate-900 mt-1">Admin Dashboard</div>
            <p className="text-[7px] text-slate-500 mt-0.5 max-w-[85%] leading-relaxed">
              A sharper, corporate view of your hiring pipeline with live recruitment metrics, cleaner actions, and a
              bright interface designed for the day-to-day pace of hiring operations.
            </p>
            <div className="flex items-center gap-1 mt-1.5 flex-wrap">
              {DASHBOARD_CHIPS.map(({ value, label, icon: Icon }) => (
                <span
                  key={label}
                  className="flex items-center gap-1 px-1.5 py-1 rounded-lg bg-white border border-slate-200 text-[6.5px] font-semibold text-slate-600"
                >
                  <Icon className="w-2 h-2 text-slate-400" />
                  <b className="text-blue-600">{value}</b> {label}
                </span>
              ))}
            </div>
          </span>

          <span className="grid grid-cols-3 gap-1 shrink-0">
            {QUICK_ACTIONS.map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="flex items-center gap-1 px-1.5 py-1 rounded-lg bg-white border border-slate-200 text-[6.5px] font-bold text-slate-700 whitespace-nowrap"
              >
                <Icon className="w-2 h-2 text-blue-500" /> {label}
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-4 gap-1.5 shrink-0">
        {ADMIN_METRICS.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="rounded-xl bg-white border border-slate-200 p-2"
              style={{ animation: `rowIn 420ms ${i * 70}ms both` }}
            >
              <div className="flex items-start justify-between gap-1">
                <span className={`px-1.5 py-[1px] rounded-full text-[5.5px] font-black tracking-wider ${metric.tagTone}`}>
                  {metric.tag}
                </span>
                <span className={`w-5 h-5 rounded-lg grid place-items-center shrink-0 ${metric.iconTone}`}>
                  <Icon className="w-2.5 h-2.5" />
                </span>
              </div>
              <div className="text-[6.5px] font-bold tracking-wider text-slate-400 mt-1.5">{metric.label}</div>
              <div className="text-[19px] font-black text-slate-900 leading-none mt-0.5 tabular-nums">{metric.value}</div>
              <div className="text-[6px] text-slate-400 mt-1.5">{metric.caption}</div>
            </div>
          );
        })}
      </div>

      {/* Recruitment Copilot */}
      <div className="flex-1 min-h-0 rounded-xl bg-white border border-slate-200 p-2 flex flex-col">
        <div className="flex items-start justify-between gap-2 shrink-0">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-blue-500" />
            <span className="leading-none">
              <span className="block text-[11px] font-black text-slate-900">Recruitment Copilot</span>
              <span className="block text-[6.5px] text-slate-500 mt-0.5">
                Summarize applicants for a role or compare the strongest candidates using live portal data.
              </span>
            </span>
          </span>
          <span className="px-1.5 py-[2px] rounded-full border border-slate-200 text-[6px] font-bold text-slate-500 shrink-0">
            Read-only guidance
          </span>
        </div>

        <div className="flex-1 min-h-0 mt-1.5 rounded-lg bg-slate-50/60 border border-slate-100 p-2 flex flex-col">
          <span className="inline-flex items-center gap-1 px-1.5 py-[2px] rounded-full bg-blue-50 border border-blue-100 text-[6px] font-black text-blue-700 w-fit">
            <span className="w-2 h-2 rounded-full bg-blue-100 grid place-items-center">
              <span className="w-1 h-1 rounded-full bg-blue-500" />
            </span>
            ADMIN AI
          </span>
          <div className="text-[9px] font-black text-slate-900 mt-1">Job-level hiring guidance</div>
          <p className="text-[6.5px] text-slate-500 mt-0.5">
            Use this for applicant summaries, comparison notes, and fast screening support. Assistant output is
            advisory and does not change any records.
          </p>

          <div className="grid grid-cols-2 gap-2 mt-1.5">
            <span>
              <span className="block text-[6px] font-black text-slate-600 mb-0.5">Action</span>
              <span className="block px-1.5 py-1 rounded-lg border border-slate-200 bg-white text-[7px] text-slate-700">
                Summarize applicants for this job
              </span>
            </span>
            <span>
              <span className="block text-[6px] font-black text-slate-600 mb-0.5">Job</span>
              <span className="block px-1.5 py-1 rounded-lg border border-slate-200 bg-white text-[7px] text-slate-500 truncate">
                Senior Lecturer Position – Dept. of Computer Science
              </span>
            </span>
          </div>

          <div className="flex items-center gap-1 mt-1.5">
            {['Summarize pool', 'Compare top candidates', 'Screening gaps'].map((chip) => (
              <span
                key={chip}
                className="px-1.5 py-[3px] rounded-full bg-blue-50 border border-blue-100 text-[6px] font-bold text-blue-600"
              >
                {chip}
              </span>
            ))}
          </div>

          <span className="block mt-1.5">
            <span className="block text-[6px] font-black text-slate-600 mb-0.5">Optional focus</span>
            <span className="block px-1.5 py-1 rounded-lg border border-slate-200 bg-white text-[6.5px] text-slate-400">
              Add any emphasis, like technical fit, teaching potential, communication, or shortlist readiness.
            </span>
          </span>
        </div>
      </div>
    </div>
  </AtsShell>
);

/* --------------------------- Candidate profile ----------------------- */

const CANDIDATE_NAV = [
  { label: 'Browse Jobs', icon: Briefcase },
  { label: 'My Applications', icon: FileText },
  { label: 'My Interviews', icon: Video },
  { label: 'My Profile', icon: User },
];

const PROFILE_CONTACT: { icon: React.ComponentType<{ className?: string }>; text: string }[] = [
  { icon: Mail, text: 'k.ansah@ecki✱✱✱.com' },
  { icon: User, text: 'Candidate' },
  { icon: Phone, text: '055✱✱✱4210' },
];

const RESUMES: { filename: string; uploaded: string; primary: string }[] = [
  { filename: 'KOFI_ANSAH_CV.pdf', uploaded: '2026-09-16', primary: 'Standard' },
  { filename: 'KOFI_ANSAH_COVER_LETTER.pdf', uploaded: '2026-09-10', primary: 'Supporting doc' },
];

const RESUME_CHECKS: { label: string; done: boolean }[] = [
  { label: 'Contact details verified', done: true },
  { label: 'Work history parsed', done: true },
  { label: 'Skills section detected', done: true },
  { label: 'Reference letter attached', done: false },
];

const JOB_MATCHES: { role: string; file: string; pct: number }[] = [
  { role: 'Senior Lecturer Position', file: 'KOFI_ANSAH_CV.pdf', pct: 74 },
  { role: 'Research Fellow – Engineering', file: 'KOFI_ANSAH_CV.pdf', pct: 61 },
];

const CheckIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-2 h-2" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const ProfileScene: React.FC = () => (
  <AtsShell navLabel="My Profile" navItems={CANDIDATE_NAV}>
    <div className="h-full flex flex-col gap-1.5 min-h-0">
      {/* Profile header */}
      <div className="rounded-xl bg-gradient-to-r from-slate-50 to-blue-50/50 border border-slate-100 p-2.5 flex items-center gap-3 shrink-0">
        <span className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 grid place-items-center shrink-0 overflow-hidden text-[16px]">
          🧑🏾
        </span>
        <span className="min-w-0 flex-1">
          <span className="inline-flex items-center gap-1 px-1.5 py-[2px] rounded-full bg-emerald-50 border border-emerald-100 text-[6px] font-black tracking-wider text-emerald-700">
            <span className="w-1 h-1 rounded-full bg-emerald-500" /> CANDIDATE WORKSPACE
          </span>
          <div className="text-[16px] font-black text-slate-900 mt-1">Kofi Ansah</div>
          <p className="text-[6.5px] text-slate-500 mt-0.5 max-w-[80%]">
            Keep your profile, resumes, and role matches in one place while moving through the hiring journey with
            better visibility.
          </p>
          <div className="flex items-center gap-1 mt-1.5">
            {PROFILE_CONTACT.map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="flex items-center gap-1 px-1.5 py-1 rounded-lg bg-white border border-slate-200 text-[6.5px] font-semibold text-slate-700"
              >
                <Icon className="w-2 h-2 text-slate-400" /> {text}
              </span>
            ))}
          </div>
        </span>
        <span className="flex flex-col gap-1 shrink-0">
          <span className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-gradient-to-r from-teal-600 to-blue-600 text-white text-[7px] font-black">
            <User className="w-2 h-2" /> Edit Profile
          </span>
          <span className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-white border border-slate-200 text-[7px] font-black text-slate-700">
            <Briefcase className="w-2 h-2" /> Browse Jobs
          </span>
        </span>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-2 gap-1.5">
        {/* Resume management */}
        <div className="rounded-xl bg-white border border-slate-200 p-2 flex flex-col min-h-0">
          <div className="flex items-start justify-between gap-2 shrink-0">
            <span className="leading-none">
              <span className="block text-[10px] font-black text-slate-900">Resume Management</span>
              <span className="block text-[6.5px] text-slate-500 mt-0.5">
                Upload, review, and manage the resumes powering your job matches.
              </span>
            </span>
            <span className="flex items-center gap-1 px-1.5 py-1 rounded-lg border border-blue-200 text-[6.5px] font-bold text-blue-600 shrink-0">
              <Upload className="w-2 h-2" /> Upload New
            </span>
          </div>

          <div className="mt-1.5 rounded-lg border border-slate-100 overflow-hidden">
            <div className="grid grid-cols-4 gap-1 px-1.5 py-1 bg-slate-50 text-[5.5px] font-black tracking-wider text-slate-400">
              <span>FILENAME</span>
              <span>UPLOADED</span>
              <span>PRIMARY</span>
              <span>ACTIONS</span>
            </div>
            {RESUMES.map((resume, i) => (
              <div
                key={resume.filename}
                className="grid grid-cols-4 gap-1 px-1.5 py-1.5 items-center border-t border-slate-100"
                style={{ animation: `rowIn 400ms ${i * 90}ms both` }}
              >
                <span className="text-[6.5px] font-bold text-slate-800 truncate">{resume.filename}</span>
                <span className="text-[6px] text-slate-500">{resume.uploaded}</span>
                <span className="text-[6px] text-slate-600">{resume.primary}</span>
                <span className="flex flex-col gap-0.5">
                  <span className="flex items-center gap-0.5 text-[5.5px] font-bold text-blue-600">
                    <Eye className="w-1.5 h-1.5" /> View
                  </span>
                  <span className="flex items-center gap-0.5 text-[5.5px] font-bold text-rose-500">
                    <Trash2 className="w-1.5 h-1.5" /> Delete
                  </span>
                </span>
              </div>
            ))}
          </div>

          <div className="flex-1 min-h-0 mt-2 rounded-lg bg-slate-50/60 border border-slate-100 p-2 flex flex-col">
            <span className="flex items-center gap-1 text-[7px] font-black text-slate-700">
              <Sparkles className="w-2 h-2 text-blue-500" /> Resume completeness
            </span>
            <div className="flex-1 min-h-0 flex flex-col justify-around gap-1.5 mt-1.5">
              {RESUME_CHECKS.map(({ label, done }) => (
                <span key={label} className="flex items-center gap-1.5 text-[6.5px] text-slate-600">
                  <span
                    className={`w-3 h-3 rounded-full grid place-items-center shrink-0 ${
                      done ? 'bg-emerald-500' : 'bg-slate-200'
                    }`}
                  >
                    {done && <CheckIcon />}
                  </span>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Job matches */}
        <div className="rounded-xl bg-white border border-slate-200 p-2 flex flex-col min-h-0">
          <span className="leading-none shrink-0">
            <span className="block text-[10px] font-black text-slate-900">Job Matches</span>
            <span className="block text-[6.5px] text-slate-500 mt-0.5">
              See which roles your uploaded resumes align with most strongly.
            </span>
          </span>

          <div className="flex-1 min-h-0 flex flex-col justify-around gap-1.5 mt-1.5">
            {JOB_MATCHES.map(({ role, file, pct }, i) => (
              <div key={role} className="rounded-lg border border-slate-100 p-1.5" style={{ animation: `rowIn 420ms ${i * 90}ms both` }}>
                <div className="flex items-center justify-between gap-1">
                  <span className="min-w-0">
                    <span className="block text-[7.5px] font-black text-slate-800 truncate">{role}</span>
                    <span className="block text-[5.5px] text-slate-400 truncate">{file}</span>
                  </span>
                  <span className="flex items-center gap-0.5 px-1.5 py-[3px] rounded-md border border-slate-200 text-[5.5px] font-bold text-blue-600 shrink-0">
                    <Eye className="w-1.5 h-1.5" /> View
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex-1 h-[4px] rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-orange-400 to-amber-400"
                      style={{ width: `${pct}%`, animation: `barGrow 700ms ${i * 90}ms ease-out both` }}
                    />
                  </div>
                  <span className="text-[6px] font-bold text-slate-500 shrink-0">{pct}% match</span>
                </div>
              </div>
            ))}

            <div className="rounded-lg bg-blue-50/60 border border-blue-100 p-1.5">
              <span className="flex items-center gap-1 text-[6.5px] font-bold text-blue-700">
                <Sparkles className="w-2 h-2" /> 2 more roles match above 40%
              </span>
              <p className="text-[6px] text-blue-500 mt-0.5">Upload a second resume to widen your match coverage.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AtsShell>
);

/* ---------------------------- Interviews ----------------------------- */

const InterviewsScene: React.FC = () => (
  <AtsShell navLabel="My Interviews" navItems={CANDIDATE_NAV}>
    <div className="h-full flex flex-col gap-1.5 min-h-0">
      <div className="rounded-xl bg-gradient-to-r from-slate-50 to-blue-50/50 border border-slate-100 p-2.5 shrink-0">
        <span className="inline-flex items-center gap-1 px-1.5 py-[2px] rounded-full bg-emerald-50 border border-emerald-100 text-[6px] font-black tracking-wider text-emerald-700">
          <span className="w-1 h-1 rounded-full bg-emerald-500" /> INTERVIEW PLANNER
        </span>
        <div className="text-[17px] font-black text-slate-900 mt-1">My Interviews</div>
        <p className="text-[7px] text-slate-500 mt-0.5 max-w-[75%] leading-relaxed">
          Track upcoming interview sessions, review past interviews, and stay oriented through each stage of the
          process.
        </p>
      </div>

      <div className="flex-1 min-h-0 rounded-xl bg-white border border-slate-200 flex flex-col overflow-hidden">
        <div className="flex items-center gap-3 px-2 pt-1.5 shrink-0 border-b border-slate-100">
          <span className="flex items-center gap-1 pb-1.5 border-b-2 border-blue-500 text-[7.5px] font-bold text-blue-600">
            <Calendar className="w-2.5 h-2.5" /> Upcoming Interviews
          </span>
          <span className="flex items-center gap-1 pb-1.5 text-[7.5px] font-semibold text-slate-400">
            <Clock className="w-2.5 h-2.5" /> Past Interviews
          </span>
        </div>

        <div className="flex-1 min-h-0 grid place-items-center">
          <div className="text-center">
            <Calendar className="w-6 h-6 text-blue-400 mx-auto" />
            <div className="text-[10px] font-bold text-slate-700 mt-1.5">No upcoming interviews</div>
            <div className="text-[6.5px] text-slate-400 mt-0.5">
              Scheduled interviews will appear here once they are arranged.
            </div>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div className="shrink-0 rounded-xl bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-100 px-2.5 py-1.5 flex items-center justify-between gap-2">
        <span className="text-[7px] text-slate-700">
          <b className="font-black">Stay connected with Eckintosh Institute.</b> Recruitment updates, events, and
          campus opportunities in one place.
        </span>
        <span className="flex items-center gap-1 shrink-0">
          {SOCIAL_PATHS.map((path, i) => (
            <SocialDot key={i} path={path} />
          ))}
        </span>
      </div>
    </div>
  </AtsShell>
);

/* ------------------------------ Landing ------------------------------ */

const HERO_CHIPS: { icon: React.ComponentType<{ className?: string }>; value: string; label: string }[] = [
  { icon: Briefcase, value: '2', label: 'live roles' },
  { icon: Calendar, value: '2', label: 'upcoming events' },
  { icon: Sparkles, value: 'AI-assisted', label: 'resume insights' },
];

const PLATFORM_HIGHLIGHTS: { title: string; desc: string; icon: React.ComponentType<{ className?: string }>; step: string }[] = [
  { title: 'Resume Analysis', desc: 'AI-assisted parsing, skill extraction, completeness feedback, and job relevance scoring.', icon: FileText, step: '01' },
  { title: 'Smart Applications', desc: 'Track every application stage from submission to offer in one clear timeline.', icon: ClipboardCheck, step: '02' },
  { title: 'Interview Scheduling', desc: 'Coordinate interview slots and reminders without the email back-and-forth.', icon: Video, step: '03' },
];

const LandingScene: React.FC = () => (
  <div className="h-full min-h-0 bg-gradient-to-b from-[#f0f9f6] to-white text-[10px] flex flex-col">
    <header className="h-9 shrink-0 flex items-center gap-2 px-2.5 bg-white border-b border-slate-100">
      <span className="flex items-center gap-1.5 shrink-0">
        <span className="w-6 h-6 rounded-full bg-white border-2 border-emerald-600 grid place-items-center shrink-0">
          <span className="text-[9px]">🛡️</span>
        </span>
        <span className="leading-none">
          <span className="block text-[6px] font-black tracking-[0.14em] text-emerald-600">CAREER PLATFORM</span>
          <span className="block text-[9px] font-black text-slate-900">Eckintosh Institute Job Portal</span>
        </span>
      </span>
      <span className="ml-auto flex items-center gap-1.5 shrink-0">
        <span className="flex items-center gap-1 px-2 py-1 rounded-lg border border-slate-200 text-[7px] font-bold text-slate-700">
          <LogIn className="w-2 h-2" /> Sign In
        </span>
        <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-teal-600 to-blue-600 text-white text-[7px] font-black">
          <UserPlus className="w-2 h-2" /> Register
        </span>
      </span>
    </header>

    <div className="flex-1 min-h-0 overflow-hidden p-2.5 flex flex-col gap-1.5">
      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-3 grid grid-cols-2 gap-3 shrink-0">
        <div className="flex flex-col justify-center min-h-0">
          <span className="inline-flex items-center gap-1 px-1.5 py-[3px] rounded-full bg-emerald-50 border border-emerald-100 text-[6px] font-black tracking-wider text-emerald-700 w-fit">
            <span className="w-1 h-1 rounded-full bg-emerald-500" /> UNIVERSITY RECRUITMENT HUB
          </span>
          <h1 className="text-[17px] font-black text-slate-900 leading-tight mt-1.5">
            A sharper, more modern hiring experience for Eckintosh Institute.
          </h1>
          <p className="text-[7px] text-slate-500 leading-relaxed mt-1.5">
            Discover academic opportunities, upload resumes, track applications, and stay close to university events
            through one polished recruitment platform designed to feel clear and confident at any hour.
          </p>
          <div className="flex items-center gap-1 mt-1.5 flex-wrap">
            {HERO_CHIPS.map(({ icon: Icon, value, label }) => (
              <span
                key={label}
                className="flex items-center gap-1 px-1.5 py-1 rounded-lg bg-white border border-slate-200 text-[6.5px] font-semibold text-slate-600"
              >
                <Icon className="w-2 h-2 text-slate-400" />
                <b className="text-blue-600">{value}</b> {label}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-teal-600 to-blue-600 text-white text-[7.5px] font-black">
              <UserPlus className="w-2 h-2" /> Create Account
            </span>
            <span className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-[7.5px] font-black text-slate-700">
              <LogIn className="w-2 h-2" /> Sign In
            </span>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 grid place-items-center min-h-0 overflow-hidden">
          <span className="text-[26px]">🎓</span>
        </div>
      </div>

      <div className="flex-1 min-h-0 flex flex-col">
        <div className="text-center shrink-0">
          <div className="text-[13px] font-black text-slate-900">Platform Highlights</div>
          <div className="text-[7px] text-slate-500 mt-0.5">
            Core capabilities shaped into one consistent candidate and admin experience.
          </div>
        </div>

        <div className="flex-1 min-h-0 grid grid-cols-3 gap-1.5 mt-2">
          {PLATFORM_HIGHLIGHTS.map(({ title, desc, icon: Icon, step }, i) => (
            <div
              key={title}
              className="rounded-xl bg-gradient-to-br from-teal-600 to-cyan-600 text-white p-2.5 flex flex-col"
              style={{ animation: `rowIn 450ms ${i * 90}ms both` }}
            >
              <div className="flex items-start justify-between gap-1">
                <span className="text-[6px] font-black tracking-wider text-white/70">OPTION {String.fromCharCode(65 + i)}</span>
                <span className="text-right leading-none">
                  <span className="block text-[6px] text-white/70">STEP</span>
                  <span className="block text-[13px] font-black">{step}</span>
                </span>
              </div>
              <span className="w-6 h-6 rounded-full bg-white/15 grid place-items-center mt-1.5 shrink-0">
                <Icon className="w-3 h-3" />
              </span>
              <div className="text-[9.5px] font-black mt-1.5">{title}</div>
              <p className="text-[6.5px] text-white/80 leading-relaxed mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ----------------------------- Export ------------------------------ */

export const atsSystem: SystemDefinition = {
  productId: 'ats-recruitment',
  appName: 'Eckintosh Institute Job Portal',
  appInitials: 'EI',
  url: 'jobs.eckintosh-institute.edu.gh',
  scenes: [
    {
      id: 'landing',
      label: 'Career Hub',
      caption: 'The public landing page: academic openings, resume insights and platform highlights.',
      duration: 7,
      render: () => <LandingScene />,
    },
    {
      id: 'admin',
      label: 'Admin Dashboard',
      caption: 'Live hiring metrics and one-click actions, with an AI copilot for screening support.',
      duration: 7,
      render: () => <AdminDashboardScene />,
    },
    {
      id: 'profile',
      label: 'Candidate Workspace',
      caption: 'Resumes, uploads and job-match scores, all in one candidate-facing workspace.',
      duration: 7,
      render: () => <ProfileScene />,
    },
    {
      id: 'interviews',
      label: 'My Interviews',
      caption: 'Upcoming and past interview sessions tracked in one place, end to end.',
      duration: 6,
      render: () => <InterviewsScene />,
    },
  ],
};
