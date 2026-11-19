import { useEffect, useRef } from 'react';
import { useSettings } from '../../store/settings';

/** Lightweight animated starfield with drifting constellation lines. */
export function Starfield({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useSettings((s) => s.reduceMotion);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const stars = Array.from({ length: 160 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.3 + 0.2, t: Math.random() * Math.PI * 2, s: Math.random() * 0.02 + 0.005 }));
    const consts = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => ({ x: Math.random(), y: Math.random() * 0.8 })));
    const resize = () => {
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const gold = getComputedStyle(document.documentElement).getPropertyValue('--c-gold').trim().split(' ').join(',');
    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const c of consts) {
        ctx.beginPath();
        c.forEach((p, i) => {
          const x = p.x * w + Math.sin(time / 9000 + i) * 6;
          const y = p.y * h + Math.cos(time / 11000 + i) * 6;
          i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        });
        ctx.strokeStyle = `rgba(${gold},0.10)`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
      for (const s of stars) {
        s.t += reduce ? 0 : s.s;
        const a = 0.35 + Math.sin(s.t) * 0.35;
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.r > 1.2 ? `rgba(${gold},${a + 0.2})` : `rgba(255,255,255,${a})`;
        ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [reduce]);
  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />;
}
