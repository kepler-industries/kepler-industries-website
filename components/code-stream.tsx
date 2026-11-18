"use client";

import { useEffect, useRef } from "react";

/*
 * « Du concept au code » : un flux de caractères (le code) converge vers le
 * K 3D du hero ; à la sortie, de fines traînées de lumière (le produit).
 * Canvas 2D, mis en pause hors écran et figé si l'utilisateur réduit les animations.
 */

const CHARS = "01{}[]<>/=;:+*#$&%?!()KEPLR".split("");
const TOKENS = ["const", "fn", "=>", "</>", "async", "0x1F", "await", "{ }", "use"];

type Glyph = {
  x: number;
  y0: number;
  speed: number;
  char: string;
  size: number;
  bright: boolean;
  tint: number;
  swapAt: number;
};

type Trail = {
  x: number;
  dy: number;
  speed: number;
  len: number;
  alpha: number;
};

export function CodeStream() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Le canvas ne lit pas les variables CSS : on résout la police Geist Mono.
    const mono =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--font-geist-mono")
        .trim() || "ui-monospace, monospace";
    let w = 0;
    let h = 0;
    let dpr = 1;
    let tx = 0;
    let ty = 0;
    let kHalf = 0;
    let spread = 120;
    let glyphs: Glyph[] = [];
    let trails: Trail[] = [];

    const pick = () =>
      Math.random() < 0.08
        ? TOKENS[(Math.random() * TOKENS.length) | 0]
        : CHARS[(Math.random() * CHARS.length) | 0];

    const spawnGlyph = (anywhere: boolean): Glyph => ({
      x: anywhere ? Math.random() * tx : -40 - Math.random() * 80,
      y0: ty + (Math.random() - 0.5) * 2 * spread * (0.35 + Math.random() * 0.65),
      speed: 40 + Math.random() * 90,
      char: pick(),
      size: 10 + ((Math.random() * 3) | 0),
      bright: Math.random() < 0.07,
      tint: Math.random(),
      swapAt: 0,
    });

    const spawnTrail = (anywhere: boolean): Trail => ({
      x: anywhere ? tx + Math.random() * (w - tx) : tx + kHalf * 0.2,
      dy: (Math.random() - 0.5) * 2,
      speed: 160 + Math.random() * 220,
      len: 20 + Math.random() * 70,
      alpha: 0.25 + Math.random() * 0.5,
    });

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = document.querySelector<HTMLElement>("[data-k-target]");
      if (target) {
        const t = target.getBoundingClientRect();
        tx = t.left - rect.left + t.width / 2;
        ty = t.top - rect.top + t.height / 2;
        kHalf = t.width * 0.28;
      } else {
        tx = w * 0.72;
        ty = h * 0.5;
        kHalf = 120;
      }
      const small = w < 700;
      spread = small ? 70 : 150;
      const count = small ? 90 : 230;
      const trailCount = small ? 14 : 34;
      glyphs = Array.from({ length: count }, () => spawnGlyph(true));
      trails = Array.from({ length: trailCount }, () => spawnTrail(true));
    };

    const ease = (t: number) => t * t * (3 - 2 * t);

    const frame = (dt: number, now: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.textBaseline = "middle";
      const fadeStart = w < 700 ? 0 : tx * 0.42;
      const end = tx - kHalf * 0.15;

      for (const g of glyphs) {
        g.x += g.speed * dt;
        if (g.x > end) Object.assign(g, spawnGlyph(false));
        if (now > g.swapAt) {
          g.char = pick();
          g.swapAt = now + 120 + Math.random() * 900;
        }
        const p = Math.max(0, Math.min(1, g.x / end));
        const y = g.y0 + (ty - g.y0) * ease(p);
        const inA = Math.max(0, Math.min(1, (g.x - fadeStart) / (tx * 0.25)));
        const outA = Math.max(0, Math.min(1, (end - g.x) / (kHalf * 0.9)));
        const a = inA * outA * (g.bright ? 0.95 : 0.34);
        if (a <= 0.01) continue;
        ctx.font = `${g.size}px ${mono}`;
        if (g.bright) {
          ctx.shadowColor = "rgba(190, 210, 255, 0.9)";
          ctx.shadowBlur = 10;
          ctx.fillStyle = `rgba(255,255,255,${a})`;
        } else {
          ctx.shadowBlur = 0;
          const c =
            g.tint < 0.12
              ? `rgba(196,181,253,${a})`
              : g.tint < 0.22
                ? `rgba(165,243,252,${a})`
                : `rgba(255,255,255,${a})`;
          ctx.fillStyle = c;
        }
        ctx.fillText(g.char, g.x, y);
      }
      ctx.shadowBlur = 0;

      // Traînées de sortie
      for (const tr of trails) {
        tr.x += tr.speed * dt;
        if (tr.x - tr.len > w) Object.assign(tr, spawnTrail(false));
        const d = tr.x - tx;
        const y = ty + tr.dy * Math.min(spread * 0.9, d * 0.32);
        const a = tr.alpha * Math.min(1, d / 120) * Math.max(0, 1 - d / (w - tx + 1));
        if (a <= 0.01) continue;
        const grad = ctx.createLinearGradient(tr.x - tr.len, y, tr.x, y);
        grad.addColorStop(0, "rgba(255,255,255,0)");
        grad.addColorStop(1, `rgba(255,255,255,${a})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(tr.x - tr.len, y);
        ctx.lineTo(tr.x, y);
        ctx.stroke();
      }
    };

    layout();

    if (reduced) {
      frame(0, 0);
      const ro = new ResizeObserver(() => {
        layout();
        frame(0, 0);
      });
      ro.observe(canvas);
      return () => ro.disconnect();
    }

    let raf = 0;
    let last = performance.now();
    let visible = true;

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      frame(dt, now);
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
    // Le K se place après les polices : on recalcule une fois tout chargé.
    document.fonts?.ready.then(() => layout());
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="stream" aria-hidden="true" />;
}
