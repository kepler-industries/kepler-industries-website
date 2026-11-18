"use client";

import { useEffect, useRef } from "react";

/*
 * Maillage de points en perspective qui ondule (inspiré du hero de Prelude),
 * posé sous la section contact. Canvas 2D, en pause hors écran.
 */
export function SignalWave() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let cols = 80;
    const rows = 24;

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = w < 700 ? 44 : 84;
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const horizon = h * 0.12;
      const camH = 0.62;
      for (let j = rows - 1; j >= 0; j--) {
        const z = j / (rows - 1);
        const depth = 1 + z * 3.2;
        const fade = 1 - z;
        ctx.beginPath();
        for (let i = 0; i < cols; i++) {
          const u = i / (cols - 1);
          const x = (u - 0.5) * 3.4;
          const y =
            0.16 * Math.sin(x * 1.9 + t * 0.55 + z * 3.1) +
            0.09 * Math.sin(x * 3.7 - t * 0.38 + z * 1.6) +
            0.05 * Math.sin(x * 7.1 + t * 0.9);
          const sx = w / 2 + (x * w * 0.42) / depth;
          const sy = horizon + ((camH - y) * h * 0.95) / depth;
          if (i === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = `rgba(255,255,255,${0.07 * fade + 0.01})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        for (let i = 0; i < cols; i += 2) {
          const u = i / (cols - 1);
          const x = (u - 0.5) * 3.4;
          const y =
            0.16 * Math.sin(x * 1.9 + t * 0.55 + z * 3.1) +
            0.09 * Math.sin(x * 3.7 - t * 0.38 + z * 1.6) +
            0.05 * Math.sin(x * 7.1 + t * 0.9);
          const sx = w / 2 + (x * w * 0.42) / depth;
          const sy = horizon + ((camH - y) * h * 0.95) / depth;
          const crest = Math.max(0, y) * 4;
          const a = (0.12 + crest * 0.5) * fade;
          if (a < 0.02) continue;
          const hue = u < 0.5 ? "196,181,253" : "165,243,252";
          ctx.fillStyle =
            crest > 0.45 ? `rgba(${hue},${Math.min(0.9, a)})` : `rgba(255,255,255,${a})`;
          const r = (1.6 - z) * (0.7 + crest * 0.6);
          ctx.fillRect(sx - r / 2, sy - r / 2, r, r);
        }
      }
    };

    layout();
    if (reduced) {
      draw(2);
      const ro = new ResizeObserver(() => {
        layout();
        draw(2);
      });
      ro.observe(canvas);
      return () => ro.disconnect();
    }

    let raf = 0;
    let visible = false;
    let clock = 0;
    let last = performance.now();
    const loop = (now: number) => {
      clock += Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(clock);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const ro = new ResizeObserver(() => layout());
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="wave" aria-hidden="true" />;
}
