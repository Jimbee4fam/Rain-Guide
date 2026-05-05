import { Preset } from '../types';
import { CATEGORY_ICONS } from '../data/presets';

interface PresetCardProps {
  preset: Preset;
  onSelect: (preset: Preset) => void;
  onToggleFavorite: (id: string) => void;
}

export default function PresetCard({ preset, onSelect, onToggleFavorite }: PresetCardProps) {
  const icon = CATEGORY_ICONS[preset.category] || '📡';

  const freqDisplay =
    preset.frequencyType === 'range'
      ? `${preset.frequencyStart} – ${preset.frequencyEnd}`
      : preset.frequency || '—';

  return (
    <div
      className={`
        card cursor-pointer hover:border-rain-green/40 active:border-rain-green
        transition-all duration-150 active:scale-[0.99]
        ${preset.isFavorite ? 'border-rain-green/30' : ''}
      `}
      onClick={() => onSelect(preset)}
    >
      <div className="flex items-start gap-3">
        {/* Icon + category badge */}
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-rain-surface border border-rain-border flex items-center justify-center text-lg">
          {icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-rain-text font-sans font-medium text-sm leading-snug truncate">
                {preset.name}
              </h3>
              <span className={`tag-badge category-${preset.category} inline-block mt-1`}>
                {preset.category.toUpperCase()}
              </span>
            </div>

            {/* Favorite button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(preset.id);
              }}
              className={`flex-shrink-0 p-1 rounded transition-colors ${
                preset.isFavorite
                  ? 'text-rain-amber'
                  : 'text-rain-muted hover:text-rain-amber'
              }`}
              aria-label={preset.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg viewBox="0 0 24 24" fill={preset.isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
            </button>
          </div>

          {/* Frequency */}
          <div className="mt-2 font-mono text-rain-green text-xs font-semibold truncate glow-green">
            {freqDisplay}
          </div>

          {/* Mode + bandwidth */}
          <div className="mt-1 flex items-center gap-2 text-rain-muted text-xs font-mono">
            <span className="bg-rain-surface border border-rain-border px-1.5 py-0.5 rounded text-[10px]">
              {preset.mode}
            </span>
            <span>{preset.bandwidth}</span>
            {preset.nfcTagId && (
              <span className="ml-auto text-rain-blue/70 text-[10px]">NFC</span>
            )}
          </div>
        </div>
      </div>

      {/* Tags */}
      {preset.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3 pl-13">
          {preset.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="text-[10px] font-mono text-rain-muted bg-rain-surface border border-rain-border px-1.5 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
