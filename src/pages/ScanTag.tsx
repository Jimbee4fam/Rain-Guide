import { useState } from 'react';
import { Preset } from '../types';
import PresetDetail from '../components/PresetDetail';

interface ScanTagProps {
  presets: Preset[];
  onToggleFavorite: (id: string) => void;
}

export default function ScanTag({ presets, onToggleFavorite }: ScanTagProps) {
  const [tagInput, setTagInput] = useState('');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<Preset | 'notfound' | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  function simulateScan(tagId?: string) {
    const id = (tagId ?? tagInput).trim().toUpperCase();
    if (!id) return;

    setScanning(true);
    setResult(null);
    setHasSearched(true);

    setTimeout(() => {
      const found = presets.find((p) => p.nfcTagId?.toUpperCase() === id);
      setResult(found || 'notfound');
      setScanning(false);
    }, 800);
  }

  const knownTags = presets.filter((p) => p.nfcTagId).map((p) => ({
    id: p.nfcTagId!,
    name: p.name,
    category: p.category,
  }));

  if (result !== null && result !== 'notfound') {
    return (
      <PresetDetail
        preset={result}
        onClose={() => { setResult(null); setTagInput(''); setHasSearched(false); }}
        onToggleFavorite={onToggleFavorite}
      />
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 bg-rain-surface border-b border-rain-border px-4 py-3">
        <h2 className="font-mono font-bold text-rain-green text-base glow-green tracking-widest">
          📲 SCAN TAG
        </h2>
        <p className="text-rain-muted text-xs font-mono mt-0.5">NFC Tag Simulation Interface</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6 pb-8">

          {/* NFC Visual */}
          <div className="flex flex-col items-center py-8">
            <div className="relative w-32 h-32 flex items-center justify-center">
              {/* Ripple rings */}
              <div className="absolute inset-0 rounded-full border-2 border-rain-blue/20 nfc-ripple" />
              <div className="absolute inset-0 rounded-full border-2 border-rain-blue/15 nfc-ripple" style={{ animationDelay: '0.5s' }} />
              <div className="absolute inset-0 rounded-full border border-rain-blue/10 nfc-ripple" style={{ animationDelay: '1s' }} />

              {/* Center icon */}
              <div className={`relative z-10 w-20 h-20 rounded-full bg-rain-surface border-2 flex items-center justify-center transition-colors ${
                scanning ? 'border-rain-green' : 'border-rain-blue/40'
              }`}>
                <span className="text-3xl">{scanning ? '🔄' : '📲'}</span>
              </div>
            </div>

            <p className="mt-4 font-mono text-xs text-rain-muted text-center">
              {scanning ? 'Scanning...' : 'Hardware NFC scanning not available'}
            </p>
          </div>

          {/* Manual input */}
          <div className="card">
            <p className="section-header">Manual Tag ID Entry</p>
            <p className="text-rain-muted text-xs mb-3">
              Enter a Tag ID to simulate scanning. Use the format: RAIN-CATEGORY-###
            </p>
            <div className="flex gap-2">
              <input
                className="flex-1 font-mono uppercase"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value.toUpperCase())}
                placeholder="RAIN-AVI-001"
                onKeyDown={(e) => e.key === 'Enter' && simulateScan()}
              />
              <button
                onClick={() => simulateScan()}
                disabled={!tagInput.trim() || scanning}
                className="btn-primary px-3 py-2 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {scanning ? '...' : 'Scan'}
              </button>
            </div>

            {hasSearched && result === 'notfound' && !scanning && (
              <div className="mt-3 p-2 rounded-md bg-rain-red/10 border border-rain-red/30 text-rain-red text-xs font-mono">
                No preset found for tag ID: {tagInput}
              </div>
            )}
          </div>

          {/* Known tags reference */}
          <div className="card">
            <p className="section-header">Known Tag IDs</p>
            <p className="text-rain-muted text-xs mb-3">Tap a tag ID to simulate scanning it.</p>
            <div className="space-y-1.5">
              {knownTags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => {
                    setTagInput(tag.id);
                    simulateScan(tag.id);
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg bg-rain-surface border border-rain-border hover:border-rain-blue/40 active:border-rain-blue transition-colors text-left"
                >
                  <div>
                    <span className="font-mono text-xs text-rain-blue">{tag.id}</span>
                    <p className="text-rain-muted text-xs mt-0.5">{tag.name}</p>
                  </div>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-rain-muted">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Info box */}
          <div className="card border-rain-amber/20 bg-rain-amber/5">
            <p className="section-header text-rain-amber">About NFC Integration</p>
            <p className="text-rain-text text-xs leading-relaxed">
              This system is structurally NFC-ready. Physical NFC tag scanning requires hardware Web NFC API support (Chrome on Android) and compatible NFC tags programmed with RAIN tag IDs. This interface simulates the scanning workflow without hardware dependencies.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
