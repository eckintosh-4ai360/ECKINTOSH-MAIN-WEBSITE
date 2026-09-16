import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Lock, MousePointer2, Pause, Play, RotateCcw, Volume2 } from 'lucide-react';
import { useInView, useReducedMotion } from '../hooks';
import type { AccentTheme } from './theme';
import type { SystemDefinition } from './types';

interface SystemViewerProps {
  system: SystemDefinition;
  accent: AccentTheme;
  /** Compact drops the caption strip and shrinks the chrome. */
  compact?: boolean;
  className?: string;
}

/** Cursor rest positions (percent of frame) cycled through while a scene plays. */
const CURSOR_PATH: [number, number][] = [
  [26, 34],
  [62, 27],
  [48, 62],
  [78, 48],
  [34, 71],
  [68, 78],
];

function formatTime(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

/**
 * Plays a system's screens as a looping, scrubbable product film.
 * The "video" is live DOM, so it stays crisp at any size, weighs nothing,
 * and every screen inside it is real markup rather than a bitmap.
 */
export const SystemViewer: React.FC<SystemViewerProps> = ({ system, accent, compact = false, className = '' }) => {
  const reducedMotion = useReducedMotion();
  const { ref: viewRef, inView } = useInView<HTMLDivElement>({ threshold: 0.3, once: false });

  const [playing, setPlaying] = useState(!reducedMotion);
  const [elapsed, setElapsed] = useState(0);
  const [cursorStep, setCursorStep] = useState(0);
  const [clicking, setClicking] = useState(false);

  const scenes = system.scenes;
  const total = useMemo(() => scenes.reduce((sum, scene) => sum + scene.duration, 0), [scenes]);

  const activeIndex = useMemo(() => {
    let acc = 0;
    for (let i = 0; i < scenes.length; i += 1) {
      acc += scenes[i].duration;
      if (elapsed < acc) return i;
    }
    return scenes.length - 1;
  }, [elapsed, scenes]);

  const sceneStart = useMemo(
    () => scenes.slice(0, activeIndex).reduce((sum, scene) => sum + scene.duration, 0),
    [activeIndex, scenes]
  );

  const active = scenes[activeIndex];
  const running = playing && inView && !reducedMotion;

  // Transport clock.
  const frameRef = useRef<number | null>(null);
  useEffect(() => {
    if (!running) return;
    let last = performance.now();
    const tick = (now: number) => {
      const delta = (now - last) / 1000;
      last = now;
      setElapsed((prev) => (prev + delta) % total);
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [running, total]);

  // Scripted cursor: drift to the next rest point, then land a click.
  useEffect(() => {
    if (!running) return;
    const move = window.setInterval(() => {
      setCursorStep((step) => (step + 1) % CURSOR_PATH.length);
      setClicking(false);
      window.setTimeout(() => setClicking(true), 820);
      window.setTimeout(() => setClicking(false), 1280);
    }, 2200);
    return () => window.clearInterval(move);
  }, [running]);

  const jumpTo = useCallback(
    (index: number) => {
      const start = scenes.slice(0, index).reduce((sum, scene) => sum + scene.duration, 0);
      setElapsed(start + 0.001);
    },
    [scenes]
  );

  const sceneProgress = active ? Math.min(1, (elapsed - sceneStart) / active.duration) : 0;
  const cursor = CURSOR_PATH[cursorStep];

  return (
    <div ref={viewRef} className={className}>
      {/* Device chrome */}
      <div
        className="relative rounded-2xl border border-white/10 bg-[#0B1526] shadow-2xl overflow-hidden"
        style={{ boxShadow: `0 30px 80px -30px ${accent.hex}55, 0 0 0 1px rgba(255,255,255,0.05)` }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-3 h-9 border-b border-white/10 bg-[#08111F]">
          <span className="flex gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </span>
          <span className="flex-1 flex items-center justify-center min-w-0">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 max-w-full">
              <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
              <span className="text-[10px] font-mono text-slate-400 truncate">{system.url}</span>
            </span>
          </span>
          <span className="hidden sm:flex items-center gap-1 text-[9px] font-mono text-rose-400 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" /> REC
          </span>
        </div>

        {/* Screen */}
        <div
          className={`relative bg-slate-100 overflow-hidden aspect-[3/4] sm:aspect-[16/10] ${
            compact ? '' : 'lg:aspect-[16/9.4]'
          }`}
        >
          {scenes.map((scene, index) => (
            <div
              key={scene.id}
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                opacity: index === activeIndex ? 1 : 0,
                pointerEvents: index === activeIndex ? 'auto' : 'none',
                transform: index === activeIndex ? 'scale(1)' : 'scale(1.015)',
                transitionProperty: 'opacity, transform',
              }}
              aria-hidden={index !== activeIndex}
            >
              {index === activeIndex && scene.render({ accent })}
            </div>
          ))}

          {/* Scripted pointer */}
          {running && (
            <div
              className="absolute pointer-events-none z-30 transition-all duration-[900ms] ease-out"
              style={{ left: `${cursor[0]}%`, top: `${cursor[1]}%` }}
            >
              {clicking && (
                <span
                  className="absolute -left-3 -top-3 w-7 h-7 rounded-full animate-ping"
                  style={{ backgroundColor: `${accent.hex}40` }}
                />
              )}
              <MousePointer2
                className="w-4 h-4 drop-shadow-lg"
                style={{ color: accent.hex, fill: 'white', strokeWidth: 1.6 }}
              />
            </div>
          )}

          {/* Screen sheen */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/0 to-white/10" />
        </div>

        {/* Transport */}
        <div className="bg-[#08111F] border-t border-white/10 px-3 py-2 flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className={`w-7 h-7 rounded-lg grid place-items-center text-white shrink-0 transition-transform hover:scale-105 ${accent.bg}`}
            aria-label={playing ? 'Pause walkthrough' : 'Play walkthrough'}
          >
            {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>

          <button
            type="button"
            onClick={() => setElapsed(0)}
            className="w-7 h-7 rounded-lg grid place-items-center bg-white/5 border border-white/10 text-slate-400 hover:text-white shrink-0 transition-colors"
            aria-label="Restart walkthrough"
          >
            <RotateCcw className="w-3 h-3" />
          </button>

          {/* Segmented timeline, one segment per screen */}
          <div className="flex-1 flex items-center gap-1 min-w-0">
            {scenes.map((scene, index) => (
              <button
                key={scene.id}
                type="button"
                onClick={() => jumpTo(index)}
                className="group relative flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden min-w-0"
                style={{ flexGrow: scene.duration }}
                aria-label={`Jump to ${scene.label}`}
                title={scene.label}
              >
                <span
                  className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-100 ease-linear"
                  style={{
                    width: index < activeIndex ? '100%' : index === activeIndex ? `${sceneProgress * 100}%` : '0%',
                    backgroundColor: accent.hex,
                  }}
                />
              </button>
            ))}
          </div>

          <span className="text-[10px] font-mono text-slate-500 tabular-nums shrink-0 hidden sm:block">
            {formatTime(elapsed)} / {formatTime(total)}
          </span>
          <Volume2 className="w-3.5 h-3.5 text-slate-600 shrink-0 hidden md:block" />
        </div>
      </div>

      {/* Scene chips + caption */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {scenes.map((scene, index) => (
          <button
            key={scene.id}
            type="button"
            onClick={() => jumpTo(index)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
              index === activeIndex
                ? `${accent.bg} text-white border-transparent shadow-lg`
                : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:border-white/20'
            }`}
          >
            {scene.label}
          </button>
        ))}
      </div>

      {!compact && active && (
        <p key={active.id} className="mt-2.5 text-sm text-slate-400 leading-relaxed animate-fade-up">
          <span className={`font-mono text-[11px] mr-2 ${accent.textDark}`}>
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          {active.caption}
        </p>
      )}
    </div>
  );
};
