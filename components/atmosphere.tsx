"use client";

import { useEffect, useRef } from "react";

export function Atmosphere() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let gx = mx;
    let gy = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const tick = () => {
      gx += (mx - gx) * 0.08;
      gy += (my - gy) * 0.08;
      glow.style.left = gx + "px";
      glow.style.top = gy + "px";
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
    </>
  );
}

export function ScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}

export function SmoothAnchors() {
  useEffect(() => {
    const handler = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const id = a.getAttribute("href");
      if (!id || id.length <= 1) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const links = document.querySelectorAll<HTMLAnchorElement>(
      'a[href^="#"]'
    );
    links.forEach((l) => l.addEventListener("click", handler));
    return () => {
      links.forEach((l) => l.removeEventListener("click", handler));
    };
  }, []);

  return null;
}

export function ClientEffects() {
  return (
    <>
      <ScrollReveal />
      <SmoothAnchors />
    </>
  );
}
