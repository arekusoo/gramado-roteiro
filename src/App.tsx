import { useState } from 'react';
import { ROTEIRO } from './data/roteiro';
import type { Attraction } from './data/roteiro';
import MapView from './components/MapView';
import SidePanel from './components/SidePanel';
import DaySelector from './components/DaySelector';

function App() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [visited, setVisited] = useState<Set<string>>(new Set());

  const toggleVisited = (id: string) => {
    setVisited(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSelectDay = (day: number) => {
    setSelectedDay(day);
    setSelectedAttraction(null);
  };

  const handleSelectAttraction = (attraction: Attraction | null) => {
    setSelectedAttraction(attraction);
  };

  const currentDay = ROTEIRO.find(d => d.day === selectedDay)!;

  return (
    <div
      className="flex flex-col lg:flex-row w-full h-full relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* ── MAP fills all space ── */}
      <div className="flex-1 relative">
        <MapView
          days={ROTEIRO}
          selectedDay={selectedDay}
          selectedAttraction={selectedAttraction}
          onSelectAttraction={handleSelectAttraction}
          onOpenPanel={() => setPanelOpen(true)}
          visited={visited}
        />

        {/* ── DAY SELECTOR — always visible over the map, top ── */}
        <div
          className="absolute top-0 left-0 right-0 z-[900] px-3 pt-3 pb-4"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.96) 65%, transparent)',
            pointerEvents: 'none',
          }}
        >
          {/* Title */}
          <div className="flex items-center gap-2 mb-2" style={{ pointerEvents: 'all' }}>
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: currentDay.accentColor }} />
            <span className="font-display text-sm font-bold" style={{ color: 'var(--text)' }}>
              Gramado & Canela
            </span>
            <span className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
              19–24 Jul
            </span>
          </div>

          {/* Day pills */}
          <div style={{ pointerEvents: 'all' }}>
            <DaySelector
              days={ROTEIRO}
              selectedDay={selectedDay}
              onSelectDay={handleSelectDay}
            />
          </div>
        </div>
      </div>

      {/* ── SIDE PANEL — slides up on button click ── */}
      <SidePanel
        days={ROTEIRO}
        selectedDay={selectedDay}
        selectedAttraction={selectedAttraction}
        onSelectDay={d => { handleSelectDay(d); setPanelOpen(true); }}
        onSelectAttraction={handleSelectAttraction}
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        visited={visited}
        toggleVisited={toggleVisited}
      />
    </div>
  );
}

export default App;
