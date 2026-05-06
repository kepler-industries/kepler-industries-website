"use client";

import { useEffect, useState } from "react";
import { BrandLink } from "./brand-mark";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`} id="nav">
      <BrandLink href="#" ariaLabel="Kepler Industries home" />
      <nav className="nav-links" aria-label="Primary">
        <a href="#about">About</a>
        <a href="#vision">Vision</a>
        <a href="#projects">Projects</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </nav>
      <a href="#contact" className="nav-cta">
        <span className="dot" />
        Start a Project
      </a>
    </header>
  );
}
