import { useState } from 'react';
import { Preset, Category, SdrMode, FrequencyType } from '../types';

interface CustomPresetFormProps {
  existing?: Preset;
  onSave: (preset: Preset) => void;
  onCancel: () => void;
}

const CATEGORIES: Category[] = [
  'aviation', 'weather', 'marine', 'fm', 'am', 'cb',
  'railroad', 'frs', 'ham', 'hf', 'ais', 'utility', 'custom'
];

const MODES: SdrMode[] = ['AM', 'FM', 'NFM', 'WFM', 'USB', 'LSB', 'CW', 'DSB', 'RAW'];

function makeBlankPreset(): Preset {
  return {
    id: `custom-${Date.now()}`,
    name: '',
    category: 'custom',
    frequencyType: 'single',
    frequency: '',
    frequencyStart: '',
    frequencyEnd: '',
    mode: 'NFM',
    bandwidth: '12.5 kHz',
    step: '',
    description: '',
    antennaNote: '',
    tags: [],
    isFavorite: false,
    isCustom: true,
    nfcTagId: '',
    appSettings: {
      sdrpp: { mode: '', bandwidth: '', notes: '' },
      sdrsharp: { mode: '', filter: '', notes: '' },
      gqrx: { mode: '', filterWidth: '', notes: '' },
      dragonos: { notes: '' },
    },
  };
}

