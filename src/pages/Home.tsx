import { useState } from 'react';
import {
  WHAT_IS_RAIN,
  FIRST_FIVE_MINUTES,
  BASIC_USAGE,
  HANDOFF_RULES,
  SAFETY_NOTES,
  SYSTEM_COMPONENTS,
  NFC_INSTRUCTIONS,
} from '../data/homeContent';
import { ComponentDetail } from '../types';

function SafetyIcon({ level }: { level: string }) {
  if (level === 'warn') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-rain-red flex-shrink-0 mt-0.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-rain-blue flex-shrink-0 mt-0.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
  );
}

function NumberedList({ items, accent = 'green' }: { items: string[]; accent?: 'green' | 'blue' | 'amber' | 'red' }) {
  const color = {
    green: 'text-rain-green bg-rain-green/20 border-rain-green/40',
    blue: 'text-rain-blue bg-rain-blue/20 border-rain-blue/40',
    amber: 'text-rain-amber bg-rain-amber/20 border-rain-amber/40',
    red: 'text-rain-red bg-rain-red/20 border-rain-red/40',
  }[accent];

  return (
    <ol className="space-y-2">
      {items.map((step, i) => (
        <li key={i} className="flex gap-3 text-sm">
          <span className={`flex-shrink-0 w-5 h-5 rounded-full border font-mono text-xs flex items-center justify-center mt-0.5 ${color}`}>
            {i + 1}
          </span>
          <span className="text-rain-text leading-relaxed">{step}</span>
        </li>
      ))}
    </ol>
  );
}

