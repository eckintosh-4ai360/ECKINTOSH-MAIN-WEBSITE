import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/** True once the element has scrolled into view; stays true unless `once` is false. */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: { threshold?: number; rootMargin?: string; once?: boolean } = {}
) {
  const { threshold = 0.18, rootMargin = '0px 0px -8% 0px', once = true } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView };
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  return reduced;
}

/** Counts from 0 to `target` once `active` flips true. Preserves prefix/suffix formatting. */
export function useCountUp(value: string, active: boolean, duration = 1400): string {
  const reduced = useReducedMotion();
  const parsed = useMemo(() => {
    const match = value.match(/^(\D*?)([\d,.]+)(.*)$/);
    if (!match) return null;
    const numeric = Number(match[2].replace(/,/g, ''));
    if (!Number.isFinite(numeric)) return null;
    const decimals = match[2].includes('.') ? match[2].split('.')[1].length : 0;
    const grouped = match[2].includes(',');
    return { prefix: match[1], target: numeric, suffix: match[3], decimals, grouped };
  }, [value]);

  const [display, setDisplay] = useState(() => (parsed && !reduced ? `${parsed.prefix}0${parsed.suffix}` : value));

  useEffect(() => {
    if (!parsed) {
      setDisplay(value);
      return;
    }
    if (!active || reduced) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = parsed.target * eased;
      const formatted = parsed.grouped
        ? current.toLocaleString('en-US', {
            minimumFractionDigits: parsed.decimals,
            maximumFractionDigits: parsed.decimals,
          })
        : current.toFixed(parsed.decimals);
      setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, duration, parsed, reduced, value]);

  return display;
}

/** Locks body scroll while `locked` is true (used by modals and the palette). */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}

/** Calls `handler` on Escape. */
export function useEscape(active: boolean, handler: () => void) {
  const saved = useRef(handler);
  saved.current = handler;

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') saved.current();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Traps Tab/Shift+Tab focus inside the returned ref's element while `active`,
 * moving focus into it on open and restoring the previously focused element
 * on close (used by modals and the command palette).
 */
export function useFocusTrap<T extends HTMLElement = HTMLDivElement>(active: boolean) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!active) return;
    const container = ref.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusFirst = () => {
      const focusable = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      (focusable[0] ?? container).focus();
    };
    const raf = window.requestAnimationFrame(focusFirst);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => el.offsetParent !== null
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    container.addEventListener('keydown', onKeyDown);
    return () => {
      window.cancelAnimationFrame(raf);
      container.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [active]);

  return ref;
}

/** Normalised pointer position (0-1) within the referenced element. */
export function usePointerSpotlight<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const onPointerMove = useCallback((event: React.PointerEvent<T>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPos({ x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height });
  }, []);

  const onPointerLeave = useCallback(() => setPos(null), []);

  return { ref, pos, onPointerMove, onPointerLeave };
}
