import type { Attraction } from '../data/roteiro';
import { CATEGORY_COLORS, CATEGORY_LABELS } from '../data/roteiro';

interface Props {
  attraction: Attraction;
  index: number;
  isSelected: boolean;
  accentColor: string;
  isVisited: boolean;
  onToggleVisited: () => void;
  onClick: () => void;
}

const priceStyle: Record<number, { color: string; label: string }> = {
  0: { color: '#2d7d32', label: 'Gratuito' },
  1: { color: '#e65100', label: 'Econômico' },
  2: { color: '#c62828', label: 'Moderado' },
  3: { color: '#6a1a1a', label: 'Premium' },
};

export default function AttractionCard({ attraction, index, isSelected, accentColor, isVisited, onToggleVisited, onClick }: Props) {
  const ps = priceStyle[attraction.priceValue];
  const isClosed = !attraction.open;

  return (
    <div
      className={`relative flex gap-3 p-3 rounded-xl mb-1.5 border cursor-pointer transition-all ${isSelected ? '' : 'hover:bg-[var(--card-hover)]'}`}
      style={{
        borderColor: isSelected ? `${accentColor}55` : isClosed ? '#f5c84255' : 'var(--border)',
        borderLeftWidth: '3px',
        borderLeftColor: isSelected ? accentColor : isClosed ? '#f59e0b' : isVisited ? '#9e9e9e' : 'var(--border)',
        background: isSelected ? `${accentColor}08` : isVisited ? 'var(--bg2)' : 'var(--card-bg)',
        opacity: isVisited && !isSelected ? 0.72 : 1,
        animationDelay: `${index * 45}ms`,
      }}
      onClick={onClick}
    >
      {/* Number circle */}
      <div className="flex flex-col items-center gap-1 pt-0.5 flex-shrink-0">
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{ background: isSelected ? accentColor : isVisited ? '#9e9e9e' : 'var(--bg3)', color: isSelected || isVisited ? '#fff' : 'var(--muted)' }}>
          {isVisited ? '✓' : index + 1}
        </div>
        <div className="w-px flex-1 min-h-[10px] timeline-line" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pb-1">
        {/* Header row */}
        <div className="flex items-start gap-1.5 mb-1">
          <span className="text-base flex-shrink-0">{attraction.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-1">
              <h3 className={`text-sm font-semibold leading-snug ${isVisited ? 'line-through' : ''}`}
                style={{ color: isVisited ? 'var(--muted)' : 'var(--text)' }}>
                {attraction.name}
              </h3>
              {/* Visited checkbox */}
              <button
                onClick={e => { e.stopPropagation(); onToggleVisited(); }}
                title={isVisited ? 'Marcar como não visitado' : 'Marcar como visitado'}
                className="flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all hover:scale-110"
                style={{ borderColor: isVisited ? '#9e9e9e' : accentColor, background: isVisited ? '#9e9e9e' : 'transparent' }}>
                {isVisited && <svg width="10" height="10" viewBox="0 0 12 12" fill="white"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>}
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
                style={{ background: `${CATEGORY_COLORS[attraction.category]}18`, color: CATEGORY_COLORS[attraction.category] }}>
                {CATEGORY_LABELS[attraction.category]}
              </span>
              <span className="text-[10px]" style={{ color: 'var(--muted)' }}>{attraction.time} · {attraction.duration}</span>
              {attraction.primeGourmet && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-amber-100 text-amber-700">🏷️ Prime</span>
              )}
              {isClosed && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-red-100 text-red-700">⚠️ Fechado</span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs leading-relaxed mb-2 line-clamp-2" style={{ color: 'var(--muted)' }}>
          {attraction.description}
        </p>

        {/* Closed alert */}
        {isClosed && (
          <div className="mb-2 p-2 rounded-lg text-xs font-medium" style={{ background: '#fef3c7', color: '#92400e', borderLeft: '2px solid #f59e0b' }}>
            ⚠️ {attraction.openNote}
          </div>
        )}

        {/* Price + hours */}
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px]">💰</span>
            <span className="text-xs font-semibold" style={{ color: ps.color }}>{attraction.price}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px]">🕐</span>
            <span className="text-xs" style={{ color: 'var(--muted)' }}>{attraction.hours}</span>
          </div>
        </div>

        {/* Expanded content when selected */}
        {isSelected && (
          <>
            {attraction.primeGourmet && attraction.primeNote && (
              <div className="mt-2 p-2.5 rounded-lg text-xs leading-relaxed font-medium" style={{ background: '#fffbeb', borderLeft: '2px solid #f59e0b', color: '#78350f' }}>
                🏷️ <strong>Prime Gourmet:</strong> {attraction.primeNote}
              </div>
            )}
            {attraction.tips && (
              <div className="mt-2 p-2.5 rounded-lg text-xs leading-relaxed" style={{ background: `${accentColor}10`, borderLeft: `2px solid ${accentColor}`, color: 'var(--text)' }}>
                💡 {attraction.tips}
              </div>
            )}
            <div className="flex gap-2 mt-2.5">
              <a href={attraction.mapsUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm hover:opacity-85 transition-all"
                style={{ background: accentColor, color: '#fff' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                Ver no mapa
              </a>
              <button onClick={e => { e.stopPropagation(); onToggleVisited(); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
                style={{ background: isVisited ? '#e0e0e0' : 'var(--bg3)', color: isVisited ? '#555' : 'var(--muted)' }}>
                {isVisited ? '↩ Desmarcar' : '✓ Já fui'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
