import { Preset } from '../types';
import { CATEGORY_ICONS } from '../data/presets';

interface PresetDetailProps {
  preset: Preset;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
}

const SDR_APPS = [
  { key: 'sdrpp' as const, label: 'SDR++', color: 'text-rain-green' },
  { key: 'sdrsharp' as const, label: 'SDR#', color: 'text-rain-blue' },
  { key: 'gqrx' as const, label: 'GQRX', color: 'text-rain-amber' },
  { key: 'dragonos' as const, label: 'DragonOS', color: 'text-rain-purple' },
];

const SETTING_LABELS: Record<string, string> = {
  mode: 'Mode',
  bandwidth: 'Bandwidth',
  filter: 'Filter',
  filterWidth: 'Filter Width',
  step: 'Step',
  squelch: 'Squelch',
  notes: 'Notes',
};

function buildFallbackSteps(preset: Preset, freqDisplay: string): string[] {
  const steps = [
    `Tune frequency: ${freqDisplay}`,
    `Set mode: ${preset.mode}`,
    `Set bandwidth/filter: ${preset.bandwidth}`,
  ];

  if (preset.step) steps.push(`Use step size: ${preset.step}`);
  steps.push('Start with low gain, then raise gain until the signal appears without heavy overload.');
  steps.push('Set squelch low or open first; tighten it only after you confirm the signal is there.');
  steps.push('Match the antenna note before changing random software settings.');

  return steps;
}

export default function PresetDetail({ preset, onClose, onToggleFavorite }: PresetDetailProps) {
  const icon = CATEGORY_ICONS[preset.category] || '📡';
  const freqDisplay =
    preset.frequencyType === 'range'
      ? `${preset.frequencyStart} – ${preset.frequencyEnd}`
      : preset.frequency || '—';
  const tuneSteps = preset.quickTuneSteps && preset.quickTuneSteps.length > 0
    ? preset.quickTuneSteps
    : buildFallbackSteps(preset, freqDisplay);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-rain-bg">
      {/* Header */}
      <div className="flex-shrink-0 bg-rain-surface border-b border-rain-border px-4 py-3 flex items-center gap-3">
        <button
          onClick={onClose}
          className="p-2 -ml-2 text-rain-muted hover:text-rain-text active:text-rain-green transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>

        <div className="text-xl">{icon}</div>

        <div className="flex-1 min-w-0">
          <h2 className="font-sans font-semibold text-rain-text text-sm leading-tight truncate">
            {preset.name}
          </h2>
          <span className={`tag-badge category-${preset.category} text-[10px]`}>
            {preset.category.toUpperCase()}
          </span>
        </div>

        <button
          onClick={() => onToggleFavorite(preset.id)}
          className={`p-2 transition-colors ${
            preset.isFavorite ? 'text-rain-amber' : 'text-rain-muted hover:text-rain-amber'
          }`}
        >
          <svg viewBox="0 0 24 24" fill={preset.isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
          </svg>
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4 pb-8">

          {/* Frequency Hero */}
          <div className="card border-rain-green/30 bg-gradient-to-br from-rain-card to-rain-surface">
            <p className="section-header">Frequency</p>
            <div className="freq-display text-xl glow-green">{freqDisplay}</div>
            <div className="flex flex-wrap gap-3 mt-3">
              <div className="text-xs font-mono">
                <span className="text-rain-muted">Mode: </span>
                <span className="text-rain-text font-semibold">{preset.mode}</span>
              </div>
              <div className="text-xs font-mono">
                <span className="text-rain-muted">BW: </span>
                <span className="text-rain-text font-semibold">{preset.bandwidth}</span>
              </div>
              {preset.step && (
                <div className="text-xs font-mono">
                  <span className="text-rain-muted">Step: </span>
                  <span className="text-rain-text font-semibold">{preset.step}</span>
                </div>
              )}
              {preset.nfcTagId && (
                <div className="text-xs font-mono">
                  <span className="text-rain-muted">NFC: </span>
                  <span className="text-rain-blue font-semibold">{preset.nfcTagId}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="card">
            <p className="section-header">What You Are Listening For</p>
            <p className="text-rain-text text-sm leading-relaxed">{preset.description}</p>
          </div>

          <div className="card border-rain-red/20 bg-rain-red/5">
            <p className="section-header text-rain-red">Receive Only</p>
            <p className="text-rain-text text-sm leading-relaxed">
              These settings are listening directions only. Do not transmit unless you are licensed, authorized, and using proper transmitting equipment separate from the receive-only SDR path.
            </p>
          </div>

          {/* Antenna Note */}
          <div className="card border-rain-amber/20">
            <p className="section-header text-rain-amber">Antenna Recommendation</p>
            <p className="text-rain-text text-sm leading-relaxed">{preset.antennaNote}</p>
          </div>

          {/* Tags */}
          {preset.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {preset.tags.map((tag) => (
                <span key={tag} className="tag-badge text-rain-muted border-rain-border text-xs">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Quick Tune Steps */}
          <div className="card border-rain-green/20">
            <p className="section-header text-rain-green">Quick Tune Steps</p>
            <ol className="space-y-2">
              {tuneSteps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-rain-green/20 border border-rain-green/40 text-rain-green font-mono text-xs flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-rain-text leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* SDR App Settings */}
          <div>
            <p className="section-header mb-2">SDR App Settings</p>
            <div className="space-y-3">
              {SDR_APPS.map(({ key, label, color }) => {
                const settings = preset.appSettings[key];
                const entries = Object.entries(settings).filter(([, v]) => v);
                if (entries.length === 0) return null;

                return (
                  <div key={key} className="card">
                    <p className={`font-mono font-semibold text-xs mb-2 ${color}`}>{label}</p>
                    <div className="space-y-1.5">
                      {entries.map(([k, v]) => (
                        <div key={k} className="flex justify-between items-start gap-2 text-xs">
                          <span className="text-rain-muted font-mono">{SETTING_LABELS[k] || k}:</span>
                          <span className={`font-mono text-rain-text text-right ${k === 'notes' ? 'text-left flex-1' : ''}`}>
                            {v}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom preset controls */}
          {preset.isCustom && (
            <div className="text-xs font-mono text-rain-muted text-center py-2">
              Custom preset — edit from the Custom Presets page
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
