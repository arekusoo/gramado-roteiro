import { useEffect, useRef, useState, useCallback } from 'react';
import type { Attraction, Day } from '../data/roteiro';

interface MapViewProps {
  days: Day[];
  selectedDay: number;
  selectedAttraction: Attraction | null;
  onSelectAttraction: (a: Attraction) => void;
  onOpenPanel: () => void;
  visited: Set<string>;
}

function latLngToTile(lat: number, lng: number, zoom: number) {
  return {
    x: Math.floor(((lng + 180) / 360) * Math.pow(2, zoom)),
    y: Math.floor(
      ((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2)
      * Math.pow(2, zoom)
    ),
  };
}

function latLngToPixel(lat: number, lng: number, zoom: number, originTile: { x: number; y: number }, tileSize: number) {
  const scale = Math.pow(2, zoom);
  const worldX = ((lng + 180) / 360) * scale * tileSize;
  const sinLat = Math.sin(lat * Math.PI / 180);
  const worldY = (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * scale * tileSize;
  return { x: worldX - originTile.x * tileSize, y: worldY - originTile.y * tileSize };
}

export default function MapView({ days, selectedDay, selectedAttraction, onSelectAttraction, onOpenPanel, visited }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 800, h: 600 });
  const [zoom, setZoom] = useState(14);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ startX: number; startY: number; panX: number; panY: number; moved: boolean } | null>(null);
  const touchRef = useRef<{ startX: number; startY: number; panX: number; panY: number; moved: boolean } | null>(null);
  const [activePin, setActivePin] = useState<Attraction | null>(null);

  const currentDay = days.find(d => d.day === selectedDay);
  const attractions = currentDay?.attractions ?? [];
  const accentColor = currentDay?.accentColor ?? '#3d8b20';
  const TILE = 256;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setSize({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Reset on day change
  useEffect(() => { setPan({ x: 0, y: 0 }); setActivePin(null); }, [selectedDay]);
  // Sync from outside selection
  useEffect(() => { if (selectedAttraction) setActivePin(selectedAttraction); }, [selectedAttraction]);

  const target = activePin ?? attractions[0];
  const centerLat = target?.lat ?? -29.381;
  const centerLng = target?.lng ?? -50.874;
  const centerTile = latLngToTile(centerLat, centerLng, zoom);
  const centerPixelInTile = latLngToPixel(centerLat, centerLng, zoom, centerTile, TILE);
  const tilesX = Math.ceil(size.w / TILE) + 3;
  const tilesY = Math.ceil(size.h / TILE) + 3;
  const halfTilesX = Math.floor(tilesX / 2);
  const halfTilesY = Math.floor(tilesY / 2);
  const offsetX = size.w / 2 - centerPixelInTile.x - halfTilesX * TILE + pan.x;
  const offsetY = size.h / 2 - centerPixelInTile.y - halfTilesY * TILE + pan.y;

  const tiles = [];
  const sub = ['a', 'b', 'c'];
  for (let dy = 0; dy < tilesY; dy++) {
    for (let dx = 0; dx < tilesX; dx++) {
      const tx = centerTile.x - halfTilesX + dx;
      const ty = centerTile.y - halfTilesY + dy;
      const max = Math.pow(2, zoom);
      const wtx = ((tx % max) + max) % max;
      tiles.push({
        x: dx, y: dy,
        key: `${zoom}-${tx}-${ty}`,
        url: `https://${sub[(wtx + ty) % 3]}.tile.openstreetmap.org/${zoom}/${wtx}/${ty}.png`,
      });
    }
  }

  const toScreen = (lat: number, lng: number) => {
    const origin = { x: centerTile.x - halfTilesX, y: centerTile.y - halfTilesY };
    const p = latLngToPixel(lat, lng, zoom, origin, TILE);
    return { x: p.x + offsetX, y: p.y + offsetY };
  };

  // Mouse drag — track movement to distinguish tap vs drag
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragRef.current = { startX: e.clientX, startY: e.clientY, panX: pan.x, panY: pan.y, moved: false };
  }, [pan]);
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragRef.current.moved = true;
    setPan({ x: dragRef.current.panX + dx, y: dragRef.current.panY + dy });
  }, []);
  const onMouseUp = useCallback((e: React.MouseEvent) => {
    if (dragRef.current && !dragRef.current.moved) {
      // tap on map background — close detail card
      setActivePin(null);
    }
    dragRef.current = null;
  }, []);

  // Touch drag
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchRef.current = { startX: t.clientX, startY: t.clientY, panX: pan.x, panY: pan.y, moved: false };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchRef.current) return;
    const t = e.touches[0];
    const dx = t.clientX - touchRef.current.startX;
    const dy = t.clientY - touchRef.current.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) touchRef.current.moved = true;
    setPan({ x: touchRef.current.panX + dx, y: touchRef.current.panY + dy });
  };
  const onTouchEnd = () => {
    if (touchRef.current && !touchRef.current.moved) setActivePin(null);
    touchRef.current = null;
  };

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setZoom(z => Math.min(18, Math.max(11, z + (e.deltaY < 0 ? 1 : -1))));
    setPan({ x: 0, y: 0 });
  }, []);

  const handlePinClick = (e: React.MouseEvent | React.TouchEvent, a: Attraction) => {
    e.stopPropagation();
    const isAlready = activePin?.id === a.id;
    setActivePin(isAlready ? null : a);
    onSelectAttraction(a);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none"
      style={{ cursor: dragRef.current?.moved ? 'grabbing' : 'grab', background: '#e8e4de' }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={() => { dragRef.current = null; }}
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* OSM tiles */}
      {tiles.map(tile => (
        <img
          key={tile.key}
          src={tile.url}
          alt=""
          draggable={false}
          style={{
            position: 'absolute',
            left: tile.x * TILE + offsetX,
            top: tile.y * TILE + offsetY,
            width: TILE, height: TILE,
            userSelect: 'none',
          }}
        />
      ))}

      {/* Attribution */}
      <div
        className="absolute bottom-20 right-2 z-10 text-[9px] px-1.5 py-0.5 rounded"
        style={{ background: 'rgba(255,255,255,0.8)', color: '#666' }}
      >
        © OpenStreetMap contributors
      </div>

      {/* ── NUMBERED PINS ── */}
      {attractions.map((a, i) => {
        const { x, y } = toScreen(a.lat, a.lng);
        const isSel = activePin?.id === a.id;
        const isVis = visited.has(a.id);
        const sz = isSel ? 44 : 34;
        const pinFill = isVis ? '#9e9e9e' : isSel ? accentColor : '#fff';
        const strokeCol = !a.open ? '#f59e0b' : accentColor;

        return (
          <div
            key={a.id}
            style={{
              position: 'absolute',
              left: x - sz / 2,
              top: y - sz,
              width: sz,
              zIndex: isSel ? 30 : 20,
              cursor: 'pointer',
              transition: 'all 0.18s ease',
            }}
            onMouseDown={e => e.stopPropagation()}
            onMouseUp={e => handlePinClick(e, a)}
            onTouchEnd={e => { e.stopPropagation(); handlePinClick(e, a); }}
          >
            <svg
              viewBox="0 0 40 48"
              width={sz}
              height={sz * 1.2}
              style={{ overflow: 'visible', filter: `drop-shadow(0 ${isSel ? 4 : 2}px ${isSel ? 10 : 5}px rgba(0,0,0,${isSel ? 0.38 : 0.22}))` }}
            >
              <path
                d="M20 2 C10.6 2 3 9.6 3 19 C3 31.5 20 46 20 46 C20 46 37 31.5 37 19 C37 9.6 29.4 2 20 2 Z"
                fill={pinFill}
                stroke={strokeCol}
                strokeWidth="2.5"
              />
              <circle cx="20" cy="19" r="10" fill={isSel ? 'rgba(255,255,255,0.22)' : strokeCol} />
              <text x="20" y="24" textAnchor="middle" fontSize={isSel ? '13' : '11'}
                fontWeight="700" fontFamily="DM Sans, system-ui, sans-serif" fill="#fff">
                {isVis ? '✓' : i + 1}
              </text>
              {a.primeGourmet && !isVis && (
                <>
                  <circle cx="33" cy="7" r="6" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
                  <text x="33" y="11" textAnchor="middle" fontSize="7" fontWeight="800" fontFamily="sans-serif" fill="#fff">P</text>
                </>
              )}
            </svg>
          </div>
        );
      })}

      {/* ── PIN DETAIL CARD — appears above pin on tap ── */}
      {activePin && (() => {
        const { x, y } = toScreen(activePin.lat, activePin.lng);
        const cardW = 260;
        const left = Math.min(Math.max(x - cardW / 2, 8), size.w - cardW - 8);
        const topRaw = y - 220;
        const top = topRaw < 90 ? y + 18 : topRaw;
        const arrowBelow = topRaw < 90;
        const isClosed = !activePin.open;

        return (
          <div
            key={activePin.id}
            style={{ position: 'absolute', left, top, zIndex: 50, width: cardW }}
            onMouseDown={e => e.stopPropagation()}
            onTouchStart={e => e.stopPropagation()}
          >
            <div
              className="rounded-2xl shadow-xl"
              style={{ background: '#fff', border: `2px solid ${isClosed ? '#f59e0b' : accentColor}`, overflow: 'hidden' }}
            >
              {/* Coloured top bar */}
              <div
                className="px-3 py-2 flex items-center justify-between"
                style={{ background: isClosed ? '#f59e0b' : accentColor }}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-lg leading-none">{activePin.emoji}</span>
                  <span className="text-xs font-bold text-white truncate">{activePin.name}</span>
                </div>
                <button
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ml-1"
                  style={{ background: 'rgba(255,255,255,0.25)', color: '#fff' }}
                  onMouseDown={e => e.stopPropagation()}
                  onClick={e => { e.stopPropagation(); setActivePin(null); }}
                >✕</button>
              </div>

              {/* Body */}
              <div className="px-3 py-2.5">
                {isClosed && (
                  <div className="mb-2 px-2 py-1 rounded-lg text-[11px] font-medium" style={{ background: '#fef3c7', color: '#92400e' }}>
                    ⚠️ {activePin.openNote}
                  </div>
                )}
                {activePin.primeGourmet && (
                  <div className="mb-2 px-2 py-1 rounded-lg text-[11px] font-medium" style={{ background: '#fffbeb', color: '#78350f' }}>
                    🏷️ {activePin.primeNote}
                  </div>
                )}

                <div className="flex items-center gap-1 mb-1">
                  <span className="text-[11px]" style={{ color: '#888' }}>{activePin.time}</span>
                  <span className="text-[11px]" style={{ color: '#ccc' }}>·</span>
                  <span className="text-[11px]" style={{ color: '#888' }}>{activePin.duration}</span>
                </div>

                <div className="text-[11px] font-semibold mb-0.5"
                  style={{ color: activePin.priceValue === 0 ? '#2d7d32' : activePin.priceValue === 1 ? '#e65100' : '#c62828' }}>
                  💰 {activePin.price}
                </div>
                <div className="text-[11px] mb-2.5" style={{ color: '#666' }}>
                  🕐 {activePin.hours}
                </div>

                <button
                  className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-xl text-xs font-semibold"
                  style={{ background: isClosed ? '#f59e0b' : accentColor, color: '#fff' }}
                  onPointerDown={e => e.stopPropagation()}
                  onTouchStart={e => e.stopPropagation()}
                  onTouchEnd={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    window.open(activePin.mapsUrl, '_blank');
                  }}
                  onClick={e => {
                    e.stopPropagation();
                    window.open(activePin.mapsUrl, '_blank');
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  Abrir no mapa
                </button>
              </div>
            </div>

            {/* Arrow */}
            {!arrowBelow && (
              <div style={{
                position: 'absolute', bottom: -8,
                left: `${Math.max(12, Math.min(x - left - 8, cardW - 20))}px`,
                borderLeft: '8px solid transparent', borderRight: '8px solid transparent',
                borderTop: `8px solid ${isClosed ? '#f59e0b' : accentColor}`,
              }} />
            )}
            {arrowBelow && (
              <div style={{
                position: 'absolute', top: -8,
                left: `${Math.max(12, Math.min(x - left - 8, cardW - 20))}px`,
                borderLeft: '8px solid transparent', borderRight: '8px solid transparent',
                borderBottom: `8px solid ${isClosed ? '#f59e0b' : accentColor}`,
              }} />
            )}
          </div>
        );
      })()}

      {/* ── ZOOM CONTROLS ── */}
      <div className="absolute right-3 bottom-20 z-20 flex flex-col gap-1">
        {[{ l: '+', d: 1 }, { l: '−', d: -1 }].map(b => (
          <button
            key={b.l}
            onMouseDown={e => e.stopPropagation()}
            onClick={() => { setZoom(z => Math.min(18, Math.max(11, z + b.d))); setPan({ x: 0, y: 0 }); }}
            className="w-9 h-9 rounded-xl text-base font-bold shadow-md flex items-center justify-center hover:opacity-80 transition-all"
            style={{ background: '#fff', color: '#333', border: '1px solid rgba(0,0,0,0.12)' }}
          >
            {b.l}
          </button>
        ))}
      </div>

      {/* ── "ROTEIRO DO DIA COMPLETO" BUTTON — fixed bottom ── */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center px-4"
        onMouseDown={e => e.stopPropagation()}
        onTouchStart={e => e.stopPropagation()}
      >
        <button
          onClick={onOpenPanel}
          className="flex items-center gap-2.5 px-5 py-3 rounded-full shadow-lg transition-all hover:opacity-90 active:scale-95"
          style={{
            background: accentColor,
            color: '#fff',
            boxShadow: `0 4px 20px ${accentColor}55`,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
            <path d="M9 12h6M9 16h4" />
          </svg>
          <span className="text-sm font-semibold">Roteiro do dia completo</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
