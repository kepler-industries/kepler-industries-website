import { ArrowIcon } from "./brand-mark";

export function Hero() {
  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="container">
        <div className="hero-meta">
          <span>K-01 / Studio Bulletin / 2026.05</span>
          <span className="pulse">
            <span className="pulse-dot" />
            Currently Charting · 02 Open Slots
          </span>
        </div>

        <h1 className="hero-title">
          Building beyond
          <br />
          the <em>known horizon.</em>
        </h1>

        <div className="hero-row">
          <p className="hero-lede">
            Kepler Industries is a creative studio designing clean, ambitious
            digital products — interfaces, brands, and software at the edge of
            what&apos;s possible.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View Projects
              <ArrowIcon />
            </a>
            <a href="#contact" className="btn btn-ghost">
              Start a Project
              <ArrowIcon />
            </a>
          </div>
        </div>

        <dl className="hero-readout">
          <div>
            <dt>Trajectory</dt>
            <dd>
              SOLO → <span className="em">STUDIO</span>
            </dd>
          </div>
          <div>
            <dt>Disciplines</dt>
            <dd>WEB · APP · BRAND</dd>
          </div>
          <div>
            <dt>Operating Since</dt>
            <dd>
              2021 · <span className="em">Y4</span>
            </dd>
          </div>
          <div>
            <dt>Coordinates</dt>
            <dd>LAT 48.86° · LNG 2.34°</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
