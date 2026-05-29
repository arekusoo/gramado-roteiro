import type { Day } from '../data/roteiro';

interface Props {
  days: Day[];
  selectedDay: number;
  onSelectDay: (d: number) => void;
  compact?: boolean;
}

export default function DaySelector({ days, selectedDay, onSelectDay, compact }: Props) {
  return (
    <div className="flex gap-1.5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
      {days.map((day) => {
        const isActive = day.day === selectedDay;
        return (
          <button
            key={day.day}
            onClick={() => onSelectDay(day.day)}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all relative"
            style={{
              background: isActive ? day.accentColor : 'rgba(255,255,255,0.9)',
              borderColor: isActive ? 'transparent' : 'rgba(0,0,0,0.1)',
              boxShadow: isActive ? `0 2px 12px ${day.accentColor}55` : '0 1px 4px rgba(0,0,0,0.08)',
            }}
          >
            {/* Badge for nabs / half day */}
            {day.nabs && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 flex items-center justify-center text-[7px] font-bold text-white">N</span>
            )}
            {day.halfDay && !day.nabs && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center text-[7px] font-bold text-white">½</span>
            )}

            <span
              className="text-xs font-bold leading-none"
              style={{ color: isActive ? '#fff' : 'var(--text)' }}
            >
              Dia {day.day}
            </span>
            <span
              className="text-[10px] leading-none"
              style={{ color: isActive ? 'rgba(255,255,255,0.8)' : 'var(--muted)' }}
            >
              {day.date.split(' ')[0]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
