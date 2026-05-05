import { useState } from 'react';
import { Preset } from '../types';
import PresetCard from '../components/PresetCard';
import PresetDetail from '../components/PresetDetail';

interface FavoritesProps {
  presets: Preset[];
  onToggleFavorite: (id: string) => void;
}

export default function Favorites({ presets, onToggleFavorite }: FavoritesProps) {
  const [selected, setSelected] = useState<Preset | null>(null);

  const favorites = presets.filter((p) => p.isFavorite);

  function handleToggle(id: string) {
    onToggleFavorite(id);
    if (selected?.id === id) {
      setSelected((prev) => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
    }
  }

  if (selected) {
    return (
      <PresetDetail
        preset={selected}
        onClose={() => setSelected(null)}
        onToggleFavorite={handleToggle}
      />
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 bg-rain-surface border-b border-rain-border px-4 py-3">
        <h2 className="font-mono font-bold text-rain-amber text-base glow-amber tracking-widest">
          ⭐ FAVORITES
        </h2>
        <p className="text-rain-muted text-xs font-mono mt-0.5">
          {favorites.length} saved preset{favorites.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <span className="text-5xl mb-4">⭐</span>
            <p className="text-rain-text font-mono text-sm">No favorites yet</p>
            <p className="text-rain-muted text-xs mt-2 leading-relaxed">
              Tap the star icon on any preset in Signal Stack to save it here for quick access.
            </p>
          </div>
        ) : (
          <div className="p-3 space-y-2 pb-6 page-enter">
            {favorites.map((preset) => (
              <PresetCard
                key={preset.id}
                preset={preset}
                onSelect={setSelected}
                onToggleFavorite={handleToggle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
