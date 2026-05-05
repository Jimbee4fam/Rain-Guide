import { useState } from 'react';
import { Preset } from '../types';
import PresetCard from '../components/PresetCard';
import PresetDetail from '../components/PresetDetail';
import CustomPresetForm from '../components/CustomPresetForm';

interface CustomPresetsProps {
  presets: Preset[];
  onAdd: (preset: Preset) => void;
  onEdit: (preset: Preset) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export default function CustomPresets({
  presets,
  onAdd,
  onEdit,
  onDelete,
  onToggleFavorite,
}: CustomPresetsProps) {
  const [selected, setSelected] = useState<Preset | null>(null);
  const [editing, setEditing] = useState<Preset | 'new' | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const customPresets = presets.filter((p) => p.isCustom);

  function handleToggle(id: string) {
    onToggleFavorite(id);
    if (selected?.id === id) {
      setSelected((prev) => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
    }
  }

  function handleDelete(id: string) {
    onDelete(id);
    setConfirmDelete(null);
    setSelected(null);
  }

  if (editing !== null) {
    const existingPreset = editing !== 'new' ? editing as Preset : undefined;
    return (
      <CustomPresetForm
        existing={existingPreset}
        onSave={(p) => {
          if (editing === 'new') { onAdd(p); } else { onEdit(p); setSelected(null); }
          setEditing(null);
        }}
        onCancel={() => setEditing(null)}
      />
    );
  }

  if (selected) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-rain-bg">
        <PresetDetail
          preset={selected}
          onClose={() => setSelected(null)}
          onToggleFavorite={handleToggle}
        />
        {/* Edit/Delete bar */}
        <div className="flex-shrink-0 bg-rain-surface border-t border-rain-border px-4 py-3 flex gap-3">
          <button
            onClick={() => setEditing(selected)}
            className="flex-1 btn-secondary text-xs"
          >
            Edit
          </button>
          <button
            onClick={() => setConfirmDelete(selected.id)}
            className="flex-1 btn-danger text-xs"
          >
            Delete
          </button>
        </div>

        {/* Confirm delete modal */}
        {confirmDelete && (
          <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-6">
            <div className="card w-full max-w-sm">
              <h3 className="font-mono font-semibold text-rain-text text-sm mb-2">Delete Preset?</h3>
              <p className="text-rain-muted text-xs mb-4">
                "{selected.name}" will be permanently deleted from your custom presets.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmDelete(null)} className="flex-1 btn-secondary text-xs">
                  Cancel
                </button>
                <button onClick={() => handleDelete(confirmDelete)} className="flex-1 btn-danger text-xs">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 bg-rain-surface border-b border-rain-border px-4 py-3 flex items-center justify-between">
        <div>
          <h2 className="font-mono font-bold text-rain-green text-base glow-green tracking-widest">
            CUSTOM PRESETS
          </h2>
          <p className="text-rain-muted text-xs font-mono mt-0.5">
            {customPresets.length} preset{customPresets.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => setEditing('new')}
          className="btn-primary text-xs flex items-center gap-1.5"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {customPresets.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <span className="text-5xl mb-4">➕</span>
            <p className="text-rain-text font-mono text-sm">No custom presets</p>
            <p className="text-rain-muted text-xs mt-2 leading-relaxed mb-6">
              Add your own frequencies, local repeaters, or anything not in the built-in list.
            </p>
            <button onClick={() => setEditing('new')} className="btn-primary">
              Add First Preset
            </button>
          </div>
        ) : (
          <div className="p-3 space-y-2 pb-6 page-enter">
            {customPresets.map((preset) => (
              <div key={preset.id} className="relative">
                <PresetCard
                  preset={preset}
                  onSelect={setSelected}
                  onToggleFavorite={handleToggle}
                />
                <div className="absolute top-2 right-10 flex gap-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); setEditing(preset); }}
                    className="p-1.5 rounded text-rain-muted hover:text-rain-blue hover:bg-rain-surface transition-colors"
                    title="Edit"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