function ComponentCard({ detail }: { detail: ComponentDetail }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`card transition-all duration-200 ${open ? 'border-rain-green/30' : ''}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="font-sans font-semibold text-rain-text text-sm">{detail.name}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`w-4 h-4 text-rain-muted transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div className="mt-3 space-y-3">
          <p className="text-rain-muted text-sm leading-relaxed">{detail.description}</p>

          <div>
            <p className="section-header text-rain-green">How to Use</p>
            <ul className="space-y-1">
              {detail.howToUse.map((step, i) => (
                <li key={i} className="flex gap-2 text-sm text-rain-text">
                  <span className="text-rain-green font-mono text-xs mt-0.5">▸</span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="section-header text-rain-red">Warnings</p>
            <ul className="space-y-1">
              {detail.warnings.map((w, i) => (
                <li key={i} className="flex gap-2 text-sm text-rain-text">
                  <span className="text-rain-red font-mono text-xs mt-0.5">!</span>
                  <span className="leading-relaxed">{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('start-here');

  const sections = [
    { id: 'start-here', label: 'Start Here', icon: '🟢' },
    { id: 'handoff', label: 'Handoff Rules', icon: '🧭' },
    { id: 'components', label: 'Components', icon: '🔧' },
    { id: 'nfc', label: 'Tap to Learn', icon: '📲' },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-shrink-0 bg-rain-surface border-b border-rain-border px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-rain-green/10 border border-rain-green/30 flex items-center justify-center">
            <span className="text-rain-green text-lg glow-green">📡</span>
          </div>
          <div>
            <h1 className="font-mono font-bold text-rain-green text-lg glow-green tracking-widest">
              RAIN GUIDE
            </h1>
            <p className="text-rain-muted text-xs font-mono">Self-teaching field reference</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rain-green animate-pulse-slow" />
            <span className="text-rain-green text-xs font-mono">LOCAL</span>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 bg-rain-surface border-b border-rain-border overflow-x-auto">
        <div className="flex min-w-max px-2">
          {sections.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`px-3 py-2.5 text-xs font-mono whitespace-nowrap transition-colors border-b-2 ${
                activeSection === id
                  ? 'text-rain-green border-rain-green'
                  : 'text-rain-muted border-transparent hover:text-rain-text'
              }`}
            >
              {icon} {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4 pb-6 page-enter">
          {activeSection === 'start-here' && (
            <>
              <div className="card border-rain-green/20 bg-gradient-to-br from-rain-card to-rain-surface">
                <p className="section-header text-rain-green">Mission Brief</p>
                <p className="text-rain-text text-sm leading-relaxed whitespace-pre-line">{WHAT_IS_RAIN}</p>
              </div>

              <div className="card border-rain-blue/20">
                <p className="section-header text-rain-blue">First 5 Minutes</p>
                <NumberedList items={FIRST_FIVE_MINUTES} accent="blue" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="card text-center border-rain-green/20">
                  <div className="text-2xl mb-1">📲</div>
                  <p className="font-mono text-rain-green text-xs font-semibold">Scan Tag</p>
                  <p className="text-rain-muted text-[11px] mt-1">Learn a part</p>
                </div>
                <div className="card text-center border-rain-amber/20">
                  <div className="text-2xl mb-1">📡</div>
                  <p className="font-mono text-rain-amber text-xs font-semibold">Signal Stack</p>
                  <p className="text-rain-muted text-[11px] mt-1">Tune a signal</p>
                </div>
              </div>

              <div className="card">
                <p className="section-header">Basic Usage</p>
                <NumberedList items={BASIC_USAGE} />
              </div>

              <div className="card">
                <p className="section-header">Safety Notes</p>
                <ul className="space-y-3">
                  {SAFETY_NOTES.map((note, i) => (
                    <li key={i} className={`flex gap-2 text-sm ${note.level === 'warn' ? 'text-rain-red' : 'text-rain-text'}`}>
                      <SafetyIcon level={note.level} />
                      <span className="leading-relaxed">{note.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {activeSection === 'handoff' && (
            <>
              <div className="card border-rain-amber/20">
                <p className="section-header text-rain-amber">Use RAIN When Jim Is Not Here</p>
                <p className="text-rain-text text-sm leading-relaxed">
                  This section is the short version for a helper, student, or operator who needs to use the system safely without knowing the whole build.
                </p>
              </div>

              <div className="card border-rain-red/20">
                <p className="section-header text-rain-red">Do Not Guess</p>
                <NumberedList items={HANDOFF_RULES} accent="red" />
              </div>

              <div className="card bg-rain-surface/50">
                <p className="section-header text-rain-green">Best First Test</p>
                <p className="text-rain-text text-sm leading-relaxed">
                  Open Signal Stack and search <strong className="text-rain-green">NOAA</strong>. NOAA Weather is continuous, easy to recognize, and a clean way to confirm the SDR, antenna, and audio path are working.
                </p>
              </div>
            </>
          )}

          {activeSection === 'components' && (
            <>
              <p className="text-rain-muted text-xs font-mono">
                Tap a component to expand what it does, how to use it, and what not to do.
              </p>
              {SYSTEM_COMPONENTS.map((comp) => (
                <ComponentCard key={comp.name} detail={comp} />
              ))}
            </>
          )}

          {activeSection === 'nfc' && (
            <>
              <div className="card border-rain-blue/20">
                <p className="section-header text-rain-blue">NFC Tag System</p>
                <p className="text-rain-text text-sm leading-relaxed mb-4">
                  NFC is the physical learning layer. The SDR list tells you what to tune. The NFC tags tell a new user what the hardware is and which guide card to open.
                </p>
                <ul className="space-y-2">
                  {NFC_INSTRUCTIONS.map((inst, i) => (
                    <li key={i} className="flex gap-2 text-sm text-rain-text">
                      <span className="text-rain-blue font-mono text-xs mt-0.5">▸</span>
                      <span className="leading-relaxed">{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card border-rain-muted/20">
                <p className="section-header">Recommended Tag Examples</p>
                <div className="font-mono text-sm space-y-1">
                  <div className="text-rain-green">RAIN-WX-001 → NOAA Weather preset</div>
                  <div className="text-rain-blue">RAIN-SDR-001 → SDR receiver guide</div>
                  <div className="text-rain-amber">RAIN-ANT-001 → Antenna switch guide</div>
                  <div className="text-rain-purple">RAIN-PWR-001 → Power system guide</div>
                </div>
              </div>

              <div className="card bg-rain-surface/50">
                <p className="section-header text-rain-amber">Current Build</p>
                <p className="text-rain-text text-sm leading-relaxed">
                  Hardware NFC scanning is not active yet. The Scan Tag page lets you type a tag ID and simulate the workflow now, so the app is ready before the Pi/NFC hardware layer is added.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
