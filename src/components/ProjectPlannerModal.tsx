import React, { useEffect, useId, useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, ChevronDown, MessageSquare, ShieldCheck, X } from 'lucide-react';
import type { Service, SiteContent } from '../data/contentData';
import { getIcon } from '../lib/icons';
import { submitInquiry } from '../lib/inquiries';
import { useBodyScrollLock, useEscape, useFocusTrap } from '../hooks';

interface ProjectPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** What the visitor clicked, e.g. "Demo request: Pharmacy Management System". */
  initialTopic?: string;
  content: SiteContent['planner'];
  services: Service[];
  contactCards: SiteContent['cta']['contactCards'];
}

const NOT_SURE = 'Not sure yet, help me choose';

// Words too generic to tell one option from another.
const GENERIC_WORDS = new Set(['system', 'systems', 'platform', 'management', 'software', 'build', 'eckintosh', 'and', 'the']);
const keywords = (text: string) =>
  text
    .toLowerCase()
    .split(/[^a-z0-9-]+/)
    .filter((word) => word && !GENERIC_WORDS.has(word));

/** Picks the option that shares the most keywords with the clicked topic. */
function matchInterest(topic: string, options: string[]): string {
  const topicWords = new Set(keywords(topic));
  let best = '';
  let bestScore = 0;
  for (const option of options) {
    const score = keywords(option).filter((word) => topicWords.has(word)).length;
    if (score > bestScore) {
      best = option;
      bestScore = score;
    }
  }
  return best;
}

const HISTORY_KEY = 'eckintoshPlanner';

