import { useState, useMemo, useCallback } from 'react';
import { Page, Preset } from './types';
import { DEFAULT_PRESETS } from './data/presets';
import { useLocalStorage } from './hooks/useLocalStorage';
import Nav from './components/Nav';
import Home from './pages/Home';
import SignalStack from './pages/SignalStack';
import ScanTag from './pages/ScanTag';
import Favorites from './pages/Favorites';
import CustomPresets from './pages/CustomPresets';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Persist favorites (set of ids)
  const [favoriteIds, setFavoriteIds] = useLocalStorage<Record<string, boolean>>(
    'rain-favorites',
    {}
  );

  // Persist custom presets
  const [customPresets, setCustomPresets] = useLocalStorage<Preset[]>(
    'rain-custom-presets',
    []
  );

  // Merge default + custom, applying favorite state
  const allPresets = useMemo<Preset[]>(() => {
    const defaults = DEFAULT_PRESETS.map((p) => ({
      ...p,
      isFavorite: !!favoriteIds[p.id],
    }));
    const customs = customPresets.map((p) => ({
      ...p,
      isFavorite: !!favoriteIds[p.id],
    }));
    return [...defaults, ...customs];
  }, [favoriteIds, customPresets]);

  const handleToggleFavorite = useCallback((id: string) => {
    setFavoriteIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, [setFavoriteIds]);

  const handleAddCustom = useCallback((preset: Preset) => {
    setCustomPresets((prev) => [...prev, preset]);
  }, [setCustomPresets]);

  const handleEditCustom = useCallback((preset: Preset) => {
    setCustomPresets((prev) => prev.map((p) => (p.id === preset.id ? preset : p)));
  }, [setCustomPresets]);

  const handleDeleteCustom = useCallback((id: string) => {
    setCustomPresets((prev) => prev.filter((p) => p.id !== id));
    setFavoriteIds((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, [setCustomPresets, setFavoriteIds]);

  const favoriteCount = useMemo(
    () => allPresets.filter((p) => p.isFavorite).length,
    [allPresets]
  );

  const customCount = customPresets.length;

  return (
    <div className="flex flex-col h-full noise-overlay">
      {/* Page content */}
      <main className="flex-1 overflow-hidden" style={{ paddingBottom: 'calc(56px + env(safe-area-inset-bottom, 0px))' }}>
        {currentPage === 'home' && <Home />}
        {currentPage === 'signal-stack' && (
          <SignalStack
            presets={allPresets}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
        {currentPage === 'scan-tag' && (
          <ScanTag
            presets={allPresets}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
        {currentPage === 'favorites' && (
          <Favorites
            presets={allPresets}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
        {currentPage === 'custom-presets' && (
          <CustomPresets
            presets={allPresets}
            onAdd={handleAddCustom}
            onEdit={handleEditCustom}
            onDelete={handleDeleteCustom}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </main>

      {/* Bottom nav */}
      <Nav
        current={currentPage}
        onNavigate={setCurrentPage}
        favoriteCount={favoriteCount}
        customCount={customCount}
      />
    </div>
  );
}
