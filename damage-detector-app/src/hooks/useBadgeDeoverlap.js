import { useLayoutEffect, useRef, useState, useCallback } from 'react';

const BADGE_SIZE = 26;
const ITERATIONS = 6;

export function useBadgeDeoverlap(count, deps) {
  const badgeRefs = useRef([]);
  const [offsets, setOffsets] = useState([]);

  badgeRefs.current = Array.from({ length: count }, (_, i) => badgeRefs.current[i] || null);

  const recompute = useCallback(() => {
    const centers = badgeRefs.current.map((el) => {
      if (!el) return { x: 0, y: 0 };
      const rect = el.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    });
    const positions = centers.map((c) => ({ ...c }));

    for (let iter = 0; iter < ITERATIONS; iter++) {
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const dx = positions[j].x - positions[i].x;
          const dy = positions[j].y - positions[i].y;
          const dist = Math.hypot(dx, dy) || 0.01;
          if (dist < BADGE_SIZE) {
            const push = (BADGE_SIZE - dist) / 2;
            const ux = dx / dist;
            const uy = dy / dist;
            positions[i].x -= ux * push;
            positions[i].y -= uy * push;
            positions[j].x += ux * push;
            positions[j].y += uy * push;
          }
        }
      }
    }

    setOffsets(positions.map((p, i) => ({ dx: p.x - centers[i].x, dy: p.y - centers[i].y })));
  }, [count]);

  useLayoutEffect(() => {
    recompute();
    window.addEventListener('resize', recompute);
    return () => window.removeEventListener('resize', recompute);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { badgeRefs: badgeRefs.current, offsets };
}
