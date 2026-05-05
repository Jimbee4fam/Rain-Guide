import { useState, useMemo, useCallback } from 'react';
import { Preset, Category } from '../types';
import { CATEGORIES, CATEGORY_ICONS } from '../data/presets';
import PresetCard from '../components/PresetCard';
import PresetDetail from '../components/PresetDetail';

interface SignalStackProps {
  presets: Preset[];
  onToggleFavorite: (id: string) => void;
}

export default function SignalStack({ presets, onToggleFavorite }: SignalStackProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'all' | Category>('all');
  const [selected, setSelected] = useState<Preset | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return presets.filter((p) => {
      const matchCat = category === 'all' || p.category === category;
      if (!matchCat) return false;
      if (!q) return true;

      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.mode.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        (p.frequency?.toLowerCase().includes(q)) ||
        (p.frequencyStart?.toLowerCase().includes(q)) ||
        (p.frequencyEnd?.toLowerCase().includes(q))
      );
    });
  }, [presets, search, category]);

  const handleSelect = useCallback((preset: Preset) => {
    setSelected(preset);
  }, []);

  const handleClose = useCallback(() => setSelected(null), []);

  const handleToggle = useCallback((id: string) => {
    onToggleFavorite(id);
    if (selected?.id === id) {
      setSelected((prev) => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
    }
  }, [onToggleFavorite, selected]);

  // Category counts
  const catCounts = useMemo(() => {
    const counts: Record<string, number> = { all: presets.length };
    presets.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [presets]);

  if (selected) {
    return (
      <PresetDetail
        preset={selected}
        onClose={handleClose}
        onToggleFavorite={handleToggle}
      />
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 bg-rain-surface border-b border-rain-border px-4 py-3">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">{CATEGORY_ICONS[category] || '📡'}</span>
          <h2 className="font-mono font-bold text-rain-green text-base glow-green tracking-widest">
            SIGNAL STACK
          </h2>
          <span className="ml-auto font-mono text-xs text-rain-muted">
            {filtered.length} preset{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Search */}
        <div className="relative">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rain-muted">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="search"
            className="w-full pl-9 pr-4"
            placeholder="Search name, freq, mode, tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-rain-muted hover:text-rain-text"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Category filter — horizontal scroll */}
      <div className="flex-shrink-0 bg-rain-surface border-b border-rain-border overflow-x-auto">
        <div className="flex gap-1 px-3 py-2 min-w-max">
          {CATEGORIES.filter((c) => (catCounts[c.value] || 0) > 0 || c.value === 'all').map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value as 'all' | Category)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-mono whitespace-nowrap border transition-colors ${
                category === c.value
                  ? 'bg-rain-green text-rain-bg border-rain-green font-bold'
                  : 'border-rain-border text-rain-muted hover:border-rain-text hover:text-rain-text'
              }`}
            >
              {c.value !== 'all' && CATEGORY_ICONS[c.value]}{' '}
              {c.label}
              {catCounts[c.value] ? (
                <span className="ml-1 opacity-60">
                  {catCounts[c.value]}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <span className="text-4xl mb-3">🔍</span>
            <p className="text-rain-muted font-mono text-sm">No presets found</p>
            <p className="text-rain-muted/60 text-xs mt-1">Try a different search or category</p>
            {search && (
              <button onClick={() => setSearch('')} className="mt-4 btn-secondary text-xs">
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="p-3 space-y-2 pb-6">
            {filtered.map((preset) => (
              <PresetCard
                key={preset.id}
                preset={preset}
                onSelect={handleSelect}
                onToggleFavorite={handleToggle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