export default function CustomPresetForm({ existing, onSave, onCancel }: CustomPresetFormProps) {
  const [form, setForm] = useState<Preset>(existing ? { ...existing } : makeBlankPreset());
  const [tagsInput, setTagsInput] = useState(existing ? existing.tags.join(', ') : '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function update<K extends keyof Preset>(key: K, value: Preset[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (form.frequencyType === 'single' && !form.frequency?.trim())
      e.frequency = 'Frequency is required';
    if (form.frequencyType === 'range') {
      if (!form.frequencyStart?.trim()) e.frequencyStart = 'Start frequency required';
      if (!form.frequencyEnd?.trim()) e.frequencyEnd = 'End frequency required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);
    onSave({ ...form, tags });
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-rain-bg">
      {/* Header */}
      <div className="flex-shrink-0 bg-rain-surface border-b border-rain-border px-4 py-3 flex items-center gap-3">
        <button onClick={onCancel} className="p-2 -ml-2 text-rain-muted hover:text-rain-text">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h2 className="font-mono font-semibold text-rain-green text-sm flex-1">
          {existing ? 'Edit Preset' : 'New Custom Preset'}
        </h2>
        <button onClick={handleSave} className="btn-primary text-xs py-1.5">
          Save
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4 pb-10">

          {/* Basic Info */}
          <section className="card space-y-3">
            <p className="section-header">Basic Info</p>

            <div>
              <label className="text-xs text-rain-muted font-mono mb-1 block">Name *</label>
              <input
                className="w-full"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="e.g. Local Police Dispatch"
              />
              {errors.name && <p className="text-rain-red text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="text-xs text-rain-muted font-mono mb-1 block">Category</label>
              <select
                className="w-full"
                value={form.category}
                onChange={(e) => update('category', e.target.value as Category)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c.toUpperCase()}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-rain-muted font-mono mb-1 block">Description</label>
              <textarea
                className="w-full h-20 resize-none"
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
                placeholder="What is this frequency used for?"
              />
            </div>
          </section>

          {/* Frequency */}
          <section className="card space-y-3">
            <p className="section-header">Frequency</p>

            <div className="flex gap-3">
              {(['single', 'range'] as FrequencyType[]).map((ft) => (
                <button
                  key={ft}
                  onClick={() => update('frequencyType', ft)}
                  className={`flex-1 py-2 rounded-md text-xs font-mono border transition-colors ${
                    form.frequencyType === ft
                      ? 'border-rain-green text-rain-green bg-rain-green/10'
                      : 'border-rain-border text-rain-muted hover:border-rain-text'
                  }`}
                >
                  {ft === 'single' ? 'Single Frequency' : 'Frequency Range'}
                </button>
              ))}
            </div>

            {form.frequencyType === 'single' ? (
              <div>
                <label className="text-xs text-rain-muted font-mono mb-1 block">Frequency *</label>
                <input
                  className="w-full"
                  value={form.frequency || ''}
                  onChange={(e) => update('frequency', e.target.value)}
                  placeholder="e.g. 156.800 MHz"
                />
                {errors.frequency && <p className="text-rain-red text-xs mt-1">{errors.frequency}</p>}
              </div>
            ) : (
              <>
                <div>
                  <label className="text-xs text-rain-muted font-mono mb-1 block">Start Frequency *</label>
                  <input
                    className="w-full"
                    value={form.frequencyStart || ''}
                    onChange={(e) => update('frequencyStart', e.target.value)}
                    placeholder="e.g. 118.000 MHz"
                  />
                  {errors.frequencyStart && <p className="text-rain-red text-xs mt-1">{errors.frequencyStart}</p>}
                </div>
                <div>
                  <label className="text-xs text-rain-muted font-mono mb-1 block">End Frequency *</label>
                  <input
                    className="w-full"
                    value={form.frequencyEnd || ''}
                    onChange={(e) => update('frequencyEnd', e.target.value)}
                    placeholder="e.g. 137.000 MHz"
                  />
                  {errors.frequencyEnd && <p className="text-rain-red text-xs mt-1">{errors.frequencyEnd}</p>}
                </div>
              </>
            )}

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-rain-muted font-mono mb-1 block">Mode</label>
                <select
                  className="w-full"
                  value={form.mode}
                  onChange={(e) => update('mode', e.target.value as SdrMode)}
                >
                  {MODES.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-rain-muted font-mono mb-1 block">Bandwidth</label>
                <input
                  className="w-full"
                  value={form.bandwidth}
                  onChange={(e) => update('bandwidth', e.target.value)}
                  placeholder="12.5 kHz"
                />
              </div>
              <div>
                <label className="text-xs text-rain-muted font-mono mb-1 block">Step</label>
                <input
                  className="w-full"
                  value={form.step || ''}
                  onChange={(e) => update('step', e.target.value)}
                  placeholder="25 kHz"
                />
              </div>
            </div>
          </section>

          {/* Antenna & Tags */}
          <section className="card space-y-3">
            <p className="section-header">Antenna & Tags</p>
            <div>
              <label className="text-xs text-rain-muted font-mono mb-1 block">Antenna Note</label>
              <input
                className="w-full"
                value={form.antennaNote}
                onChange={(e) => update('antennaNote', e.target.value)}
                placeholder="e.g. VHF vertical, discone"
              />
            </div>
            <div>
              <label className="text-xs text-rain-muted font-mono mb-1 block">Tags (comma separated)</label>
              <input
                className="w-full"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="e.g. vhf, police, local"
              />
            </div>
            <div>
              <label className="text-xs text-rain-muted font-mono mb-1 block">NFC Tag ID</label>
              <input
                className="w-full"
                value={form.nfcTagId || ''}
                onChange={(e) => update('nfcTagId', e.target.value)}
                placeholder="e.g. RAIN-CUSTOM-001"
              />
            </div>
          </section>

          {/* SDR App Notes */}
          <section className="card space-y-3">
            <p className="section-header">SDR App Notes (Optional)</p>
            {(['sdrpp', 'sdrsharp', 'gqrx', 'dragonos'] as const).map((app) => (
              <div key={app}>
                <label className="text-xs text-rain-muted font-mono mb-1 block">{app.toUpperCase()}</label>
                <input
                  className="w-full"
                  value={form.appSettings[app].notes || ''}
                  onChange={(e) =>
                    update('appSettings', {
                      ...form.appSettings,
                      [app]: { ...form.appSettings[app], notes: e.target.value },
                    })
                  }
                  placeholder={`Notes for ${app}`}
                />
              </div>
            ))}
          </section>

        </div>
      </div>
    </div>
  );
}
