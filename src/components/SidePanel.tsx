import { useRef, useEffect } from 'react';
import type { Day, Attraction } from '../data/roteiro';
import AttractionCard from './AttractionCard';

interface Props {
  days: Day[];
  selectedDay: number;
  selectedAttraction: Attraction | null;
  onSelectDay: (d: number) => void;
  onSelectAttraction: (a: Attraction | null) => void;
  isOpen: boolean;
  onClose: () => void;
  visited: Set<string>;
  toggleVisited: (id: string) => void;
}

export default function SidePanel({
  days, selectedDay, selectedAttraction,
  onSelectDay, onSelectAttraction,
  isOpen, onClose,
  visited, toggleVisited,
}: Props) {
  const currentDay = days.find(d => d.day === selectedDay)!;
  const listRef = useRef<HTMLDivElement>(null);
  const freeCount = currentDay.attractions.filter(a => a.priceValue === 0).length;
  const primeCount = currentDay.attractions.filter(a => a.primeGourmet).length;
  const visitedCount = currentDay.attractions.filter(a => visited.has(a.id)).length;

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = 0;
  }, [selectedDay]);

  return (
    <>
      {/* Backdrop — mobile only */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[950] lg:hidden"
          style={{ background: 'rgba(0,0,0,0.25)' }}
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={[
          // Mobile: slides up from bottom
          'fixed lg:relative z-[960] lg:z-auto',
          'left-0 right-0 bottom-0',
          'lg:left-auto lg:right-auto lg:bottom-auto lg:top-auto',
          // Desktop width
          'lg:w-[390px] xl:w-[430px] lg:h-full',
          'flex flex-col',
          'transition-transform duration-300 ease-out',
          // Mobile: hidden by default, slides up when open
          isOpen ? 'translate-y-0' : 'translate-y-full lg:translate-y-0',
        ].join(' ')}
        style={{
          background: 'var(--panel)',
          borderTop: '1px solid var(--border)',
          borderLeft: '1px solid var(--border)',
          maxHeight: '88vh',
          borderRadius: '20px 20px 0 0',
        }}
      >
        {/* ── Mobile drag handle ── */}
        <div
          className="lg:hidden flex-shrink-0 flex flex-col items-center pt-3 pb-1 cursor-pointer"
          onClick={onClose}
        >
          <div className="w-10 h-1 rounded-full" style={{ background: 'var(--border)' }} />
        </div>

        {/* ── HEADER ── */}
        <div className="flex-shrink-0 px-4 pt-3 pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
          {/* Title row */}
          <div className="flex items-start justify-between mb-2.5">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <div className="w-2 h-2 rounded-full" style={{ background: currentDay.accentColor }} />
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
                  {currentDay.weekday} · {currentDay.date} · Dia {currentDay.day}/{days.length}
                </span>
              </div>
              <h2 className="font-display text-2xl font-bold leading-tight" style={{ color: 'var(--text)' }}>
                {currentDay.title}
              </h2>
              <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>{currentDay.subtitle}</p>
            </div>
            <div className="flex gap-2 items-center ml-2">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: `${currentDay.accentColor}18` }}
              >
                {currentDay.nabs ? '⚠️' : currentDay.halfDay ? '🕛' : currentDay.attractions[0]?.emoji}
              </div>
              {/* Close button desktop */}
              <button
                className="hidden lg:flex w-8 h-8 rounded-xl items-center justify-center transition-all hover:opacity-70"
                style={{ background: 'var(--bg3)', color: 'var(--muted)' }}
                onClick={onClose}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Alert banners */}
          {currentDay.nabs && (
            <div className="mb-2 px-3 py-2 rounded-xl text-xs font-medium" style={{ background: '#fffbeb', border: '1px solid #f59e0b', color: '#92400e' }}>
              ⚠️ <strong>nabs não estará presente.</strong> Passeio solo!
            </div>
          )}
          {currentDay.halfDay && (
            <div className="mb-2 px-3 py-2 rounded-xl text-xs font-medium" style={{ background: '#e8f5e9', border: '1px solid #4caf50', color: '#1b5e20' }}>
              🕛 <strong>Saída ao meio-dia</strong> — programação leve pela manhã.
            </div>
          )}

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'paradas', value: String(currentDay.attractions.length), color: 'var(--text)' },
              { label: 'prime 🏷️', value: primeCount > 0 ? `${primeCount}` : '–', color: '#b45309' },
              { label: 'visitados', value: `${visitedCount}/${currentDay.attractions.length}`, color: currentDay.accentColor },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-2 text-center" style={{ background: 'var(--bg2)' }}>
                <div className="text-sm font-bold leading-tight" style={{ color: s.color }}>{s.value}</div>
                <div className="text-[9px] uppercase tracking-wide mt-0.5" style={{ color: 'var(--muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── ATTRACTION LIST — scrollable ── */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto px-3 py-2"
          style={{ minHeight: 0, WebkitOverflowScrolling: 'touch' }}
        >
          {currentDay.attractions.map((attraction, i) => (
            <AttractionCard
              key={attraction.id}
              attraction={attraction}
              index={i}
              isSelected={selectedAttraction?.id === attraction.id}
              accentColor={currentDay.accentColor}
              isVisited={visited.has(attraction.id)}
              onToggleVisited={() => toggleVisited(attraction.id)}
              onClick={() => onSelectAttraction(
                selectedAttraction?.id === attraction.id ? null : attraction
              )}
            />
          ))}
          <div className="h-8" />
        </div>

        {/* ── FOOTER ── */}
        <div
          className="flex-shrink-0 px-4 py-3 flex items-center justify-between"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <div>
            <p className="font-display text-xs font-semibold" style={{ color: '#b8860b' }}>
              Gramado & Canela
            </p>
            <p className="text-[10px]" style={{ color: 'var(--muted)' }}>
              19–24 Jul · N = sem nabs · ½ = meio dia
            </p>
          </div>
          {/* Dot progress */}
          <div className="flex gap-1.5 items-center">
            {days.map(d => (
              <div
                key={d.day}
                onClick={() => onSelectDay(d.day)}
                className="cursor-pointer rounded-full transition-all"
                style={{
                  width: d.day === selectedDay ? '20px' : '6px',
                  height: '6px',
                  background: d.day === selectedDay
                    ? d.accentColor
                    : d.nabs ? '#f59e0b55' : 'var(--border)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
