import { useEffect, useRef } from 'react';

/**
 * Shifts an element vertically as it scrolls through the viewport, at
 * `speed` * its distance from the top — the layered-depth parallax GTA VI's
 * teaser page uses on its background art. No-ops under
 * prefers-reduced-motion.
 */
export function useParallax<T extends HTMLElement>(speed: number) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        el.style.transform = `translate3d(0, ${rect.top * speed}px, 0)`;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return ref;
}