/** A single-page request form that opens over the site like its own page. */
export const ProjectPlannerModal: React.FC<ProjectPlannerModalProps> = ({
  isOpen,
  onClose,
  initialTopic = '',
  content,
  services,
  contactCards,
}) => {
  const [interest, setInterest] = useState('');
  const [timeline, setTimeline] = useState('');
  const [budget, setBudget] = useState('');
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const headingId = useId();

  const systemOptions = useMemo(() => content.projectTypeOptions.map((option) => option.title), [content.projectTypeOptions]);
  const serviceOptions = useMemo(() => services.map((service) => service.title), [services]);

  // Each time the page opens, start fresh and preselect whatever was clicked.
  useEffect(() => {
    if (!isOpen) return;
    setSubmitted(false);
    setError(null);
    setInterest(matchInterest(initialTopic, [...systemOptions, ...serviceOptions]));
  }, [initialTopic, isOpen, serviceOptions, systemOptions]);

  // Behave like a page: the browser's back button closes it.
  useEffect(() => {
    if (!isOpen) return;
    if (!window.history.state?.[HISTORY_KEY]) {
      window.history.pushState({ ...window.history.state, [HISTORY_KEY]: true }, '');
    }
    const onPopState = () => onClose();
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [isOpen, onClose]);

  const close = () => {
    // Unwind our history entry; the popstate listener then closes the page.
    if (window.history.state?.[HISTORY_KEY]) window.history.back();
    else onClose();
  };

  useBodyScrollLock(isOpen);
  useEscape(isOpen, close);
  const trapRef = useFocusTrap<HTMLDivElement>(isOpen);

  if (!isOpen) return null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await submitInquiry({
        projectType: interest,
        timeline,
        budget,
        fullName,
        organization,
        phone,
        email,
        // Keep the button they came from, so the team knows the context.
        notes: [initialTopic && `Opened from: ${initialTopic}`, message].filter(Boolean).join('\n\n'),
      });
      setSubmitted(true);
      trapRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send your request.');
    } finally {
      setSubmitting(false);
    }
  };

  // A plain anchor rather than window.open: popup blockers on mobile Safari
  // and in-app browsers silently swallow scripted opens, leaving the button dead.
  const whatsappDetails = [
    `I'm interested in: ${interest || 'a project'}`,
    fullName && `Name: ${fullName}`,
    organization && `Organization: ${organization}`,
    timeline && `Timeline: ${timeline}`,
    message && `Details: ${message}`,
  ].filter(Boolean);
  const whatsappUrl = `https://wa.me/${content.whatsappNumber}?text=${encodeURIComponent(
    `Hello Eckintosh Technologies,\n\n${whatsappDetails.join('\n')}`
  )}`;

  return (
    <div
      ref={trapRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      className="fixed inset-0 z-[90] overflow-y-auto bg-white text-neutral-950 animate-fadeIn"
    >
      {/* Page bar */}
      <div className="sticky top-0 z-10 border-b border-black/[0.08] bg-white/85 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex h-12 max-w-[1080px] items-center justify-between px-4 sm:px-6">
          <button
            type="button"
            onClick={close}
            className="-ml-2 inline-flex items-center gap-1.5 rounded-full px-2 py-1.5 text-[13px] font-medium text-neutral-700 hover:text-neutral-950"
          >
            <ArrowLeft className="h-4 w-4" /> Back to site
          </button>
          <span className="flex items-center gap-2" aria-hidden="true">
            <img src="/logo.png" alt="" className="h-5 w-auto" />
            <span className="text-[14px] font-bold text-neutral-950">ECKINTOSH</span>
          </span>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full text-neutral-600 hover:bg-black/[0.05] hover:text-neutral-950"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Phones read intro, form, then the extras; wide screens keep intro and extras in the left column. */}
      <div className="animate-fade-up mx-auto grid max-w-[1080px] gap-y-10 px-6 py-10 md:py-16 lg:grid-cols-[1fr_1.3fr] lg:grid-rows-[auto_1fr] lg:gap-x-20 lg:gap-y-0">
        {/* Intro */}
        <header className="lg:col-start-1 lg:row-start-1 lg:pt-2">
          <p className="text-[15px] font-semibold text-blue-600">{content.eyebrow}</p>
          <h1 id={headingId} className="mt-2 text-[32px] font-bold leading-[1.08] tracking-[-0.025em] md:text-[44px]">
            {content.title}
          </h1>
          <p className="mt-4 max-w-md text-[17px] leading-relaxed text-neutral-600">
            Share a few details and a senior engineer will get back to you.
          </p>
        </header>

        {/* What happens next, and other ways to reach us */}
        <aside className="lg:col-start-1 lg:row-start-2">
          <ol className="space-y-5 border-t border-black/10 pt-8 lg:mt-10">
            {['We review what you need.', 'We reach out to talk it through.', 'You get a clear plan and quote.'].map(
              (stepText, index) => (
                <li key={stepText} className="flex items-center gap-4 text-[15px] text-neutral-800">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f5f5f7] text-[13px] font-semibold text-neutral-700">
                    {index + 1}
                  </span>
                  {stepText}
                </li>
              )
            )}
          </ol>

          <ul className="mt-10 space-y-3 border-t border-black/10 pt-8 text-[14px] text-neutral-600">
            {contactCards.map((card) => {
              const Icon = getIcon(card.iconName, ShieldCheck);
              return (
                <li key={card.label} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0 text-blue-600" />
                  {card.label}
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Form or confirmation */}
        <div className="row-start-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          {submitted ? (
            <div className="rounded-[28px] bg-[#f5f5f7] p-8 text-center md:p-12">
              <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" />
              <h2 className="mt-5 text-[28px] font-bold tracking-[-0.02em]">{content.successTitle}</h2>
              <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-neutral-600">
                Thank you, <span className="font-semibold text-neutral-900">{fullName}</span>. {content.successDescription}
              </p>
              <dl className="mx-auto mt-6 max-w-sm space-y-1.5 rounded-2xl bg-white p-5 text-left text-[14px]">
                <SummaryRow label="Interested in" value={interest} />
                {timeline && <SummaryRow label="Timeline" value={timeline} />}
                <SummaryRow label="Phone" value={phone} />
              </dl>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-[15px] font-medium text-white hover:bg-emerald-700"
                >
                  <MessageSquare className="h-4 w-4" /> Continue on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-full px-6 py-3 text-[15px] font-medium text-blue-600 hover:underline"
                >
                  Back to site
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Field label={content.projectTypePrompt.replace(/[:\s]+$/, '')} htmlFor="planner-interest">
                <SelectBox id="planner-interest" value={interest} onChange={setInterest} required>
                  <option value="" disabled>
                    Choose a system or service
                  </option>
                  <optgroup label="Systems">
                    {systemOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </optgroup>
                  {serviceOptions.length > 0 && (
                    <optgroup label="Services">
                      {serviceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </optgroup>
                  )}
                  <option value={NOT_SURE}>{NOT_SURE}</option>
                </SelectBox>
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" htmlFor="planner-name" required>
                  <input
                    id="planner-name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Kwame Mensah"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    className={INPUT}
                  />
                </Field>
                <Field label="Organization" htmlFor="planner-org" optional>
                  <input
                    id="planner-org"
                    type="text"
                    autoComplete="organization"
                    placeholder="Apex High School"
                    value={organization}
                    onChange={(event) => setOrganization(event.target.value)}
                    className={INPUT}
                  />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Phone or WhatsApp" htmlFor="planner-phone" required>
                  <input
                    id="planner-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="+233 24 123 4567"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className={INPUT}
                  />
                </Field>
                <Field label="Email" htmlFor="planner-email" required>
                  <input
                    id="planner-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="kwame@organization.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className={INPUT}
                  />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Timeline" htmlFor="planner-timeline" optional>
                  <SelectBox id="planner-timeline" value={timeline} onChange={setTimeline}>
                    <option value="">No fixed date</option>
                    {content.timelineOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </SelectBox>
                </Field>
                <Field label="Budget" htmlFor="planner-budget" optional>
                  <input
                    id="planner-budget"
                    type="text"
                    placeholder={content.budgetPlaceholder}
                    value={budget}
                    onChange={(event) => setBudget(event.target.value)}
                    className={INPUT}
                  />
                </Field>
              </div>

              <Field label="Tell us about your project" htmlFor="planner-message" optional>
                <textarea
                  id="planner-message"
                  rows={4}
                  placeholder="What are you trying to build or fix?"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className={`${INPUT} resize-y`}
                />
              </Field>

              {error && (
                <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[14px] text-red-700">
                  {error}
                </p>
              )}

              <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-blue-600 px-8 py-3.5 text-[16px] font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? 'Sending...' : 'Send request'}
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-[15px] font-medium text-neutral-700 hover:text-neutral-950 hover:underline"
                >
                  <MessageSquare className="h-4 w-4 text-emerald-600" /> Or chat on WhatsApp
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const FIELD_BASE =
  'w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-[15px] placeholder:text-neutral-400 transition-shadow focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/15';
const INPUT = `${FIELD_BASE} text-neutral-950`;

const Field: React.FC<{
  label: string;
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}> = ({ label, htmlFor, required, optional, children }) => (
  <div>
    <label htmlFor={htmlFor} className="mb-1.5 block text-[13px] font-medium text-neutral-700">
      {label}
      {required && <span className="text-blue-600"> *</span>}
      {optional && <span className="font-normal text-neutral-400"> (optional)</span>}
    </label>
    {children}
  </div>
);

const SelectBox: React.FC<{
  id: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  children: React.ReactNode;
}> = ({ id, value, onChange, required, children }) => (
  <div className="relative">
    <select
      id={id}
      value={value}
      required={required}
      onChange={(event) => onChange(event.target.value)}
      // Grey until something is chosen, like a placeholder; the list itself stays dark.
      className={`${FIELD_BASE} cursor-pointer appearance-none pr-11 [&_option]:text-neutral-950 ${
        value ? 'text-neutral-950' : 'text-neutral-400'
      }`}
    >
      {children}
    </select>
    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
  </div>
);

const SummaryRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between gap-4">
    <dt className="text-neutral-500">{label}</dt>
    <dd className="text-right font-medium text-neutral-900">{value}</dd>
  </div>
);
