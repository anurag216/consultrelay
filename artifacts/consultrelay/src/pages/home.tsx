import { useRef } from 'react';
import { Navbar, LogoIcon } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion, useReducedMotion } from 'framer-motion';

// ─── Pipeline stages ──────────────────────────────────────────────────────────
const PIPELINE_STAGES = [
  { label: 'Paid Lead',  sub: 'New enquiry' },
  { label: 'Engaged',    sub: 'Conversation' },
  { label: 'Booked',     sub: 'Consultation scheduled' },
  { label: 'Attended',   sub: 'Confirmed attendance' },
] as const;

// ─── Hero Pipeline Visual ─────────────────────────────────────────────────────
function HeroPipeline() {
  const reduced = useReducedMotion();

  return (
    <div className="w-full">
      {/* Desktop: horizontal pipeline */}
      <div className="hidden sm:block">
        <div className="bg-navy rounded-sm overflow-hidden">
          {/* Header bar */}
          <div className="px-6 py-3 border-b border-white/10 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <span className="ml-3 text-[11px] font-medium text-white/30 tracking-[0.06em] uppercase">
              Lead-to-Show Workflow
            </span>
          </div>

          {/* Stages */}
          <div className="p-6">
            <div className="flex items-stretch gap-0 relative">
              {PIPELINE_STAGES.map((stage, i) => (
                <div key={stage.label} className="flex items-stretch flex-1 min-w-0">
                  {/* Stage node */}
                  <div
                    className={`flex-1 px-4 py-4 flex flex-col gap-1.5 ${
                      i === 0
                        ? 'bg-teal/15 border border-teal/30'
                        : 'bg-white/5 border border-white/10'
                    }`}
                    style={{ borderRadius: 2 }}
                  >
                    <span
                      className={`text-[10px] font-semibold tracking-[0.08em] uppercase ${
                        i === 0 ? 'text-teal' : 'text-white/40'
                      }`}
                    >
                      {stage.label}
                    </span>
                    <span className="text-[13px] font-medium text-white/80 leading-tight">
                      {stage.sub}
                    </span>
                  </div>

                  {/* Connector */}
                  {i < PIPELINE_STAGES.length - 1 && (
                    <div className="relative flex items-center w-8 flex-shrink-0">
                      <div className="absolute inset-x-0 h-px bg-white/15" />
                      {/* Arrowhead */}
                      <svg
                        className="absolute right-0.5 w-2 h-2 text-white/25"
                        viewBox="0 0 8 8"
                        fill="currentColor"
                      >
                        <polygon points="0,0 8,4 0,8" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}

              {/* Animated pulse — travels across connectors */}
              {!reduced && (
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-teal z-10"
                  style={{ left: 0, boxShadow: '0 0 6px 2px rgba(42,140,130,0.6)' }}
                  animate={{
                    left: ['0%', '33%', '33%', '66%', '66%', '100%'],
                    opacity: [0, 1, 1, 1, 1, 0],
                  }}
                  transition={{
                    duration: 5,
                    times: [0, 0.12, 0.38, 0.50, 0.76, 0.88],
                    repeat: Infinity,
                    repeatDelay: 1.5,
                    ease: 'easeInOut',
                  }}
                />
              )}
            </div>

            {/* Funnel label row */}
            <div className="mt-4 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-teal" />
              <span className="text-[11px] text-white/35 font-medium tracking-[0.04em]">
                Paid Lead → Engaged → Qualified → Booked → Attended
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: compact vertical list */}
      <div className="sm:hidden bg-navy rounded-sm p-5">
        <div className="text-[11px] font-semibold text-white/30 tracking-[0.08em] uppercase mb-4">
          Lead-to-Show Workflow
        </div>
        <div className="space-y-px">
          {PIPELINE_STAGES.map((stage, i) => (
            <div
              key={stage.label}
              className={`flex items-center gap-3 px-3 py-3 ${
                i === 0 ? 'bg-teal/15 border border-teal/30' : 'bg-white/5 border border-white/8'
              }`}
              style={{ borderRadius: 2 }}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  i === 0 ? 'bg-teal' : 'bg-white/25'
                }`}
              />
              <span className={`text-[11px] font-semibold tracking-[0.06em] uppercase w-20 flex-shrink-0 ${
                i === 0 ? 'text-teal' : 'text-white/40'
              }`}>
                {stage.label}
              </span>
              <span className="text-[13px] text-white/70 font-medium">{stage.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Is ConsultRelay an AI receptionist?',
    a: 'No. Existing tools already automate conversations and appointment scheduling. ConsultRelay focuses on operating and measuring one specific funnel: paid implant lead → attended consultation.',
  },
  {
    q: 'Do you replace our CRM or HighLevel?',
    a: 'No. We prefer to work with the systems already in place rather than introduce another system of record.',
  },
  {
    q: 'Does ConsultRelay replace the front desk?',
    a: 'No. Clinic staff continue to handle clinical questions, treatment decisions and situations requiring human judgment.',
  },
  {
    q: 'Can you guarantee more implant cases?',
    a: 'No. We guarantee the defined workflow and measurement during the pilot. Clinical eligibility, patient decisions and treatment acceptance remain outside our control.',
  },
  {
    q: 'What happens with clinical questions?',
    a: 'They are escalated to the clinic. ConsultRelay does not diagnose, determine implant suitability or recommend treatment.',
  },
  {
    q: 'How is healthcare data handled?',
    a: 'Before a live pilot, the exact data flow, vendors, consent process, access controls and required agreements are documented with the participating practice.',
  },
  {
    q: 'Why $1,500?',
    a: 'It is a managed 30-day experiment on a high-value acquisition funnel — not a software-seat subscription.',
  },
] as const;

// ─── Pilot scope items ────────────────────────────────────────────────────────
const PILOT_SCOPE = [
  '1 implant-focused practice',
  'Up to 100 newly opted-in implant leads',
  'Existing CRM/calendar wherever practical',
  'Response and follow-up workflow',
  'Non-clinical qualification',
  'Consultation scheduling',
  'Reminders and no-show recovery',
  'Human escalation',
  'Weekly funnel reporting',
] as const;

const MAILTO = 'mailto:ag@consultrelay.space?subject=ConsultRelay%20Lead-to-Show%20Pilot';

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="min-h-screen bg-ivory flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-20 items-center">

              {/* Left — copy */}
              <div className="reveal max-w-xl">
                <p className="label-eyebrow mb-5">For dental implant marketing agencies</p>
                <h1 className="text-[2rem] sm:text-[2.625rem] md:text-[3.125rem] mb-5 text-navy">
                  You paid for the implant lead.{' '}
                  <span className="text-charcoal/50 font-semibold">
                    Don't lose it after the form.
                  </span>
                </h1>
                <p className="text-[16px] text-charcoal/70 leading-[1.7] mb-9 max-w-lg">
                  ConsultRelay works the gap between new enquiry and attended
                  consultation — response, qualification, booking, reminders and
                  recovery — while your client's clinical team handles dentistry.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 items-start">
                  <a href={MAILTO} className="btn-teal" data-testid="hero-cta-primary">
                    Discuss a 30-Day Pilot
                  </a>
                  <a href="#how-it-works" className="link-arrow py-[11px]" data-testid="hero-link-works">
                    See how it works
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2">
                      <path d="M7 2l5 5-5 5M12 7H2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
                <p className="mt-7 text-[13px] text-charcoal/45 font-medium pl-3 border-l border-charcoal/20">
                  Works alongside the CRM, calendar and marketing stack already in place.
                </p>
              </div>

              {/* Right — pipeline visual */}
              <div className="reveal reveal-delay-2 lg:pl-4">
                <HeroPipeline />
              </div>
            </div>
          </div>
        </section>

        {/* ── PROBLEM ───────────────────────────────────────────────────────── */}
        <section className="py-20 md:py-24 bg-white border-y border-[rgba(13,34,53,0.08)]">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">

            <div className="max-w-2xl mb-14 reveal">
              <h2 className="text-[1.75rem] md:text-[2.25rem] mb-4 text-navy">
                Generating the lead is only half the funnel.
              </h2>
              <p className="text-[16px] text-charcoal/65 leading-[1.7]">
                The agency controls the campaign, landing page and lead volume. Then
                the lead reaches the practice — and visibility often disappears.
              </p>
            </div>

            {/* Three problem areas — editorial, no icon boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[rgba(13,34,53,0.08)] rounded-sm overflow-hidden mb-14">
              {[
                {
                  title: 'Response',
                  body: 'Was every paid implant lead contacted promptly and consistently?',
                },
                {
                  title: 'Follow-up',
                  body: "What happened to the leads who didn't answer the first call or text?",
                },
                {
                  title: 'Show',
                  body: 'Of the consultations that were booked, how many actually walked through the door?',
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className={`px-8 py-10 bg-ivory ${
                    i < 2 ? 'md:border-r border-b md:border-b-0 border-[rgba(13,34,53,0.08)]' : ''
                  }`}
                >
                  <div className="text-[11px] font-semibold text-charcoal/35 tracking-[0.08em] uppercase mb-4">
                    0{i + 1}
                  </div>
                  <h3 className="text-[18px] font-semibold text-navy mb-3 tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="text-[15px] text-charcoal/65 leading-[1.65]">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="max-w-3xl">
              <p className="text-[18px] md:text-[20px] font-semibold text-navy leading-snug tracking-[-0.02em]">
                When that part of the funnel is unclear, strong marketing can still
                look like poor marketing.
              </p>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
        <section id="how-it-works" className="py-20 md:py-28 bg-ivory">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">

            <div className="max-w-xl mb-16 reveal">
              <h2 className="text-[1.75rem] md:text-[2.25rem] text-navy">
                We own one narrow part of the journey.
              </h2>
            </div>

            {/* 5 stages — desktop: horizontal track; mobile: vertical list */}
            <div className="hidden md:block mb-14">
              <div className="flex items-stretch gap-0 border border-[rgba(13,34,53,0.10)] rounded-sm overflow-hidden">
                {[
                  { num: '01', title: 'Respond',  text: 'New opted-in implant enquiries enter the workflow quickly.' },
                  { num: '02', title: 'Qualify',  text: 'We collect only the approved non-clinical information needed to move the conversation forward.' },
                  { num: '03', title: 'Book',     text: 'Qualified prospects are moved into genuine consultation availability.' },
                  { num: '04', title: 'Confirm',  text: 'Reminders, rescheduling and follow-up help protect the appointment.' },
                  { num: '05', title: 'Measure',  text: 'Every lead receives a clear disposition through attended consultation.' },
                ].map((s, i, arr) => (
                  <div
                    key={s.num}
                    className={`flex-1 px-5 py-8 bg-white ${
                      i < arr.length - 1 ? 'border-r border-[rgba(13,34,53,0.08)]' : ''
                    }`}
                  >
                    <div className="text-[11px] font-semibold text-teal tracking-[0.08em] mb-3">
                      {s.num}
                    </div>
                    <h3 className="text-[15px] font-semibold text-navy mb-2 tracking-[-0.015em]">
                      {s.title}
                    </h3>
                    <p className="text-[13px] text-charcoal/60 leading-[1.6]">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: numbered vertical list */}
            <div className="md:hidden space-y-0 border border-[rgba(13,34,53,0.10)] rounded-sm overflow-hidden mb-14">
              {[
                { num: '01', title: 'Respond',  text: 'New opted-in implant enquiries enter the workflow quickly.' },
                { num: '02', title: 'Qualify',  text: 'We collect only the approved non-clinical information needed to move the conversation forward.' },
                { num: '03', title: 'Book',     text: 'Qualified prospects are moved into genuine consultation availability.' },
                { num: '04', title: 'Confirm',  text: 'Reminders, rescheduling and follow-up help protect the appointment.' },
                { num: '05', title: 'Measure',  text: 'Every lead receives a clear disposition through attended consultation.' },
              ].map((s, i, arr) => (
                <div
                  key={s.num}
                  className={`flex gap-5 px-6 py-6 bg-white ${
                    i < arr.length - 1 ? 'border-b border-[rgba(13,34,53,0.08)]' : ''
                  }`}
                >
                  <span className="text-[11px] font-semibold text-teal tracking-[0.06em] pt-0.5 w-7 flex-shrink-0">
                    {s.num}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-semibold text-navy mb-1.5 tracking-[-0.015em]">
                      {s.title}
                    </h3>
                    <p className="text-[14px] text-charcoal/60 leading-[1.6]">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Clinical note */}
            <div className="max-w-2xl border-l-2 border-teal pl-6 py-1">
              <p className="text-[15px] text-charcoal/75 leading-[1.65] font-medium">
                Clinical questions, diagnosis, treatment recommendations and
                suitability decisions always go to the practice.
              </p>
            </div>
          </div>
        </section>

        {/* ── DIFFERENTIATION (navy) ────────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-navy">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">

            <div className="mb-14 reveal">
              <h2 className="text-[1.75rem] md:text-[2.25rem] text-white">
                Not another receptionist. Not another CRM.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/10 rounded-sm overflow-hidden mb-16">
              {/* Left — existing stack */}
              <div className="px-8 py-10 md:border-r border-b md:border-b-0 border-white/10">
                <p className="text-[11px] font-semibold text-white/35 tracking-[0.08em] uppercase mb-6">
                  Your existing stack already handles
                </p>
                <ul className="space-y-3">
                  {[
                    'Lead generation',
                    'CRM records',
                    'Phone/SMS infrastructure',
                    'Practice scheduling',
                    'Clinical workflows',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                      <span className="text-[15px] text-white/55">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — ConsultRelay */}
              <div className="px-8 py-10">
                <p className="text-[11px] font-semibold text-teal tracking-[0.08em] uppercase mb-6">
                  ConsultRelay focuses on
                </p>
                <ul className="space-y-3">
                  {[
                    'Lead-response execution',
                    'Persistent follow-up',
                    'Non-clinical qualification',
                    'Consultation booking',
                    'No-show/reschedule recovery',
                    'Lead-to-attended-consult attribution',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-teal flex-shrink-0" />
                      <span className="text-[15px] text-white font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Closing statement */}
            <div className="border-t border-white/10 pt-12 max-w-3xl">
              <p className="text-[18px] md:text-[21px] font-semibold text-white/80 leading-snug tracking-[-0.02em]">
                If your clients already handle and measure this perfectly, you
                probably don't need ConsultRelay.
              </p>
            </div>
          </div>
        </section>

        {/* ── FOR AGENCIES ──────────────────────────────────────────────────── */}
        <section id="for-agencies" className="py-20 md:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">

            <div className="max-w-2xl mb-12 reveal">
              <h2 className="text-[1.75rem] md:text-[2.25rem] text-navy mb-4">
                Give clients visibility after the lead is generated.
              </h2>
              <p className="text-[16px] text-charcoal/65 leading-[1.7]">
                Agencies are often accountable for lead quality while having limited
                control over what happens after the handoff. ConsultRelay gives the
                agency a clearer view of the complete operational funnel.
              </p>
            </div>

            {/* Funnel diagram — 5 stages connected */}
            <div className="mb-12">
              {/* Desktop */}
              <div className="hidden sm:flex items-center gap-0 bg-ivory border border-[rgba(13,34,53,0.09)] rounded-sm overflow-hidden">
                {(['Lead', 'Engaged', 'Qualified', 'Booked', 'Attended'] as const).map(
                  (step, i, arr) => (
                    <div key={step} className="flex items-center flex-1 min-w-0">
                      <div
                        className={`flex-1 py-5 px-4 text-center ${
                          i === arr.length - 1
                            ? 'bg-teal/10 border-l border-teal/25'
                            : 'border-r border-[rgba(13,34,53,0.08)]'
                        }`}
                      >
                        <span
                          className={`text-[13px] font-semibold tracking-[-0.01em] ${
                            i === arr.length - 1 ? 'text-teal' : 'text-navy'
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                      {i < arr.length - 1 && (
                        <svg className="w-3.5 h-3.5 text-charcoal/20 flex-shrink-0 -mx-1.5 relative z-10" viewBox="0 0 14 14" fill="currentColor">
                          <polygon points="0,0 14,7 0,14" />
                        </svg>
                      )}
                    </div>
                  )
                )}
              </div>

              {/* Mobile */}
              <div className="sm:hidden border border-[rgba(13,34,53,0.09)] rounded-sm overflow-hidden">
                {(['Lead', 'Engaged', 'Qualified', 'Booked', 'Attended'] as const).map(
                  (step, i, arr) => (
                    <div
                      key={step}
                      className={`flex items-center gap-3 px-5 py-4 ${
                        i === arr.length - 1 ? 'bg-teal/10' : 'bg-ivory'
                      } ${i < arr.length - 1 ? 'border-b border-[rgba(13,34,53,0.08)]' : ''}`}
                    >
                      <span className={`text-[14px] font-semibold ${i === arr.length - 1 ? 'text-teal' : 'text-navy'}`}>
                        {step}
                      </span>
                      {i < arr.length - 1 && (
                        <svg className="ml-auto w-3 h-3 text-charcoal/25 rotate-90" viewBox="0 0 14 14" fill="currentColor">
                          <polygon points="0,0 14,7 0,14" />
                        </svg>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="max-w-2xl">
              <p className="text-[16px] text-charcoal/65 leading-[1.7]">
                That means conversations about performance can start with what
                actually happened to the leads — not assumptions about whether
                someone called them.
              </p>
            </div>
          </div>
        </section>

        {/* ── PILOT ─────────────────────────────────────────────────────────── */}
        <section id="the-pilot" className="py-20 md:py-28 bg-ivory border-y border-[rgba(13,34,53,0.08)]">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">

            <div className="max-w-4xl">
              {/* Section label */}
              <p className="label-eyebrow mb-6">Validation Pilot</p>

              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-0 border border-[rgba(13,34,53,0.10)] rounded-sm overflow-hidden bg-white">

                {/* Left — price + title */}
                <div className="bg-navy px-10 py-12 md:min-w-[260px] flex flex-col justify-between">
                  <div>
                    <h2 className="text-[1.25rem] font-semibold text-white mb-8 leading-snug tracking-[-0.02em]">
                      30-Day Implant<br />Lead-to-Show Pilot
                    </h2>
                    <div className="mb-2">
                      <span className="text-[3rem] font-bold text-white tracking-[-0.04em] leading-none">
                        $1,500
                      </span>
                    </div>
                    <p className="text-[13px] text-white/45 font-medium">
                      fixed pilot fee
                    </p>
                    <p className="text-[13px] text-white/45 font-medium">
                      + direct communication costs
                    </p>
                  </div>
                  <div className="mt-10 pt-8 border-t border-white/10">
                    <a
                      href={MAILTO}
                      className="block text-center px-5 py-3 rounded-[3px] text-[14px] font-semibold text-navy bg-white hover:bg-ivory transition-colors"
                      data-testid="pilot-cta"
                    >
                      Discuss the Pilot
                    </a>
                  </div>
                </div>

                {/* Right — scope */}
                <div className="px-10 py-12">
                  <p className="text-[11px] font-semibold text-charcoal/35 tracking-[0.08em] uppercase mb-6">
                    What's included
                  </p>
                  <ul className="space-y-3 mb-10">
                    {PILOT_SCOPE.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <svg
                          className="w-3.5 h-3.5 text-teal flex-shrink-0 mt-[3px]"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M2 7l3.5 3.5L12 3"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-[14px] text-charcoal/75 font-medium leading-snug">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-[rgba(13,34,53,0.07)] pt-6">
                    <p className="text-[12.5px] text-charcoal/50 leading-[1.65]">
                      No guarantee of treatment acceptance or revenue. The pilot exists to
                      measure whether a better-operated lead-to-show process improves
                      conversion or reduces manual workload.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT WE MEASURE ───────────────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

              {/* Left — headline */}
              <div className="reveal">
                <p className="label-eyebrow mb-4">What we track</p>
                <p className="text-[15px] text-charcoal/55 font-medium mb-3 tracking-[-0.01em]">
                  The metric isn't messages sent.
                </p>
                <h2 className="text-[1.75rem] md:text-[2.25rem] text-navy mb-6">
                  It's attended implant consultations.
                </h2>
                <p className="text-[15px] text-charcoal/65 leading-[1.7]">
                  The goal is to understand exactly where paid demand is being lost
                  between acquisition and the chair.
                </p>
              </div>

              {/* Right — vertical chain */}
              <div>
                <div className="relative pl-5">
                  {/* Vertical track */}
                  <div className="absolute left-0 top-2 bottom-2 w-px bg-[rgba(13,34,53,0.10)]" />

                  <div className="space-y-6">
                    {[
                      { label: 'Lead received',          active: false },
                      { label: 'Meaningful conversation', active: false },
                      { label: 'Qualified',              active: false },
                      { label: 'Consultation booked',    active: false },
                      { label: 'Consultation attended',  active: true  },
                    ].map((step) => (
                      <div key={step.label} className="flex items-center gap-4 relative">
                        {/* Node on the track */}
                        <div
                          className={`absolute -left-5 w-[9px] h-[9px] rounded-full border-2 -translate-x-[4px] ${
                            step.active
                              ? 'bg-teal border-teal'
                              : 'bg-white border-[rgba(13,34,53,0.20)]'
                          }`}
                        />
                        <p
                          className={`text-[15px] font-semibold tracking-[-0.015em] ${
                            step.active ? 'text-teal' : 'text-navy'
                          }`}
                        >
                          {step.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section id="faq" className="py-20 md:py-28 bg-ivory">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20">

              {/* Left — label */}
              <div>
                <p className="label-eyebrow mb-3">Questions</p>
                <h2 className="text-[1.5rem] md:text-[1.75rem] text-navy tracking-[-0.025em]">
                  Common questions from agencies
                </h2>
              </div>

              {/* Right — accordion */}
              <div>
                <Accordion type="single" collapsible className="w-full">
                  {FAQS.map((faq, i) => (
                    <AccordionItem
                      key={i}
                      value={`item-${i}`}
                      className="border-b border-[rgba(13,34,53,0.09)] last:border-b-0"
                    >
                      <AccordionTrigger className="text-left text-[15px] font-semibold text-navy hover:text-teal hover:no-underline py-5 gap-4 tracking-[-0.015em]">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-[14.5px] text-charcoal/65 pb-6 leading-[1.7]">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
        <section className="py-24 md:py-32 bg-navy">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="max-w-2xl">
              <h2 className="text-[2rem] md:text-[2.5rem] text-white mb-5 tracking-[-0.03em] leading-[1.1]">
                Want to see what happens after your next implant lead?
              </h2>
              <p className="text-[16px] text-white/55 mb-10 leading-[1.65]">
                Run the next 100 leads through a measurable Lead-to-Show workflow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <a
                  href={MAILTO}
                  className="btn-teal text-[14.5px] px-7 py-3.5"
                  data-testid="final-cta"
                >
                  Discuss a 30-Day Pilot
                </a>
                <a
                  href="mailto:ag@consultrelay.space"
                  className="inline-flex items-center py-3.5 text-[14px] font-medium text-white/50 hover:text-teal transition-colors"
                >
                  ag@consultrelay.space
                </a>
              </div>
              <p className="mt-14 text-[13px] text-white/30 font-medium">
                If your clients already have this solved, tell us. That's useful
                information too.
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
